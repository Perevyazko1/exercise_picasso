import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {postApi} from "../../shared/api/RtkService";

interface DetailPostProps {
    className?: string
    children?: ReactNode
}


export const DetailPost = memo((props: DetailPostProps) => {

    const {data, isLoading, error} = postApi.useGetDetailPostQuery(1)
    console.log(data)
    console.log(isLoading)
    console.log(error)

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