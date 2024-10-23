import { createContext, useState, ReactNode } from "react";
import React from "react";

interface IPredictionContext {
    predict: { predict: string };
    setPrediction: (predicti: { predict: string }) => void;
}

interface PredictionContextType {
    predict: string;
}

interface PredictionContextProviderProps {
    children: ReactNode;
}

export const PredictionContext = createContext<IPredictionContext | null>(null);

export const PredictionContextProvider: React.FC<
    PredictionContextProviderProps
> = ({ children }) => {
    const [predict, setPrediction] = useState<PredictionContextType>({
        predict: "",
    });
    return (
        <PredictionContext.Provider value={{ predict, setPrediction }}>
            {children}
        </PredictionContext.Provider>
    );
};
