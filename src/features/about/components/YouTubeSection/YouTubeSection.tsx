// src/features/about/components/YouTubeSection/YouTubeSection.tsx

import React from "react";
import { Profile } from "../../types/about.types";
import { Youtube, ExternalLink } from "lucide-react";
import youtubeIcon from "../../assets/youtube-logo.png";

interface YouTubeSectionProps {
  youtube: Profile["youtube"];
}

const YouTubeSection = ({ youtube }: YouTubeSectionProps) => {
  const videos = [
    {
      id: "1",
      title: "Power Factor",
      thumbnail: `https://img.youtube.com/vi/r97cKTLoS74/maxresdefault.jpg`,
      url: "https://www.youtube.com/watch?v=r97cKTLoS74",
    },
    {
      id: "2",
      title: "Basics of Electronics",
      thumbnail: `https://img.youtube.com/vi/Rk9MNU3ASwc/maxresdefault.jpg`,
      url: "https://youtu.be/Rk9MNU3ASwc?si=ElvgoMkfbQnF-VN8",
    },
    {
      id: "3",
      title: "How Does a Clock Work",
      thumbnail: `https://img.youtube.com/vi/2SF5oGDUTrI/maxresdefault.jpg`,
      url: "https://www.youtube.com/watch?v=2SF5oGDUTrI&t",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        <Youtube className="w-8 h-8 text-red-600" />
        <h2 className="text-2xl font-bold">YouTube Channel</h2>
      </div>

      {/* Channel Info */}
      <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
        <img
          src={youtubeIcon}
          alt="YouTube Channel"
          className="w-32 h-32 rounded-full shadow-md"
        />

        <div>
          <div className="text-lg mb-2">
            <span className="font-semibold">Subscribers:</span>{" "}
            {(youtube.subscribers / 1000).toFixed(1)}K
          </div>

          <a
            href={youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Youtube className="w-5 h-5" />
            Visit Channel
          </a>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative group">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                  <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-red-600 transition-colors">
                  {video.title}
                </h3>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeSection;
