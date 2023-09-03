import {useEffect, useState} from 'react';

type UseFetchResult<TData> = {
    data: TData;
    loading: boolean;
    error: boolean;
};

type UseFetchParams<TData, TParams> = {
    params: TParams;
    fetcher: (params: TParams) => Promise<TData>;
};

export function useFetch<TData, TParams>({params, fetcher}: UseFetchParams<TData, TParams>): UseFetchResult<TData> {
    const [data, setData] = useState<TData>({} as TData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const ability = await fetcher(params);

                setData(ability);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData().catch(() => undefined);
    }, [JSON.stringify(params), fetcher]);

    return {data, loading, error};
}
