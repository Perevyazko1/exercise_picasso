import {MutableRefObject, useEffect, useRef} from "react";

export interface UseInfiniteScrollProps {
    callback: () => void;
    callbackHide?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef?: MutableRefObject<HTMLElement | null>;
}

export function useInfiniteScroll({callback, callbackHide, triggerRef, wrapperRef}: UseInfiniteScrollProps) {
    const observer = useRef<IntersectionObserver | null>(null)
    // let observer: IntersectionObserver | null = null
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };
        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback()
            }

        }, options);

        observer.current.observe(triggerRef.current)
        return () => {
            if (observer.current) {
                observer.current.unobserve(triggerRef.current)
            }

        }
    }, [callback, triggerRef, wrapperRef]);
}

