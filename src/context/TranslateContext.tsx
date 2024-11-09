"use client";

import { createContext, ReactNode, useContext, useState } from 'react';

const TranslateContext = createContext({
    text: '',
    setText: (text: string) => {},
    translatedText: '',
    setTranslatedText: (translatedText: string) => {},
    targetLanguage: '',
    setTargetLanguage: (language: string) => {},
    sourceLanguage: '',
    setSourceLanguage: (language: string) => {}
});

interface TranslateProviderProps {
    children: ReactNode;
}

export const TranslateProvider = ({ children }: TranslateProviderProps) => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('French');
    const [sourceLanguage, setSourceLanguage] = useState('English');

    return (
        <TranslateContext.Provider value={{ 
            text, 
            setText, 
            translatedText, 
            setTranslatedText, 
            targetLanguage,
            setTargetLanguage,
            sourceLanguage,
            setSourceLanguage }}>
            {children}
        </TranslateContext.Provider>
    );
};

export const useTranslate = () => useContext(TranslateContext);
