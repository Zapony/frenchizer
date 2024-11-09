"use client";

import { useEffect } from 'react';
import { useTranslate } from '@/context/TranslateContext';
import TranslateView from '../translate-view/TranslateView';
import debounce from 'lodash.debounce';

const Translation = () => {
    const { text, setTranslatedText } = useTranslate();

    // Function to call Google Translate API
    const translateText = async (inputText: string) => {
        if (!inputText) {
            setTranslatedText('');
            return;
        }

        try {
            const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=de&dt=t&q=${text}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputText, targetLanguage: 'fr' }) // or 'en' based on your props/state
            });

            const { translatedText } = await response.json();
            setTranslatedText(translatedText);
        } catch (error) {
            console.error('Translation error:', error);
        }
    };

    const debouncedTranslate = debounce(translateText, 500);

    useEffect(() => {
        debouncedTranslate(text);
        return () => debouncedTranslate.cancel();
    }, [text]);

    console.log('text:', text);

    return (
        <div className="h-screen flex items-center justify-center gap-6">
            <TranslateView isFrom={true} language="English" />
            <TranslateView isFrom={false} language="French" />
        </div>
    );
};

export default Translation;
