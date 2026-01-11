import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Plan from "./pages/Plan.jsx";
import Support from "./pages/Support.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/support" element={<Support />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/notfound" replace />} />
        </Routes>
    );
}

export default App;
