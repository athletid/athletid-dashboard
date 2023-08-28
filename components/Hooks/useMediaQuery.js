import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize",
            listener);
    }, [matches, query]);

    return matches;
}

export const useIsMobile = () => {
    return useMediaQuery("(max-width: 768px)");
}

export const useIsTablet = () => {
    return useMediaQuery("(max-width:1024px) and (min-width:768px)")
}

export const useIsFromTablet = () => {
    return useMediaQuery("(min-width:768px)")
}

export const useIsLargeScreen = () => {
    return useMediaQuery("(min-width: 1024px)");
}

export const useIsExtraSmallScreen = () => {
    return useMediaQuery("(max-width: 520px)");
}

export default useMediaQuery;