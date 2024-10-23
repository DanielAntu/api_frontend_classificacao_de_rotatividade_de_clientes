import { Outlet } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import "./App.css";

function App() {
    return (
        <div className="app">
            <Header />
            <div className="area-container">
                <div className="container">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
