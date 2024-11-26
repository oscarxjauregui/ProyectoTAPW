import Favorite from "../models/favorite.model.js";

export const addFavorite = async (req, res) => {
  const { articleId } = req.body;
  const userId = req.user?.id;

  if (!userId || !articleId) {
    return res
      .status(400)
      .json({ message: "Usuario y articulo son obligatorios" });
  }
  try {
    let favorite = await Favorite.findOne({ userId });

    if(!favorite){
        favorite = new Favorite({ userId, articles: [articleId] });
    } else {
        if(favorite.articles.includes(articleId)) {
            return res.status(400).json({ message: "El articulo ya está en favoritos" });
        }

        favorite.articles.push(articleId);
    }

    await favorite.save();
    return res.status(201).json({ message: "Articulo añadido a favoritos", favorite });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const removeFavorite = async (req, res) => {
    const { articleId } = req.body;
    const userId = req.user?.id;
  
    if (!userId || !articleId) {
      return res.status(400).json({ message: "Usuario y artículo son obligatorios" });
    }
  
    try {
      const favorite = await Favorite.findOne({ userId });
  
      if (!favorite) {
        return res.status(404).json({ message: "Lista de favoritos no encontrada" });
      }
  
      favorite.articles = favorite.articles.filter((id) => id.toString() !== articleId);
  
      await favorite.save();
      return res.status(200).json({ message: "Artículo eliminado de favoritos", favorite });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  export const getFavorites = async (req, res) => {
    const userId = req.user?.id;
  
    if (!userId) {
      return res.status(400).json({ message: "Usuario no autenticado" });
    }
  
    try {
      const favorite = await Favorite.findOne({ userId }).populate("articles");
  
      if (!favorite) {
        return res.status(404).json({ message: "Lista de favoritos no encontrada" });
      }
  
      return res.status(200).json(favorite);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
