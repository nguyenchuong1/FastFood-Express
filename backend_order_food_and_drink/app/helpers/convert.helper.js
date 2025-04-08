const db = require("../models");
const Cart = db.cart;
const CartItem = db.cartItem;
const Order = db.order;
const OrderItem = db.orderItem;
const Customer = db.customer;
const Admin = db.admin;
const listSocket = require("../socket");
const UpdateOrder = listSocket.updateOrder;

exports.convertCartToOrder = async (cartId, typeOrder) => {
    const cart = await Cart.findById(cartId);
    if (!cart || !cart.is_active) {
        return false;
    }

    const customer = await Customer.findById(cart.customer_id);
    if (!customer) {
        return false;
    }

    const newOrder = new Order({
        cart_id: cart.id,
        customer_id: cart.customer_id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        email: customer.email,
        total_item: cart.total_item,
        total_price: cart.total_price,
        status: "NEW",
        type_order: typeOrder,
        is_payment: false,
        is_active: true,
    });
    const saveNewOrder = await newOrder.save();

    const listOrder = await Order.find({});
    const admin = await Admin.find({});
    for (const ad of admin ) {
        if (ad.socket_id) {
            UpdateOrder.to(ad.socket_id).emit('sendListOrder', listOrder);
        }
    }

    const cartItems = await CartItem.find({ cart_id: cartId });
    await Promise.all(
        cartItems.map(async (item) => {
            const newOrderItem = new OrderItem({
                order_id: saveNewOrder.id,
                product_id: item.product_id,
                product_name: item.product_name,
                product_image: item.product_image,
                qty: item.qty,
                price: item.price,
                total_price: item.total_price,
                is_active: item.is_active,
            });
            await newOrderItem.save();
        })
    );
    cart.is_active = false;
    await cart.save();

    // create cart
    const newCart = new Cart({
        customer_id: cart.customer_id,
        total_item: 0,
        total_price: 0,
        is_active: true,
    });
    await newCart.save();


    return saveNewOrder;
};

exports.getArrayDate = async (startDate, endDate, typeGet) => {
    const arrayDate = [];
    if (typeGet === "Date") {
        const start = new Date(startDate);
        const end = new Date(endDate);
        for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
            arrayDate.push(new Date(date));
        }
    } else if (typeGet === "Month") {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let currentMonth = start.getMonth();
        let currentYear = start.getFullYear();

        while (currentYear < end.getFullYear() || (currentYear === end.getFullYear() && currentMonth <= end.getMonth())) {
            arrayDate.push(new Date(currentYear, currentMonth));
            if (currentMonth === 11) {
                currentMonth = 0;
                currentYear++;
            } else {
                currentMonth++;
            }
        }
    } else if (typeGet === "Year") {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let currentYear = start.getFullYear();

        while (currentYear <= end.getFullYear()) {
            arrayDate.push(new Date(currentYear, 0));
            currentYear++;
        }
    }

    return arrayDate;
};
