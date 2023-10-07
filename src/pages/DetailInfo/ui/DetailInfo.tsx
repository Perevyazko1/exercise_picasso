import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";

interface DetailInfoProps {
    className?: string
    children?: ReactNode
}

const DetailInfo = memo((props: DetailInfoProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props
    
    const mods: Mods = {
        
    };
    
    return (
        <div
            className={classNames('', mods, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
export default DetailInfo