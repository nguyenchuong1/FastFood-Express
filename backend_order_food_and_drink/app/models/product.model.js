module.exports = mongoose => {
  const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
      detail: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
      },
      is_active: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
      toJSON: {
        transform: (doc, ret) => {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        },
      },
    }
  );

  const Product = mongoose.model('product', productSchema);

  return Product;
};
