import UnderConstruction from "../../../components/common/UnderConstruction/UnderConstruction";
import { Ruler } from "lucide-react";

const SimulatorPage = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100">
      <UnderConstruction
        title="Vernier Caliper Simulator"
        description="Our interactive simulation tool is coming soon. You'll be able to practice measurements with a virtual vernier caliper."
        icon={<Ruler className="w-12 h-12 text-blue-500" />}
      />
    </div>
  );
};

export default SimulatorPage;
