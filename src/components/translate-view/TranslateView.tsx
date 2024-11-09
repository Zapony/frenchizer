"use client";

import { useTranslate } from '@/context/TranslateContext';
import React, { useState } from 'react'
import { BsGlobe2 } from "react-icons/bs";

type TranslateViewProps = {
    // var to check if it is to or from
    isFrom: boolean;
    language: string;
}

const TranslateView = ({
    isFrom,
    language
}: TranslateViewProps) => {
    const { text, setText } = useTranslate();
    const [selectedOption, setSelectedOption] = useState(language);
    const [charCount, setCharCount] = useState(0);
    return (
        <div className="w-full max-w-xl p-6 bg-white rounded-3xl shadow-lg">
            <div className='p-5'>
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-semibold text-gray-500">{isFrom ? 'From' : 'To'}:</span>
                    <div className="relative w-full">
                        <div
                            className="flex items-center justify-between w-full py-3 px-5 bg-background rounded-full"
                        >
                            <BsGlobe2 className="w-5 h-5" />
                            <span className="ml-2 flex-1 px-2 text-black">{selectedOption}</span>
                        </div>
                    </div>
                </div>

                <div className="relative mb-4">
                    <textarea
                        onChange={(e) => {
                            setCharCount(e.target.value.length);
                            setText?.(e.target.value);
                        }}
                        value={isFrom ? text : ''}
                        maxLength={5000}
                        placeholder={isFrom ? 'Type here...' : 'Translation will appear here...'}
                        className="w-full p-3 bg-transparent border-none outline-none text-lg text-gray-700 font-bold resize-none"
                        rows={10}
                        cols={50}
                        readOnly={!isFrom}
                    />
                    {
                        isFrom && (
                            <div className="absolute bottom-0 right-0 p-2 text-sm text-gray-500">{charCount} / 5000</div>
                        )
                    }
                </div>

                <div className="flex flex-col items-center pt-4 border-t-2 border-gray-200">
                    <p className="mb-2">More features coming soon!</p>
                </div>
            </div>
        </div>
    )
}

export default TranslateView