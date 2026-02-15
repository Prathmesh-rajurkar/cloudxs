import express from "express";
import { supabase } from "../utils/supabase";

const router = express.Router();

router.post("/media-save", async (req, res) => {
  try {
    const { url, userId, filename, filetype, filesize } = req.body;
    const {data: file, error} = await supabase
      .from("media_files")
      .insert({
        file_url: url,
        user_id: userId,
        filename,
        filetype,
        filesize
      })
      .select("*")
      .single();
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.json({ success: true, file });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/media-get", async (req, res) => {
  try {
    const { user_id } = req.query;
    const { data, error } = await supabase
      .from("media_files")
      .select("*")
      .eq("user_id", user_id);
    // console.log(data);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.json({ media: data });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
