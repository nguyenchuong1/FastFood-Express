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
        socket_id: {
            type: String,
            null: true,
        },

      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Customer = mongoose.model("customer", schema);
    return Customer;
  };
  