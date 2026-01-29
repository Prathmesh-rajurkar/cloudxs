import express from "express";
import { supabase } from "../utils/supabase";
import crypto from "crypto";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

/**
 * POST {BASE_API_URL}/apikey/create-apikey
 * Creates a new API key (shown only once)
 */
router.post("/create-apikey",authMiddleware, async (req, res) => {
  try {
    const { user_id, name } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "user_id is required",
      });
    }

    // Generate raw API key (ONLY shown once)
    const rawKey = "ck_live_" + crypto.randomBytes(16).toString("hex");

    // Hash before storing (never store raw key)
    const keyHash = crypto
      .createHash("sha256")
      .update(rawKey)
      .digest("hex");

    const { error } = await supabase.from("api_keys").insert({
      user_id,
      key_hash: keyHash,
      name: name || "default",
      is_active: true,
    });

    if (error) {
      console.error("DB error:", error);
      return res.status(500).json({
        message: "Failed to create API key",
      });
    }

    return res.status(201).json({
      api_key: rawKey,
      warning:
        "Store this key securely. You will not be able to see it again.",
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

/**
 * GET {BASE_API_URL}/apikey/get-apikeys?user_id=xxx
 * Returns metadata only (never returns raw keys)
 */
router.get("/get-apikeys",authMiddleware, async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        message: "user_id is required",
      });
    }

    const { data, error } = await supabase
      .from("api_keys")
      .select(
        "id, name, is_active, created_at"
      )
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("DB error:", error);
      return res.status(500).json({
        message: "Failed to fetch API keys",
      });
    }

    return res.json({
      api_keys: data,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;
