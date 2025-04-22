import { useEffect, useState } from "react";

interface IAnimatedText {
  text: string;
  once: boolean;
  callbackFunc: () => void;
}

export const useAnimatedText = ({
  text,
  once,
  callbackFunc,
}: IAnimatedText) => {
  const [displayText, setDisplayText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setCurrentIndex(0);
    setDisplayText("");
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else if (!once) {
      setCurrentIndex(0);
      setDisplayText("");
    } else {
      callbackFunc?.();
    }
  }, [callbackFunc, currentIndex, displayText, once, text]);

  return displayText;
};
