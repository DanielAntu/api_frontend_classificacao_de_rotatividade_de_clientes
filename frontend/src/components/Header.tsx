import { BsPeopleFill } from "react-icons/bs";

import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <h1>
                <BsPeopleFill /> <span>Rotatividade de Clientes</span>
            </h1>
        </div>
    );
};

export default Header;
