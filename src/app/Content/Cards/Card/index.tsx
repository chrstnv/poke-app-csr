import cn from 'classnames';

import type {PokemonEntity, GetPokemonParams} from 'src/api/pokemon';
import api, {STATS} from 'src/api/pokemon';
import {useFetch} from 'src/hooks/useFetch';

import css from './Card.module.css';

import Ability from './Ability';
import star from './star.svg';

type Props = {
    name: string;
};

const fetchPokemon = ({id}: Record<string, string>) => api.getPokemon({id});

export const Card = ({name}: Props) => {
    const {data, loading, error} = useFetch<PokemonEntity, GetPokemonParams>({
        params: {id: name},
        fetcher: fetchPokemon,
    });

    if (loading) {
        return <div className={css.root}>Loading...</div>;
    }

    if (error) {
        return <div className={css.root}>Error :(</div>;
    }

    // TODO: Написать геттеры
    const {abilities, sprites, types, stats, id} = data;

    const hp = stats?.find(({stat}) => stat.name === STATS.HP)?.base_stat || 0;
    const attack = stats?.find(({stat}) => stat.name === STATS.ATTACK)?.base_stat || 0;
    const defense = stats?.find(({stat}) => stat.name === STATS.DEFENSE)?.base_stat || 0;

    const imgSrc = sprites?.other?.['official-artwork']?.front_default;

    return (
        <div className={cn(css.root, css[types?.[0]?.type?.name])}>
            <div className={css.header}>
                <div className={css.nameWrapper}>
                    <span className={css.name}>{name}</span>
                    <span className={css.hp}>{`HP ${hp}`}</span>
                </div>
                <div>
                    <input className={css.favoriteInput} type="checkbox" id={name} name={name} value="yes" />
                    <label className={css.favoriteCheckbox} htmlFor={name}>
                        <img src={star} className={css.star} />
                    </label>
                </div>
            </div>
            <div className={css.content}>
                <img src={imgSrc} className={css.image} />
                <div className={css.types}>
                    {types?.map(({type}) => (
                        <span className={cn(css.type, css[type.name])} key={type.name}>
                            {type.name.toUpperCase()}
                        </span>
                    ))}
                </div>
                <div className={css.abilities}>
                    {abilities?.map(({ability}) => (
                        <Ability key={ability?.name} name={ability?.name} />
                    ))}
                </div>
            </div>
            <div className={css.footer}>
                <span className={css.number}>{id}</span>
                <span className={css.stats}>{`${attack}/${defense}`}</span>
            </div>
        </div>
    );
};
