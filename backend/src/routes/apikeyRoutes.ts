import express from "express";
import { supabase } from "../utils/supabase";
import crypto from "crypto";

const router = express.Router();

router.post("/create-apikey", async (req, res) => {
  try {
    const { user_id, name } = req.body;

    if (!user_id) {
      return res.status(400).json(
        { message: "user_id is required" }
      );
      
    }

    const rawKey =
      "img_live_" + crypto.randomBytes(12).toString("hex"); // ~32 chars

    const keyHash = crypto
      .createHash("sha256")
      .update(rawKey)
      .digest("hex");

    const { data, error } = await supabase.from("api_keys").insert({
      user_id,
      key_hash: keyHash,
      name: name || "default",
      is_active: true,
    });

    if (error) {
      console.error("DB error:", error);
      return res.status(500).json(
        { message: "Failed to create API key" },
      );
    }

    return res.json({
      api_key: rawKey,
      warning: "Store this key securely. You will not be able to see it again.",
    });


  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});


export default router;