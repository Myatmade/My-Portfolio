import { createContext, useContext, useMemo, useState } from "react";

type AnimationContextValue = {
  animationsEnabled: boolean;
  markAnimationsDone: () => void;
  typingComplete: boolean;
  setTypingComplete: (value: boolean) => void;
};

const AnimationContext = createContext<AnimationContextValue | undefined>(
  undefined,
);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);

  const markAnimationsDone = () => {
    setAnimationsEnabled(false);
  };

  const value = useMemo(
    () => ({
      animationsEnabled,
      markAnimationsDone,
      typingComplete,
      setTypingComplete,
    }),
    [animationsEnabled, typingComplete],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const ctx = useContext(AnimationContext);
  if (!ctx) {
    throw new Error("useAnimation must be used within AnimationProvider");
  }
  return ctx;
}
