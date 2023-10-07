import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {postApi} from "../../shared/api/RtkService"

interface MainPageProps {
    className?: string
    children?: ReactNode
}


export const MainPage = memo((props: MainPageProps) => {

    const {data, isLoading, error} = postApi.useGetDataQuery(5)

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
            <>
                {data && data.map(post =>
                    <p key={post.id} >{post.content}</p>
                )}
            </>
            {children}
        </div>
    );
});