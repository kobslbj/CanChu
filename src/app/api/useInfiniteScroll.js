/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const useInfiniteScroll = (callback, waitTime = 500, threshold = 100, hasNextCursor = true) => {
  const debouncedCallback = debounce(callback, waitTime);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY, innerHeight } = window;
      const docHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = scrollY + innerHeight + threshold >= docHeight;

      if (scrolledToBottom && hasNextCursor && !isLoading) {
        setIsLoading(true);
        debouncedCallback();
      }
    };

    const handleDebouncedScroll = debounce(handleScroll, waitTime);

    const handleScrollComplete = () => {
      if (isLoading) {
        setIsLoading(false);
      }
    };

    window.addEventListener('scroll', handleDebouncedScroll);
    window.addEventListener('scroll', handleScrollComplete);

    return () => {
      window.removeEventListener('scroll', handleDebouncedScroll);
      window.removeEventListener('scroll', handleScrollComplete);
    };
  }, [debouncedCallback, hasNextCursor, isLoading, threshold, waitTime]);

  return setIsLoading;
};

export default useInfiniteScroll;
