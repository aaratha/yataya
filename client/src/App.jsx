import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import Plan from "./pages/Plan.jsx";
import Support from "./pages/Support.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./App.css";

function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/support" element={<Support />} />
                <Route path="/notfound" element={<NotFound />} />
            </Route>
            <Route path="*" element={<Navigate to="/notfound" replace />} />
        </Routes>
    );
}

export default App;
