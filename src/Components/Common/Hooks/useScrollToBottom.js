import { useState, useEffect, useRef } from "react";

export const useScrollToBottom = (messages) => {

  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const elementEndBottomRef = useRef(null);

  useEffect(() => {
    isAutoScroll && elementEndBottomRef.current?.scrollIntoView();
  }, [messages]);

  const scrollHandler = (e) => {
    const element = e.currentTarget;
    if (
      Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <= 200
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };
  return {
    scrollHandler,
    elementEndBottomRef,
  };
};
