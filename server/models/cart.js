const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    products:[
      {
        productId: Number,
        quantity:Number,
        name: String,
        price: Number
      }
    ],
    active:{
      type: Boolean,
      default: true
    },
    modifiedOn:{
      type:Date,
      default: Date.now
    }
  },
  {timestamps: true}
);

module.export = mongoose.model("Cart",CartSchema);