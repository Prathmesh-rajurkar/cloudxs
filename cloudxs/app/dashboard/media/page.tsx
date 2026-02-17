"use client";

import { getToken, getUserId } from "@/utils/auth";
import { Copy, ExternalLink } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

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

const formatBytes = (bytes?: number) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
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

const Page = () => {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const user_id = getUserId();

  const fetchMedia = useCallback(async () => {
    if (!user_id) return;

    try {
      const res = await fetch(
        `${BASE_API_URL}/media/media-get?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch media");
      }

      const data = await res.json();
      setMediaList(data.media || []);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  }, [user_id]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Files
        </h1>

        {mediaList.length === 0 ? (
          <p className="text-gray-500">No media files uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mediaList.map((media) => (
              <div
                key={media.id}
                className="bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  {isImage(media.filetype) ? (
                    // eslint-disable-next-line @next/next/no-img-element
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

                <div className="p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium truncate">
                      {media.filename}
                    </p>

                    <div className="flex gap-2 shrink-0">
                      <button
                        aria-label="Copy media URL"
                        onClick={() => copyToClipboard(media.file_url)}
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <Copy size={14} />
                      </button>

                      <a
                        aria-label="Open media URL"
                        href={media.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    {media.filetype?.toUpperCase()}{" "}
                    {media.filesize &&
                      `• ${formatBytes(media.filesize)}`}{" "}
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
