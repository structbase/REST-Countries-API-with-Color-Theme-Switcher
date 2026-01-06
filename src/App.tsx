import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CountryPage from "./pages/CountryPage/CountryPage";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "./context/theme/ThemeProvider";

function App() {
    return (
        <ThemeProvider>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/country/:code" element={<CountryPage />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
