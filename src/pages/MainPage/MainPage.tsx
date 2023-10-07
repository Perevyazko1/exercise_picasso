import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {ListTable} from "../../widgets/ListTable/ListTable";

interface MainPageProps {
    className?: string
    children?: ReactNode
}


export const MainPage = memo((props: MainPageProps) => {


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
            <ListTable/>
        </div>
    );
});