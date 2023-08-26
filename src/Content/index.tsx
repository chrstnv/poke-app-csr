import cn from 'classnames';

import css from './Content.module.css';

type Props = {
    className?: string;
};

export const Content = ({className}: Props) => {
    return (
        <div className={cn(css.wrapper, className)}>
            <div className={css.root}>
                <div className={css.filters}>Filters</div>
                <div className={css.cards}>Cards</div>
            </div>
        </div>
    );
};

export default Content;
