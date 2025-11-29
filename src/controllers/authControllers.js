import jwt from "jsonwebtoken";
import { users } from "../database/memory.js";

export const loginUser = (req, res, next) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    // find user
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // create token
    const secret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: "1h" }
    );

    // respond
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};