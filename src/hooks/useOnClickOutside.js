import React, { useEffect, useCallback } from "react"; // eslint-disable-line no-unused-vars

const useOnClickOutside = (ref, handler) => {
    const listener = useCallback((event) => {
        if(!ref.current || ref.current.contains(event.target)) {
            return;
        }
        handler();
    }, [ref, handler]);

    useEffect(() => {
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [listener]);
}

export default useOnClickOutside;
