const db = require("../models");
const Order = db.order;
const OrderItem = db.orderItem;
const Customer = db.customer;
const Product = db.product;

class Recommender {
    constructor(kDim = 2, alpha = 0.01, lambda = 0.01, iterations = 100) {
        this.kDim = kDim;
        this.alpha = alpha;
        this.lambda = lambda;
        this.iterations = iterations;
    }

    fit(table) {
        this.theta = {};
        this.X = {};
        this.columnNames = table.columnNames;
        this.rowNames = table.rowNames;

        for (let d = 0; d < this.columnNames.length; ++d) {
            const x = [];
            for (let k = 0; k < this.kDim; ++k) {
                x.push(Math.random());
            }
            this.theta[this.columnNames[d]] = x;
        }

        for (let d = 0; d < this.rowNames.length; ++d) {
            const t = [];
            for (let k = 0; k < this.kDim; ++k) {
                t.push(Math.random());
            }
            this.X[this.rowNames[d]] = t;
        }

        for (let iter = 0; iter < this.iterations; ++iter) {
            const Vtheta = this.gradTheta(table, this.theta, this.X);
            for (let d = 0; d < this.columnNames.length; ++d) {
                const colName = this.columnNames[d];
                for (let k = 0; k < this.kDim; ++k) {
                    this.theta[colName][k] -= this.alpha * Vtheta[colName][k];
                }
            }

            const Vx = this.gradX(table, this.theta, this.X);
            for (let d = 0; d < this.rowNames.length; ++d) {
                const rowName = this.rowNames[d];
                for (let k = 0; k < this.kDim; ++k) {
                    this.X[rowName][k] -= this.alpha * Vx[rowName][k];
                }
            }
        }

        return {
            theta: this.theta,
            X: this.X,
            rowNames: this.rowNames,
            columnNames: this.columnNames,
            config: {
                alpha: this.alpha,
                lambda: this.lambda,
                iterations: this.iterations
            }
        };
    }

    gradTheta(table, theta, X) {
        const Vtheta = {};
        for (let d = 0; d < this.columnNames.length; ++d) {
            const colName = this.columnNames[d];
            const v = [];
            for (let k = 0; k < this.kDim; ++k) {
                let sum = 0;
                for (const cellKey in table.cells) {
                    const names = table.getNames(cellKey);
                    const colName2 = names.colName;
                    const rowName = names.rowName;

                    if (colName !== colName2) {
                        continue;
                    }

                    const y = table.cells[cellKey];
                    const predicted = this.h(theta, X, rowName, colName);
                    const x_i_k = X[rowName][k];

                    sum += (predicted - y) * x_i_k;
                }

                sum += this.lambda * theta[colName][k];
                v.push(sum);
            }
            Vtheta[colName] = v;
        }
        return Vtheta;
    }

    gradX(table, theta, X) {
        const Vx = {};
        for (let d = 0; d < this.rowNames.length; ++d) {
            const rowName = this.rowNames[d];
            const v = [];
            for (let k = 0; k < this.kDim; ++k) {
                let sum = 0;
                for (const cellKey in table.cells) {
                    const names = table.getNames(cellKey);
                    const colName = names.colName;
                    const rowName2 = names.rowName;

                    if (rowName !== rowName2) {
                        continue;
                    }

                    const y = table.cells[cellKey];
                    const predicted = this.h(theta, X, rowName, colName);

                    sum += (predicted - y) * theta[colName][k];
                }

                sum += this.lambda * X[rowName][k];
                v.push(sum);
            }
            Vx[rowName] = v;
        }
        return Vx;
    }

    h(theta, X, rowName, colName) {
        let sum = 0;
        for (let k = 0; k < this.kDim; ++k) {
            sum += theta[colName][k] * X[rowName][k];
        }
        return sum;
    }

    transform(table) {
        const transformedTable = table.makeCopy();
        for (let i = 0; i < transformedTable.rowNames.length; ++i) {
            const rowName = transformedTable.rowNames[i];
            for (let j = 0; j < transformedTable.columnNames.length; ++j) {
                const colName = transformedTable.columnNames[j];
                const predicted = this.h(this.theta, this.X, rowName, colName);
                transformedTable.setCell(rowName, colName, predicted);
            }
        }
        return transformedTable;
    }

    fitAndTransform(table) {
        this.fit(table);
        return this.transform(table);
    }
}

class Table {
    constructor(arrayData) {
        this.columnNames = [];
        this.rowNames = [];
        this.cells = {};

        for (let i = 0; i < arrayData.length; i++) {
            const [rowName, colName, value] = arrayData[i];
            if (!this.columnNames.includes(colName)) {
                this.columnNames.push(colName);
            }
            if (!this.rowNames.includes(rowName)) {
                this.rowNames.push(rowName);
            }
            this.cells[`${rowName}_${colName}`] = value;
        }
    }

    getNames(cellKey) {
        const [rowName, colName] = cellKey.split('_');
        return { rowName, colName };
    }

    setCell(rowName, colName, value) {
        this.cells[`${rowName}_${colName}`] = value;
    }

    getCell(rowName, colName) {
        return this.cells[`${rowName}_${colName}`];
    }

    makeCopy() {
        const copyTable = new Table([]);
        copyTable.columnNames = this.columnNames.slice();
        copyTable.rowNames = this.rowNames.slice();
        Object.assign(copyTable.cells, this.cells);
        return copyTable;
    }
}

exports.recommender = async (auth) => {
    var arrayData = [];
    var resultData = [];
    var productQuantities = {};
    var listPro = [];
    var listCustomers = await Customer.find({});
    await Promise.all(
        listCustomers.map(async (customer) => {
            var products = await Product.find({});
            for (const product of products) {
                productQuantities[product.id] = 0;
            }

            var orders = await Order.find({ customer_id: customer.id });
            for (const order of orders) {
                var orderItems = await OrderItem.find({ order_id: order.id });

                for (const orderItem of orderItems) {
                    var productId = orderItem.product_id.toString();

                    if (!productQuantities[productId]) {
                        productQuantities[productId] = 0;
                    } else {
                        productQuantities[productId] += orderItem.qty;
                    }
                }
            }

            for (const productId in productQuantities) {
                const quantity = productQuantities[productId];
                arrayData.push([productId, customer.id, quantity]);
            }
        })
    );

    const table = new Table(arrayData);
    const recommender = new Recommender();
    const transformedTable = recommender.fitAndTransform(table);

    for (var i = 0; i < transformedTable.columnNames.length; ++i) {
        var user = transformedTable.columnNames[i];
        for (var j = 0; j < transformedTable.rowNames.length; ++j) {
            var product = transformedTable.rowNames[j];
            resultData.push([product, user, transformedTable.getCell(product, user)]);
        }
    }

    const customerData = resultData.filter((d) => d[1] == auth.id);
    customerData.sort((a, b) => b[2] - a[2]);
    const topRecommendations = customerData.slice(0, 8);
    return topRecommendations;
};

