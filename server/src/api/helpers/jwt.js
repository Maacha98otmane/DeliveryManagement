import jwt from "jsonwebtoken";
require("dotenv").config();

// generate tokens :
export const createToken = (payload = null, role = null) => {
  if (!payload) return null;
  if (!role) return null;
  switch (role) {
    case "ADMIN":
      return jwt.sign(payload, process.env.SECRET_KEY_ADMIN, {
        expiresIn: "1h",
      });
    case "MANAGER":
      return jwt.sign(payload, process.env.SECRET_KEY_MANAGER, {
        expiresIn: "1h",
      });
    case "DELIVERY_MANAGER":
      return jwt.sign(payload, process.env.SECRET_KEY_DELIVERY_MANAGER, {
        expiresIn: "1h",
      });
    case "DRIVER":
      return jwt.sign(payload, process.env.SECRET_KEY_DRIVER, {
        expiresIn: "1h",
      });
    default:
      return null;
  }
};

export const verifyToken = (token = null, role = null) => {
  if (!token) return null;
  if (!role) return null;
  try {
    switch (role) {
      case "ADMIN":
        return jwt.verify(token, process.env.SECRET_KEY_ADMIN);
        break;
      case "MANAGER":
        return jwt.verify(token, process.env.SECRET_KEY_MANAGER);
        break;
      case "DELIVERY_MANAGER":
        return jwt.verify(token, process.env.SECRET_KEY_DELIVERY_MANAGER);
        break;
      case "DRIVER":
        return jwt.verify(token, process.env.SECRET_KEY_DRIVER);
        break;
      default:
        return null;
    }
  } catch (err) {
    return null;
  }
};
