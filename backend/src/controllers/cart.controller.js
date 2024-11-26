import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  const { articleId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.articleId.toString() === articleId
    );

    if (itemIndex === -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ articleId, quantity: quantity || 1 });
    }

    cart.updateAt = new Date();
    await cart.save();
    return res.status(200).json(cart);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { articleId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(404).json({ message: "carrito no encontrado" });

    cart.items = cart.items.filter(
      (item) => item.articleId.toString() !== articleId
    );

    cart.updateAt = new Date();
    await cart.save();
    return res.status(200).json(cart);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const getCart = async (req, res) => {
  const usrId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.articleId");
    if (!cart)
      return res.status(404).json({ message: "carrito no encontrado" });

    return res.status(200).json(cart);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const updateCartItem = async (req, res) => {
  const { articleId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(404).json({ message: "carrito no encontrado" });

    const itemIndex = cart.items.findIndex(
      (item) => item.articleId.toString() === articleId
    );

    if (itemIndex > -1) {
      cart.items[itemInde].quantity = quantity;
      cart.updateAt = new Date();
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res
        .status(404)
        .json({ message: "articulo no encontrado en el carrito" });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(404).json({ message: "carrito no encontrado" });

    cart.items = [];
    cart.updateAt = new Date();
    await cart.save();
    return res.status(200).json({ message: "carrito vaciado exitosamente" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
