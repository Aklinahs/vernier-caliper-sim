import { Construction } from "lucide-react";

interface UnderConstructionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

const UnderConstruction = ({
  title,
  description,
  icon = <Construction className="w-12 h-12 text-yellow-500" />,
  className = "",
}: UnderConstructionProps) => {
  return (
    <div className={`w-full p-8 ${className}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
        <div className="mb-4">{icon}</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
        <p className="text-gray-600 text-lg">{description}</p>
        <div className="mt-6">
          <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md">
            🚧 Under Construction
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
