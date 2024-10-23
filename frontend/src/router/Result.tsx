import { useContext } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { PredictionContext } from "../context/PredictioContext";

import "./Result.css";

const Result = () => {
    const navigate = useNavigate();

    const context = useContext(PredictionContext);

    if (!context) {
        throw new Error(
            "Result must be used within a PredictionContextProvider"
        );
    }

    const { predict } = context;

    return (
        <div className="container-result">
            <h3>O cliente citado tem a probabilidade de sair ou não:</h3>
            <div className="result">
                <p>
                    {predict && predict.predict !== "" ? (
                        predict.predict.toUpperCase()
                    ) : (
                        <span>Por favor insira todos os dados na home</span>
                    )}
                </p>
            </div>
            <button className="btn" onClick={() => navigate("/")}>
                <BsArrowLeftCircleFill /> Voltar para Home
            </button>
        </div>
    );
};

export default Result;
