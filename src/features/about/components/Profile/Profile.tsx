// src/features/about/components/Profile/Profile.tsx

import { Profile as ProfileType } from "../../types/about.types";
import { Github, Mail, Youtube } from "lucide-react";

interface ProfileProps {
  profile: ProfileType;
}

const Profile = ({ profile }: ProfileProps) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl overflow-hidden">
      <div className="relative">
        {/* Header Banner */}
        <div className="h-48 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600"></div>

        {/* Profile Content */}
        <div className="relative px-6 pb-8 -mt-24">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <img
              src={`https://github.com/${profile.github.split("/").pop()}.png`}
              alt={profile.name}
              className="w-48 h-48 rounded-full border-4 border-white shadow-2xl mb-4"
            />

            {/* Name & Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {profile.name}
            </h1>
            <h2 className="text-xl text-purple-600 font-medium mb-6">
              {profile.title}
            </h2>

            {/* Social Links */}
            <div className="flex gap-6 mb-8">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Github className="w-6 h-6 text-gray-700 hover:text-black" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Mail className="w-6 h-6 text-gray-700 hover:text-black" />
              </a>
              <a
                href={profile.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Youtube className="w-6 h-6 text-red-600 hover:text-red-700" />
              </a>
            </div>

            {/* Email */}
            <div className="text-gray-600 mb-8">{profile.email}</div>

            {/* Bio */}
            <div className="max-w-2xl mb-8">
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>

            {/* Interests */}
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Areas of Interest
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-6 py-2 bg-white shadow-md rounded-full text-purple-700 
                            font-medium hover:shadow-lg transition-shadow"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
