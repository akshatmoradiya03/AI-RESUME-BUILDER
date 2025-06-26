import admin from "../firebase.js";
import { ApiError } from "../utils/ApiError.js";

const isUserAvailable = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(new ApiError(401, "No token provided"));
  }
  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json(new ApiError(401, "Invalid or expired token"));
  }
};

export { isUserAvailable };