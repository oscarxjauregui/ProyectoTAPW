import jwt from "jsonwebtoken";

import { TOKEN_SECRET } from "../config.js";

export function createAsscessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "5m" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
