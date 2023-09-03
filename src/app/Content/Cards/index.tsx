import cn from 'classnames';

import type {PokemonListView} from 'src/api/pokemon';

import {Card} from './Card';
import css from './Cards.module.css';

type Props = {
    list?: PokemonListView[];
    className?: string;
};

export const Cards = ({list, className}: Props) => {
    if (!list?.length) {
        return <div>No Pokemons!</div>;
    }

    return (
        <div className={cn(css.root, className)}>
            {list.map(({name}) => (
                <Card key={name} name={name} />
            ))}
        </div>
    );
};
