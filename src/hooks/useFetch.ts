import {useEffect, useState, useRef} from 'react';

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
                const fetchedData = await fetcher(params);

                setData(fetchedData);
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

type FetcherParams = {
    limit: string;
    offset: string;
};

type UseInfiniteScrollParams<TData> = {
    pageSize?: number;
    fetcher: (params: FetcherParams) => Promise<TData>;
};

type UseInfiniteScrollResult<TData extends {count: number; results: unknown[]}> = {
    data: TData['results'];
    count?: number;
    error?: string;
    offset: number;
    loading: boolean;
    setLastElement: (element: HTMLElement | null) => void;
};

const PAGE_SIZE = 20;

export function useInfiniteScrollFetch<TData extends {count: number; results: unknown[]}>({
    fetcher,
    pageSize = PAGE_SIZE,
}: UseInfiniteScrollParams<TData>): UseInfiniteScrollResult<TData> {
    const [data, setData] = useState<TData['results']>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState<number | undefined>();
    const [lastElement, setLastElement] = useState<HTMLElement | null>(null);

    const observer = useRef(
        new IntersectionObserver(entries => {
            const first = entries[0];
            if (first.isIntersecting) {
                setOffset(no => no + pageSize);
            }
        }),
    );

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (count === undefined || offset <= count) {
                    const fetchedData = await fetcher({limit: String(pageSize), offset: String(offset)});

                    const {results, count} = fetchedData;

                    setCount(count);
                    setData([...data, ...results]);
                }
            } catch (error) {
                setError(error as string);
            } finally {
                setLoading(false);
            }
        };

        fetchData().catch(() => undefined);
    }, [fetcher, offset]);

    return {data, loading, count, offset, error, setLastElement};
}
