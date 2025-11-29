import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Please login first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // If admin logged in
    if (decoded.role === "admin") {
      req.user = {
        id: "admin123",
        role: "admin",
        email: process.env.ADMIN_EMAIL,
      };
      return next();
    }

    // Normal user / employer
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
