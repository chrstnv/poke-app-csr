import cn from 'classnames';

import type {PokemonListView, GetListParams} from 'src/api/pokemon';
import {useFetch} from 'src/hooks/useFetch';
import api from 'src/api/pokemon';

import {Cards} from './Cards';
import css from './Content.module.css';

type Props = {
    className?: string;
};

const fetchList = ({limit, offset}: Record<string, string>) => api.getList({limit, offset});

export const Content = ({className}: Props) => {
    const {data, loading, error} = useFetch<PokemonListView[], GetListParams>({
        params: {limit: '500', offset: '0'},
        fetcher: fetchList,
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error!</div>;
    }

    return (
        <div className={cn(css.wrapper, className)}>
            <div className={css.root}>
                <div className={css.filters}>Filters</div>
                <Cards className={css.cards} list={data} />
            </div>
        </div>
    );
};

export default Content;
