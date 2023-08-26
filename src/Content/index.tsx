import cn from 'classnames';

import {Cards} from './Cards';
import css from './Content.module.css';

type Props = {
    className?: string;
};

export const Content = ({className}: Props) => {
    return (
        <div className={cn(css.wrapper, className)}>
            <div className={css.root}>
                <div className={css.filters}>Filters</div>
                <Cards className={css.cards} />
            </div>
        </div>
    );
};

export default Content;
