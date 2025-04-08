const db = require("../models");
const Customer = db.customer;
const middlewares = require("./auth.middlewares");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const DIR = 'static/images/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = uuidv4() + '-' + file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

exports.updateCustomer = async (req, res) => {
    try {
        upload.single('avatar')(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(400).send({ message: err.message });
            }

            const auth = await middlewares.checkAuth(req);
            if (!auth) {
                return res.status(401).json({ message: "Authentication failed" });
            }

            const customerId = auth.id;

            const customer = await Customer.findById(customerId);

            if (!customer) {
                return res.status(404).json({ error: "Customer not found" });
            }

            customer.first_name = req.body.first_name || customer.first_name;
            customer.last_name = req.body.last_name || customer.last_name;
            customer.phone = req.body.phone || customer.phone;
            customer.age = req.body.age || customer.age;
            customer.gender = req.body.gender || customer.gender;
            customer.avatar = req.file ? req.file.filename : customer.avatar;

            await customer.save();
            return res.json(customer);
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

