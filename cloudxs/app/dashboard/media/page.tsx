'use client';
import { getToken, getUserId } from '@/utils/auth';
import React from 'react'
interface Media {
  id: number;
  file_url: string;
  filename: string;
  filetype: string;
}
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
const page = () => {
  const [mediaList, setMediaList] = React.useState<Media[]>([]);
  const user_id = getUserId();
  const fetchMedia = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/media/media-get?user_id=${user_id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await res.json();
      setMediaList(data.media);
      console.log(data);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  }
  React.useEffect(() => {
    fetchMedia();
  }, []);
  return (
    <div className='p-3'>
      <h1 className='text-2xl font-bold'>Media Management</h1>

      <div>
        {mediaList.length === 0 ? (
          <p className='text-gray-500 mt-4'>No media files uploaded yet.</p>
        ) : (
          <div className='grid md:grid-cols-4 grid-cols-2 gap-4 mt-4'>
            {mediaList.map((media) => (
              <div key={media.id} className='mb-2'>
                <img src={media.file_url} alt={media.filename} className='w-16 h-16 object-cover rounded-md' />
                <a href={media.file_url} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>
                  {media.filename}
                </a>
                <span className='text-sm text-gray-500 ml-2'>({media.filetype})</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default page