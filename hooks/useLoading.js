import { useEffect, useState } from "react"

export default (time) => {
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        let timeout = setTimeout(() => setLoading(true), time);

        return () => clearTimeout(timeout);
    }, []);

    return loading
}