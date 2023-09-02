import {ReactNode} from 'react';
import cn from 'classnames';

import css from './Header.module.css';

type Props = {
    className?: string;
    children: ReactNode;
};

export const Header = ({className, children}: Props) => {
    return (
        <div className={cn(css.wrapper, className)}>
            <div className={css.root}>{children}</div>
        </div>
    );
};

export default Header;
