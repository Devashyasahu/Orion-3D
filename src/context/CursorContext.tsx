import React, { createContext, useContext, useState } from 'react';

interface CursorContextType {
  cursorText: string;
  cursorVariant: 'default' | 'hover' | 'image' | 'hidden';
  setCursor: (text?: string, variant?: 'default' | 'hover' | 'image' | 'hidden') => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorText: '',
  cursorVariant: 'default',
  setCursor: () => {},
  resetCursor: () => {},
});

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'image' | 'hidden'>('default');

  const setCursor = (text: string = '', variant: 'default' | 'hover' | 'image' | 'hidden' = 'hover') => {
    setCursorText(text);
    setCursorVariant(variant);
  };

  const resetCursor = () => {
    setCursorText('');
    setCursorVariant('default');
  };

  return (
    <CursorContext.Provider value={{ cursorText, cursorVariant, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
