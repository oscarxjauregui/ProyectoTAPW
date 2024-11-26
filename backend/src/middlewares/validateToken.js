import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  // Obtenemos el token de las cookies
  const { token } = req.cookies;

  // Verificamos si el token está presente
  if (!token) {
    return res.status(401).json({
      message: "Acceso denegado, no cuentas con un token",
    });
  }

  try {
    const user = jwt.verify(token, TOKEN_SECRET);

    req.user = user;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "Token inválido o expirado",
    });
    req.user = user;
    next();
  }
};
