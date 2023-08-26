import cn from 'classnames';

import {Card} from './Card';
import css from './Cards.module.css';

type Props = {
    className?: string;
};

export const Cards = ({className}: Props) => {
    return (
        <div className={cn(css.root, className)}>
            {Array(12)
                .fill(1)
                .map((index: number) => (
                    <Card key={index} />
                ))}
        </div>
    );
};
