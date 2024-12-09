"use client";

import { useTranslate } from '@/context/TranslateContext';
import React, { useState, useEffect, useRef } from 'react';
import { BsGlobe2 } from "react-icons/bs";
import debounce from 'lodash.debounce';

type TranslateViewProps = {
    // var to check if it is to or from
    isFrom: boolean;
}

const TranslateView = ({
    isFrom,
}: TranslateViewProps) => {
    const { text, setText, translatedText, sourceLanguage, targetLanguage } = useTranslate();
    const [charCount, setCharCount] = useState(0);
    
        // Track the last translation sent to avoid duplicates
    const lastTranslationSent = useRef<string | null>(null);
    
    const sendTranslationToServer = debounce(async (translationData: any) => {
        try {
            const response = await fetch('https://frenchizer.com/api/saveTranslation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(translationData),
            });

           /* if (response.ok) {
                console.log('Translation saved successfully');
            } else {
                console.error('Failed to save translation');
            }*/
        } catch (error) {
            console.error('Error sending translation to server:', error);
        }
    }, 2000);
    

    // Send translation when it is updated
    useEffect(() => {
        if (translatedText && lastTranslationSent.current !== translatedText && sourceLanguage && targetLanguage) {
            const translationData = {
                source: text,
                target: translatedText,
                needs_correction: false, // To be updated
                corrected: translatedText, // To be modified
            };
            sendTranslationToServer(translationData);
            lastTranslationSent.current = translatedText;
        }
    }, [translatedText]); // Triggers when translatedText changes

    return (
        <div className="w-full max-w-xl p-4 md:p-6 bg-white rounded-3xl shadow-lg">
            <div className='p-5'>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                    <span className="text-xs font-semibold text-gray-400">{isFrom ? 'From' : 'To'}:</span>
                    <div className="relative w-full">
                        <div
                            className="flex items-center justify-between w-full py-3 px-5 bg-background rounded-full"
                        >
                            <BsGlobe2 className="w-5 h-5" />
                            <span className="ml-2 flex-1 px-2 text-black">{isFrom ? sourceLanguage : targetLanguage}</span>
                        </div>
                    </div>
                </div>

                <div className="relative mb-4">
                    <textarea
                        onChange={(e) => {
                            const newText = e.target.value;
                            setCharCount(e.target.value.length);
                            setText?.(e.target.value);
                        }}
                        value={isFrom ? text : translatedText}
                        maxLength={500}
                        //placeholder={isFrom ? 'Type here...' : 'Translation will appear here...'}
                        className="w-full p-3 bg-transparent border-none outline-none text-lg text-gray-700 font-bold resize-none"
                        rows={10}
                        cols={50}
                        readOnly={!isFrom}
                    />
                    {
                        isFrom && (
                            <div className="absolute bottom-0 right-0 p-2 text-sm text-gray-500">{charCount} / 500</div>
                        )
                    }
                </div>

                {/*<div className="flex flex-col items-center pt-4 border-t-2 border-gray-200">
                    <p className="mb-2">More features coming soon!</p>
                </div>*/}
            </div>
        </div>
    )
}

export default TranslateView