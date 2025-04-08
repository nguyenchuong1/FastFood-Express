module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        cart_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
        },
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
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
        email: {
            type: String,
        },
        total_item: {
            type: Number,
        },
        total_price: {
            type: Number,
        },
        status: {
            type: String,
        },
        type_order: {
            type: String,
        },
        is_payment: {
            type: Boolean,
        },
        city_code: {
            type: String,
        },
        district_code: {
            type: String,
        },
        ward_code: {
            type: String,
        },
        is_active: {
            type: Boolean,
            default: true,
        },

      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Order = mongoose.model("order", schema);
    return Order;
  };
  