import {useEffect, useState} from 'react';

import type {AbilityEntity} from 'src/api/pokemon';
import api, {LANGUAGES} from 'src/api/pokemon';

import css from '../Card.module.css';

type Props = {
    name: string;
};

const useFetchAbility = (id: string) => {
    const [entity, setEntity] = useState<AbilityEntity>({} as AbilityEntity);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown | null>(null);

    useEffect(() => {
        const fetchAbility = async () => {
            try {
                setLoading(true);
                const ability = await api.getAbility({id});

                setEntity(ability);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAbility().catch(console.error);
    }, []);

    return {entity, loading, error};
};

export const Ability = ({name}: Props) => {
    const {entity, loading, error} = useFetchAbility(name);

    if (loading) {
        return <div className={css.abilityDescription}>{`${name} description is loading...`}</div>;
    }

    if (error) {
        return <div className={css.abilityDescription}>{`${name} description loading failed :(`}</div>;
    }

    // TODO: Написать геттеры
    const {effect_entries, name: abilityName} = entity;

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
