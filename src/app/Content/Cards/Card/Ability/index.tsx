import type {AbilityEntity, GetAbilityParams} from 'src/api/pokemon';
import api, {LANGUAGES} from 'src/api/pokemon';
import {useFetch} from 'src/hooks/useFetch';

import css from '../Card.module.css';

type Props = {
    name: string;
};

const fetchAbility = ({id}: Record<string, string>) => api.getAbility({id});

export const Ability = ({name}: Props) => {
    const {data, loading, error} = useFetch<AbilityEntity, GetAbilityParams>({
        params: {id: name},
        fetcher: fetchAbility,
    });

    if (loading) {
        return <div className={css.abilityDescription}>{`${name} description is loading...`}</div>;
    }

    if (error) {
        return <div className={css.abilityDescription}>{`${name} description loading failed :(`}</div>;
    }

    // TODO: Написать геттеры
    const {effect_entries, name: abilityName} = data;

    const description = effect_entries?.find(({language}) => language?.name === LANGUAGES.EN)?.effect;

    return (
        <div key={abilityName} className={css.ability}>
            <div className={css.abilityTitle}>{abilityName}</div>
            <div title={description} className={css.abilityDescription}>
                {description}
            </div>
        </div>
    );
};

export default Ability;
