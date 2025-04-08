module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        unique: true,
      },
      image: {
        type: String,
        null: true,
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

  const Category = mongoose.model("category", schema);
  return Category;
};
