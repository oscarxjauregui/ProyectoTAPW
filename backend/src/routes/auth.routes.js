import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import {
  uploadArticle,
  getArticles,
  getArticleById,
} from "../controllers/upload.controller.js";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/favorite.controller.js";
import {
  addToCart,
  removeFromCart,
  getCart,
  updateCartItem,
  clearCart,
} from "../controllers/cart.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.post("/uploadarticle", authRequired, uploadArticle);
router.get("/getarticles", authRequired, getArticles);
router.get("/getarticlebyid/:id", authRequired, getArticleById);
router.post("/favorites/add", authRequired, addFavorite);
router.post("/favorites/remove", authRequired, removeFavorite); 
router.get("/favorites", authRequired, getFavorites);
router.post("/cart/add", authRequired, addToCart);
router.post("/cart/remove", authRequired, removeFromCart);
router.get("/cart", authRequired, getCart);
router.put("/cart/update", authRequired, updateCartItem);
router.delete("/cart/clear", authRequired, clearCart);

export default router;
