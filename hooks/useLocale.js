const { useRouter } = require("next/router")

const useLocale = () => {
    const router = useRouter();

    return router.locale;
}

export default useLocale;