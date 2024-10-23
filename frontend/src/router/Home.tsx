import { useState, useEffect, useContext } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCaretDownFill, BsArrowRightCircleFill } from "react-icons/bs";
import { PredictionContext } from "../context/PredictioContext";

import "./home.css";

const Home = () => {
    const [geography, setGeography] = useState<Array<any[]>>([]);
    const [gender, setGender] = useState<Array<any[]>>([]);
    const [hasCrCard, setHasCrCard] = useState<Array<any[]>>([]);
    const [isActivMember, setIsActivMember] = useState<Array<any[]>>([]);
    const [geographyValue, setGeographyValue] = useState<string>("");
    const [genderValue, setGenderValue] = useState<string>("");
    const [hasCrCardValue, setHasCrCardValue] = useState<string>("");
    const [isActivMemberValue, setIsActivMemberValue] = useState<string>("");
    const [creditScore, setCreditScore] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [tenureMonths, setTenureMonths] = useState<string>("");
    const [balance, setBalance] = useState<string>("");
    const [numOfProducts, setNumOfProducts] = useState<string>("");
    const [estimatedSalary, setEstimatedSalary] = useState<string>("");
    const [loyaltyScore, setLoyaltyScore] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const context = useContext(PredictionContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error("Home must be used within a PredictionContextProvider");
    }

    const { setPrediction } = context;

    const url = "http://127.0.0.1:5000/";

    useEffect(() => {
        buildGetFetch("geography", setGeography);
        buildGetFetch("gender", setGender);
        buildGetFetch("hasCrCard", setHasCrCard);
        buildGetFetch("isActivMember", setIsActivMember);
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        set: (data: string) => void
    ) => {
        set(e.target.value);
    };

    const buildGetFetch = async (
        endpoint: string,
        set: (data: Array<any[]>) => void
    ) => {
        try {
            const response = await fetch(url + endpoint);
            const data = await response.json();
            set(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const obj = {
            credit_score: +creditScore,
            age: +age,
            tenure_months: +tenureMonths,
            balance: +balance,
            num_of_products: +numOfProducts,
            estimated_salary: +estimatedSalary,
            loyalty_score: +loyaltyScore,
            geography: +geographyValue,
            gender: +genderValue,
            hasCrCard: +hasCrCardValue,
            isActivMember: +isActivMemberValue,
        };

        if (
            !creditScore ||
            !age ||
            !tenureMonths ||
            !balance ||
            !numOfProducts ||
            !estimatedSalary ||
            !loyaltyScore ||
            !geographyValue ||
            !genderValue ||
            !hasCrCardValue ||
            !isActivMemberValue
        ) {
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(url + "predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            const data = await response.json();
            setPrediction(data);

            navigate("/result");
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="home">
            <h2>
                <span>Preencha o Formulário abaixo</span>
                <BsFillCaretDownFill />
            </h2>
            <form method="POST" onSubmit={handleSubmit}>
                <div className="form-control">
                    <input
                        type="number"
                        name="credit_score"
                        id="credit_score"
                        placeholder="Pontuação de Crédito"
                        onChange={(e) => setCreditScore(e.target.value)}
                        value={creditScore}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="number"
                        name="age"
                        id="age"
                        placeholder="Idade do Cliente"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="number"
                        name="tenure_months"
                        id="tenure_months"
                        placeholder="Tempo de empresa"
                        onChange={(e) => setTenureMonths(e.target.value)}
                        value={tenureMonths}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="number"
                        name="balance"
                        id="balance"
                        placeholder="Saldo em conta"
                        onChange={(e) => setBalance(e.target.value)}
                        value={balance}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="number"
                        name="num_of_products"
                        id="num_of_products"
                        placeholder="Números de produtos mantidos"
                        onChange={(e) => setNumOfProducts(e.target.value)}
                        value={numOfProducts}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="number"
                        name="estimated_salary"
                        id="estimated_salary"
                        placeholder="Salário Estimado"
                        onChange={(e) => setEstimatedSalary(e.target.value)}
                        value={estimatedSalary}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="number"
                        name="loyalty_score"
                        id="loyalty_score"
                        placeholder="Pontuação de fidelidade"
                        onChange={(e) => setLoyaltyScore(e.target.value)}
                        value={loyaltyScore}
                    />
                </div>
                <div className="form-control">
                    <select
                        name="geography"
                        id="geography"
                        onChange={(e) => handleChange(e, setGeographyValue)}>
                        <option value="" aria-readonly>
                            Selecione um País
                        </option>
                        {geography &&
                            geography.map((item) => (
                                <option key={item[0]} value={item[0]}>
                                    {item[1]}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="form-control">
                    <select
                        name="gender"
                        id="gender"
                        onChange={(e) => handleChange(e, setGenderValue)}>
                        <option value="" aria-readonly>
                            Selecione o gênero
                        </option>
                        {gender &&
                            gender.map((item) => (
                                <option key={item[0]} value={item[0]}>
                                    {item[1]}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="form-control">
                    <select
                        name="hasCrCard"
                        id="hasCrCard"
                        onChange={(e) => handleChange(e, setHasCrCardValue)}>
                        <option value="" aria-readonly>
                            Selecione se usa cartão de crédito
                        </option>
                        {hasCrCard &&
                            hasCrCard.map((item) => (
                                <option key={item[0]} value={item[0]}>
                                    {item[1]}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="form-control">
                    <select
                        name="isActivMember"
                        id="isActivMember"
                        onChange={(e) =>
                            handleChange(e, setIsActivMemberValue)
                        }>
                        <option value="" aria-readonly>
                            Selecione se é ativo ou não
                        </option>
                        {isActivMember &&
                            isActivMember.map((item) => (
                                <option key={item[0]} value={item[0]}>
                                    {item[1]}
                                </option>
                            ))}
                    </select>
                </div>
                {!loading && (
                    <button type="submit" className="btn">
                        <span>Enviar</span> <BsArrowRightCircleFill />
                    </button>
                )}
                {loading && (
                    <button type="submit" className="btn" disabled>
                        Carregando...
                    </button>
                )}
            </form>
        </div>
    );
};

export default Home;
