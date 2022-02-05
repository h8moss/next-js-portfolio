import { useEffect, useState } from "react"

export default function useLoading(time) {
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        let timeout = setTimeout(() => setLoading(true), time);

        return () => clearTimeout(timeout);
    }, [time]);

    return loading
}