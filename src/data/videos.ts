export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
  }
  
  export const videos: Video[] = [
    {
      id: "1",
      title: "[Title 1]", // Add your video title
      description: "[Description 1]", // Add brief description
      thumbnail: "https://img.youtube.com/vi/r97cKTLoS74/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=r97cKTLoS74"
    },
    {
      id: "2", 
      title: "[Title 2]",
      description: "[Description 2]",
      thumbnail: "https://img.youtube.com/vi/Rk9MNU3ASwc/maxresdefault.jpg",
      url: "https://youtu.be/Rk9MNU3ASwc"
    },
    {
      id: "3",
      title: "[Title 3]",
      description: "[Description 3]",
      thumbnail: "https://img.youtube.com/vi/2SF5oGDUTrI/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=2SF5oGDUTrI"
    }
  ];