'use client';

import { createContext, useContext, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GSAPContext = createContext({});

export function useGSAPContext() {
  return useContext(GSAPContext);
}

interface Props {
  children: ReactNode;
}

export function GSAPProvider({ children }: Props) {
  return (
    <GSAPContext.Provider value={{}}>
      {children}
    </GSAPContext.Provider>
  );
}
