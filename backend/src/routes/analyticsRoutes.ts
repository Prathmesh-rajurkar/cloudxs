import express from "express";
import { supabase } from "../utils/supabase";

const router = express.Router();

router.get("/analytics", async (req, res) => {
    try {
        const { user_id } = req.query;
        const {data,error} = await supabase
        .from("media_files")
        .select("*")
        .eq("user_id", user_id);

        
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const totalUploads = data.length;
    const uploadsByType = data.reduce((acc: any, file) => {
      acc[file.filetype] = (acc[file.filetype] || 0) + 1;
      return acc;
    }, {});
    const totalStorageUsed = data.reduce((acc: number, file) => {
      return acc + (file.filesize || 0);
    }, 0);

    return res.json({
      totalUploads,
      uploadsByType,
      totalStorageUsed,
    });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/graph-data", async (req, res) => {
    try {
        const { user_id } = req.query;
        const {start_date, end_date} = req.query;

        const {data,error} = await supabase
        .from("media_files")
        .select("created_at")
        .eq("user_id", user_id)
        .gte("created_at", start_date)
        .lte("created_at", end_date);

        
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const uploadsByDate = data.reduce((acc: any, file) => {
      const date = new Date(file.created_at).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    return res.json({
      uploadsByDate,
    });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;