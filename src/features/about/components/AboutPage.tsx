import UnderConstruction from "../../../components/common/UnderConstruction/UnderConstruction";
import { User } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100">
      <UnderConstruction
        title="About Me"
        description="Learn more about the developer and explore other interesting projects. Bio and social links coming soon!"
        icon={<User className="w-12 h-12 text-purple-500" />}
      />
    </div>
  );
};

export default AboutPage;
