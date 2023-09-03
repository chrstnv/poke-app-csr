import http from './';

export type GetListParams = {
    limit: string;
    offset: string;
};

export type PokemonListView = {
    name: string;
    url: string;
};

export type GetListResponse = {
    count: number;
    next?: string;
    previous?: string;
    results: PokemonListView[];
};

export type GetPokemonParams = {
    id: string;
};

type Ability = {
    ability: {
        name: string;
        url: string;
    };
};

type Values<T> = T[keyof T];

export const STATS = {
    HP: 'hp',
    ATTACK: 'attack',
    DEFENSE: 'defense',
} as const;

type Stat = {
    base_stat: number;
    stat: {
        name: Values<typeof STATS>;
    };
};

const TYPES = {
    GRASS: 'grass',
    POISON: 'poison',
    NORMAL: 'normal',
    FIGHTING: 'fighting',
    FLYING: 'flying',
    GROUND: 'ground',
    ROCK: 'rock',
    BUG: 'bug',
    GHOST: 'ghost',
    STEEL: 'steel',
    FIRE: 'fire',
    WATER: 'water',
    ELECTRIC: 'electric',
    PSYCHIC: 'psychic',
    ICE: 'ice',
    DRAGON: 'dragon',
    DARK: 'dark',
    FAIRY: 'fairy',
    UNKNOWN: 'unknown',
    SHADOW: 'shadow',
} as const;

type Type = {
    type: {
        name: Values<typeof TYPES>;
        url: string;
    };
};

export type PokemonEntity = {
    id: number;
    name: string;
    abilities: Ability[];
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    stats: Stat[];
    types: Type[];
};

type GetPokemonResponse = PokemonEntity;

export const LANGUAGES = {
    EN: 'en',
};

type Language = {
    name: Values<typeof LANGUAGES>;
};
type EffectEntry = {
    effect: string;
    language: Language;
};

export type AbilityEntity = {
    name: string;
    effect_entries: EffectEntry[];
};

export type GetAbilityParams = {
    id: string;
};

type GetAbilityResponse = AbilityEntity;

class PokemonApi {
    getList(params: GetListParams) {
        const query = new URLSearchParams(params).toString();

        return http.get<GetListResponse>(`/pokemon?${query}`).then(({data}) => data);
    }

    getPokemon({id}: GetPokemonParams) {
        return http.get<GetPokemonResponse>(`/pokemon/${id}`).then(({data}) => data);
    }

    getAbility({id}: GetAbilityParams) {
        return http.get<GetAbilityResponse>(`/ability/${id}`).then(({data}) => data);
    }
}

// TODO: Singleton???
export default new PokemonApi();
