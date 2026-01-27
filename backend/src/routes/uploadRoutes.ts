import express from "express";
import crypto from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { supabase } from "../utils/supabase";

const router = express.Router();

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getUploadUrl(
  filename: string,
  filetype: string,
  apiKey: string
) {
  const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");
  console.log(keyHash);
  
  const { data: apiKeyRow, error } = await supabase
    .from("api_keys")
    .select("user_id, is_active")
    .eq("key_hash", keyHash)
    .single();

  if (error || !apiKeyRow || !apiKeyRow.is_active) {
    throw new Error("Invalid API key");
  }
  console.log(apiKeyRow);
  
  const { data: user } = await supabase
    .from("users")
    .select("username")
    .eq("id", apiKeyRow.user_id)
    .single();
  console.log(user);
  
  if (!user) {
    throw new Error("User not found");
  }

  const ext = filename.split(".").pop();
  const id = crypto.randomUUID().slice(0, 8);

  const key = `${user.username}/${id}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    ContentType: filetype,
  });

  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: 60,
  });

  return { uploadUrl, key };
}

router.post("/upload-url", async (req, res) => {
  try {
    const { filename, filetype, apiKey } = req.body;

    if (!filename || !filetype || !apiKey) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const result = await getUploadUrl(filename, filetype, apiKey);

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
