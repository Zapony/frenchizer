"use client";

import { createContext, ReactNode, useContext, useState } from 'react';

const TranslateContext = createContext({
    text: '',
    setText: (text: string) => {},
    translatedText: '',
    setTranslatedText: (translatedText: string) => {}
});

interface TranslateProviderProps {
    children: ReactNode;
}

export const TranslateProvider = ({ children }: TranslateProviderProps) => {
    const [text, setText] = useState('This is it');
    const [translatedText, setTranslatedText] = useState('');

    return (
        <TranslateContext.Provider value={{ text, setText, translatedText, setTranslatedText }}>
            {children}
        </TranslateContext.Provider>
    );
};

export const useTranslate = () => useContext(TranslateContext);
