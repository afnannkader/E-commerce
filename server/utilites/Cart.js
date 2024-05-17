const Cart = async (req, res) => {

  const { productId, quantity } = req.body;
  try {
    if (!req.session.cart) {
      // If the user doesn't have a cart session, initialize it as an empty array
      req.session.cart = [];
    }

    const cart = req.session.cart;

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.productId === productId);

    if (existingProductIndex !== -1) {
      // If the product already exists in the cart, update the quantity
      cart[existingProductIndex].quantity += quantity;
      console.log(cart[existingProductIndex]);
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      cart.push({ productId, quantity });
    }
    console.log(cart)
    // Send the updated cart back to the client
    res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
}
module.exports = Cart;