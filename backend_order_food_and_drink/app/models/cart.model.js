module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        total_item: {
            type: Number,
        },
        total_price: {
            type: Number,
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
  
    const Cart = mongoose.model("cart", schema);
    return Cart;
  };
  