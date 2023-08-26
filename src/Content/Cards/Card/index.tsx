import css from './Card.module.css';

import star from './star.svg';
import image from './image.png';

export const Card = () => {
    return (
        <div className={css.root}>
            <div className={css.header}>
                <div className={css.nameWrapper}>
                    <span className={css.name}>Bulbasaur</span>
                    <span className={css.hp}>HP 45</span>
                </div>
                <div>
                    {/* TODO: Make ids unique */}
                    <input className={css.favoriteInput} type="checkbox" id="favorite" name="favorite" value="yes" />
                    <label className={css.favoriteCheckbox} htmlFor="favorite">
                        <img src={star} className={css.star} />
                    </label>
                </div>
            </div>
            <div className={css.content}>
                <img src={image} className={css.image} />
                <div className={css.types}>
                    {['grass', 'poison'].map(type => (
                        <span className={css[type]} key={type}>
                            {type.toUpperCase()}
                        </span>
                    ))}
                </div>
                <div className={css.abilities}>
                    {[
                        {
                            title: 'Overgrow',
                            description:
                                'When this Pokémon has 1/3 or less of its HP remaining, its grass-type moves inflict 1.5× as much regular damage.',
                        },
                        {
                            title: 'Chlorophyll',
                            description:
                                "This Pokémon's Speed is doubled during strong sunlight. This bonus does not count as a stat modifier.",
                        },
                    ].map(({title, description}) => (
                        <div key={title} className={css.ability}>
                            <div className={css.abilityTitle}>{title}</div>
                            <div className={css.abilityDescription}>{description}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={css.footer}>
                <span className={css.number}>001</span>
                <span className={css.stats}>49/49</span>
            </div>
        </div>
    );
};
