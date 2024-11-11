import UnderConstruction from "../../../components/common/UnderConstruction/UnderConstruction";
import { BookOpen } from "lucide-react";

const PracticePage = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100">
      <UnderConstruction
        title="Practice Tests"
        description="Practice your measurement skills with our comprehensive test suite. Multiple exercises coming soon!"
        icon={<BookOpen className="w-12 h-12 text-green-500" />}
      />
    </div>
  );
};

export default PracticePage;
