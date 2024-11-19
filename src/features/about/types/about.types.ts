// src/features/about/types/about.types.ts

export interface Profile {
    name: string;
    title: string;
    bio: string;
    github: string;
    email: string;
    interests: string[];
    youtube: {
      subscribers: number;
      channelUrl: string;
      videos?: YouTubeVideo[];
    };
  }
  
  export interface Project {
    id: string;
    name: string;
    description: string;
    url: string;
  }

  export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
  }

  

  