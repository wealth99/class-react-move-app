import React, { useState, useEffect } from "react"; // eslint-disable-line no-unused-vars

const useDebounce = (value, delay) => {

    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounceValue;
}

export default useDebounce
