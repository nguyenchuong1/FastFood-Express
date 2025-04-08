module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        cart_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        product_name: {
          type: String,
        },
        product_image: {
          type: String,
        },
        qty: {
            type: Number,
        },
        price: {
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
  
    const CartItem = mongoose.model("cart_item", schema);
    return CartItem;
  };
  