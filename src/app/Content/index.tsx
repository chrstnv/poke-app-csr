import {useEffect, useState} from 'react';
import cn from 'classnames';

import type {PokemonListView} from 'src/api/pokemon';
import api from 'src/api/pokemon';

import {Cards} from './Cards';
import css from './Content.module.css';

type Props = {
    className?: string;
};

const useFetchPokemons = () => {
    const [list, setList] = useState<PokemonListView[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown | null>(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setLoading(true);
                const pokemons = await api.getList({limit: '500', offset: '0'}); // TODO: Pagination

                setList(pokemons);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons().catch(() => undefined);
    }, []);

    return {list, loading, error};
};

export const Content = ({className}: Props) => {
    const {loading, error, list} = useFetchPokemons();

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
                <Cards className={css.cards} list={list} />
            </div>
        </div>
    );
};

export default Content;
