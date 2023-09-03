import cn from 'classnames';

import type {PokemonListView} from 'src/api/pokemon';

import {Card} from './Card';
import css from './Cards.module.css';

type Props = {
    list?: PokemonListView[];
    className?: string;
    offset: number;
    count?: number;
    loading: boolean;
    setLastElement: (element: HTMLElement | null) => void;
};

const LOADING_GAP = 10;

export const Cards = ({list, loading, offset, count, className, setLastElement}: Props) => {
    if (!list?.length) {
        return <div>No Pokemons!</div>;
    }

    return (
        <div className={cn(css.root, className)}>
            {list.map(({name}, i) =>
                i === list.length - LOADING_GAP && !loading && count && offset <= count ? (
                    <div key={name} ref={setLastElement}>
                        <Card name={name} />
                    </div>
                ) : (
                    <Card key={name} name={name} />
                ),
            )}
            {loading && <p>loading...</p>}
        </div>
    );
};
