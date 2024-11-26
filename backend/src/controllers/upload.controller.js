import Article from "../models/article.model.js";

export const uploadArticle = async (req, res) => {
  const { name, description, price, image } = req.body;

  if (!name || !description || !price || !image) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  try {
    const createdBy = req.user?.id;

    console.log("Id del usuario: ", createdBy); 

    if(!createdBy){
        return res.status(400).json({ message: "No se pudo encontrar el usuario"});     
    }

    const newArticle = new Article({
      name,
      description,
      price,
      image,
      createdBy,
    });

    const articleSaved = await newArticle.save();
    return res.status(201).json({
      id: articleSaved._id,
      name: articleSaved.name,
      description: articleSaved.description,
      price: articleSaved.price,
      image: articleSaved.image,
      createdBy: articleSaved.createdBy,
      createdAt: articleSaved.createdAt,
      updatedAt: articleSaved.updatedAt,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    return res.status(200).json(articles);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }
    return res.status(200).json(article);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category } = req.body;

  try {
    const articleUpdated = await Article.findByIdAndUpdate(
      id,
      { title, description, price, category },
      { new: true }
    );

    if (!articleUpdated) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    return res.status(200).json(articleUpdated);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const articleDeleted = await Article.findByIdAndDelete(id);

    if (!articleDeleted) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    return res.status(200).json({ message: "Artículo eliminado exitosamente" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
