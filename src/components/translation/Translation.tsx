"use client";

import { useEffect } from 'react';
import { useTranslate } from '@/context/TranslateContext';
import TranslateView from '../translate-view/TranslateView';
import debounce from 'lodash.debounce';
// import SwapButton from '../swap-button/SwapButton';

const Translation = () => {
    const { text, setTranslatedText, targetLanguage } = useTranslate();
    const tarLang = targetLanguage.toLowerCase().substring(0, 2);

    // Function to call Google Translate API
    const translateText = async (inputText: string) => {
        if (!inputText) {
            setTranslatedText('');
            return;
        }

        try {
            const response = await fetch(`/api/translate`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    text: inputText, 
                    targetLanguage: tarLang
                })
            });
            
            const { translatedText } = await response.json();
            setTranslatedText(translatedText);
        } catch (error) {
            console.error('Translation error:', error);
        }
    };

    const debouncedTranslate = debounce(translateText, 1000);
/*
    // useEffect to call the debounced translation function when text changes
    useEffect(() => {
        if (text) {
            debouncedTranslate(text);  // Will call translateText only after user stops typing
        }
        return () => debouncedTranslate.cancel();  // Cancel debounce on component unmount
    }, [text]);  // Dependency on text state
 */   

    useEffect(() => {
        debouncedTranslate(text);
        return () => debouncedTranslate.cancel();
    }, [text]);


    return (
        <div className="min-h-screen flex flex-col p-4 md:flex-row items-center justify-center gap-6">
            <div className="flex flex-col md:flex-row items-start justify-center gap-4">
                <TranslateView isFrom={true} />
                 {/* <SwapButton /> */}
                <TranslateView isFrom={false} />
            </div>
        </div>
    );
};

export default Translation;
