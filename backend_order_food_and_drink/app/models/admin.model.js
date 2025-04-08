module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            email: {
                type: String,
                unique: true,
            },
            hash_password: {
                type: String,
            },
            first_name: {
                type: String,
            },
            last_name: {
                type: String,
            },
            phone: {
                type: String,
            },
            age: {
                type: Number,
            },
            gender: {
                type: String,
            },
            avatar: {
                type: String,
                null: true,
            },
            role: {
                type: String,
            },
            socket_id: {
                type: String,
                null: true,
            },

        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Admin = mongoose.model("admin", schema);
    (async () => {
        try {
            const accountAdmin = await Admin.findOne({ email: "admin@admin.ad" });
            if (!accountAdmin) {
                const bcrypt = require("bcrypt");
                const { SALT_ROUNDS } = require('../../variables/auth');
                const newAdmin = new Admin({
                    email: "admin@admin.ad",
                    hash_password: bcrypt.hashSync("123456", SALT_ROUNDS),
                    first_name: "admin",
                    last_name: "admin",
                    role: "ADMIN"
                });
                await newAdmin.save();
            }

            const accountStaff = await Admin.findOne({ email: "staff@staff.st" });
            if (!accountStaff) {
                const bcrypt = require("bcrypt");
                const { SALT_ROUNDS } = require('../../variables/auth');
                const newStaff = new Admin({
                    email: "staff@staff.st",
                    hash_password: bcrypt.hashSync("123456", SALT_ROUNDS),
                    first_name: "staff",
                    last_name: "staff",
                    role: "STAFF"
                });
                await newStaff.save();
            }
        } catch (error) {
            console.error(error);
        }
    })();
    return Admin;
};
