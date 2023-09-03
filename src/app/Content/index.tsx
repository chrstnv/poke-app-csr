import cn from 'classnames';

import type {GetListResponse} from 'src/api/pokemon';
import {useInfiniteScrollFetch} from 'src/hooks/useFetch';
import api from 'src/api/pokemon';

import {Cards} from './Cards';
import css from './Content.module.css';

type Props = {
    className?: string;
};

const fetchList = ({limit, offset}: Record<string, string>) => api.getList({limit, offset});

export const Content = ({className}: Props) => {
    const {data, loading, error, count, offset, setLastElement} = useInfiniteScrollFetch<GetListResponse>({
        fetcher: fetchList,
    });

    if (loading && count === undefined) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={cn(css.wrapper, className)}>
            <div className={css.root}>
                <div className={css.filters}>Filters</div>
                <Cards
                    className={css.cards}
                    list={data}
                    count={count}
                    offset={offset}
                    loading={loading}
                    setLastElement={setLastElement}
                />
            </div>
        </div>
    );
};

export default Content;
