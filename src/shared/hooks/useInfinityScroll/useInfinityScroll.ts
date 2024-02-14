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
            if (!entry.isIntersecting){
                if (callbackHide)
                callbackHide()
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

// import {MutableRefObject, useEffect, useRef} from "react";
//
// export interface UseInfiniteScrollProps {
//     callback: () => void;
//     triggerRef: MutableRefObject<HTMLElement | null>;
//     wrapperRef: MutableRefObject<HTMLElement | null>;
// }
//
// export const useInfiniteScroll = ({callback, triggerRef, wrapperRef}: UseInfiniteScrollProps) => {
//     const callbackRef = useRef(callback);
//
//     useEffect(() => {
//         callbackRef.current = callback;
//     }, [callback]);
//
//     useEffect(() => {
//         const options = {
//             root: wrapperRef.current,
//             rootMargin: '300px',
//             threshold: 1.0
//         }
//
//         const currentTriggerRef = triggerRef.current;
//
//
//         if (currentTriggerRef && wrapperRef.current) {
//             options.rootMargin = `${wrapperRef.current.clientHeight / 3}px`;
//
//             const observer = new IntersectionObserver(([entry]) => {
//                 if (entry.isIntersecting) {
//                     callbackRef.current();
//                 }
//             }, options);
//
//
//             observer.observe(currentTriggerRef);
//
//             return () => {
//                 if (currentTriggerRef) {
//                     observer.unobserve(currentTriggerRef);
//                 }
//             }
//         }
//     }, [triggerRef, wrapperRef]);
// }