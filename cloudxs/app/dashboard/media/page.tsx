"use client";

import { getToken, getUserId } from "@/utils/auth";
import React, { useEffect, useState } from "react";

interface Media {
  id: string;
  file_url: string;
  filename: string;
  filetype: string;
  filesize?: number;
  width?: number;
  height?: number;
}

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL!;

/* ---------------- Helpers ---------------- */

const formatBytes = (bytes?: number) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const isImage = (filetype?: string) => {
  if (!filetype) return false;
  return filetype.startsWith("image/");
};

const isVideo = (filetype?: string) => {
  if (!filetype) return false;
  return filetype.startsWith("video/");
};

/* ---------------- Component ---------------- */

const Page = () => {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const user_id = getUserId();

  const fetchMedia = async () => {
    try {
      const res = await fetch(
        `${BASE_API_URL}/media/media-get?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data = await res.json();
      setMediaList(data.media || []);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Files
        </h1>

        {mediaList.length === 0 ? (
          <p className="text-gray-500">No media files uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {mediaList.map((media) => (
              <div
                key={media.id}
                className="bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {/* Media Preview */}
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  {isImage(media.filetype) ? (
                    <img
                      src={media.file_url}
                      alt={media.filename}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                  ) : isVideo(media.filetype) ? (
                    <video
                      src={media.file_url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      Unsupported
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">
                      {media.filename}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(media.file_url)}
                        className="text-gray-400 hover:text-gray-700 text-xs"
                      >
                        ⧉
                      </button>

                      <a
                        href={media.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-700 text-xs"
                      >
                        ↗
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    {media.filetype?.toUpperCase()}{" "}
                    {media.filesize && `• ${formatBytes(media.filesize)}`}{" "}
                    {media.width && media.height
                      ? `• ${media.width}x${media.height}`
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
