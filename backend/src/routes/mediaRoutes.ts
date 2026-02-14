import express from "express";
import { supabase } from "../utils/supabase";

const router = express.Router();

router.post("/media-save", async (req, res) => {
  try {
    const { url, userId, filename, filetype} = req.body;
    const file = await supabase.from("media_file").insert({
      file_url: url,
      user_id: userId,
      filename,
      filetype
    }).select("*").single();

    res.json({ success: true, file });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/media-get", async (req, res) => {
    try {
      const { userId } = req.query;
      const { data, error } = await supabase
        .from("media_files")
        .select("*")
        .eq("user_id", userId);
        console.log(data);
  
      if (error) {
        return res.status(500).json({ message: error.message });
      }
  
      res.json({ media: data });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });


export default router;