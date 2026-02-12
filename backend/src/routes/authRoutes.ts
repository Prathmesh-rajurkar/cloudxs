import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../utils/supabase";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET!;

router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert({ email, password_hash, username })
      .select("id")
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const token = jwt.sign({ user_id: data.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      token,
      user_id: data.id,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

/* ---------- Login ---------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ user_id: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      token,
      user_id: user.id,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/check-username", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    const { data } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .single();
    //   console.log(data);

    return res.json({
      available: !data,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
