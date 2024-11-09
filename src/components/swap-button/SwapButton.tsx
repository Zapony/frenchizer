import { useTranslate } from '@/context/TranslateContext';
import React from 'react'
import { IoMdSwap } from "react-icons/io";


const SwapButton = () => {
  const { sourceLanguage, targetLanguage, setSourceLanguage, setTargetLanguage, text, setText, translatedText, setTranslatedText } = useTranslate();
  
  const handleSwap = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    const tempText = text;
    setText(translatedText);
    setTranslatedText(tempText);
  }
  return (
    <div className="relative flex justify-center items-center">
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
            <button 
                className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-full border-4 border-bg-color transition-transform duration-300 hover:scale-110 shadow-lg"
                onClick={handleSwap}
                >
                <IoMdSwap className="w-6 h-6" />
            </button>
        </div>
    </div>
  )
}

export default SwapButton