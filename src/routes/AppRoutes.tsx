import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import SimulatorPage from "../features/simulator/components/SimulatorPage";
import PracticePage from "../features/practice/components/PracticePage/PracticePage";
import AboutPage from "../features/about/components/AboutPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<SimulatorPage />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
