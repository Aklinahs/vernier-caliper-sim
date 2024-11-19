// src/features/about/components/AboutPage/AboutPage.tsx

import { Profile as ProfileType } from "../../types/about.types";
import ProfileComponent from "../Profile/Profile";
import YouTubeSection from "../YouTubeSection/YouTubeSection";
import Projects from "../Projects/Projects";

const profile: ProfileType = {
  name: "Shanilka Ariyarathne",
  title: "Physicist & Science Educator",
  bio: "I'm a Sri Lankan physicist, science educator, and content creator passionate about making science accessible and engaging. With a bachelor's degree in Science and Technology and an MPhil in Applied Physics, I bring years of experience as a university lecturer and freelance content creator. My YouTube channel, with over 123,000 subscribers, simplifies complex concepts in physics, electronics, and philosophy using 3D animation. Currently, I'm developing innovative, interactive science learning tools and seeking opportunities to pursue a PhD in science education or science communication.",
  github: "https://github.com/Aklinahs",
  email: "Shanilka.Ariyarathne@Gmail.Com",
  interests: ["Science Communication", "STEM teaching", "Physics"],
  youtube: {
    channelUrl: "https://www.youtube.com/@Profmad",
    subscribers: 136000,
  },
};

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <ProfileComponent profile={profile} />
        <YouTubeSection youtube={profile.youtube} />
        <Projects />
      </div>
    </div>
  );
};

export default AboutPage;
