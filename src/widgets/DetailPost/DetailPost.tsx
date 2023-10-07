import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {postApi} from "../../shared/api/RtkService";
import {useParams} from "react-router-dom"


interface DetailPostProps {
    className?: string
    children?: ReactNode
}


export const DetailPost = memo((props: DetailPostProps) => {

    const { id } = useParams();



    const {
        className,
        children,
        ...otherProps
    } = props

    const {data, isLoading, error} = postApi.useGetDetailPostQuery(id?.substring(3)||"")

    const mods: Mods = {

    };

    return (
        <div
            className={classNames('', mods, [className])}
            {...otherProps}
        >
            {isLoading && <h1>Загрузка поста...</h1>}
            {error && <h1>Ошибка загрузки</h1>}
            {data &&
                <div>
                    <div>{data.slug}</div>
                    <div>{data.url}</div>
                    <div>{data.title}</div>
                    <div>{data.content}</div>
                    <img src={data.image}/>
                    <div>{data.thumbnail}</div>
                    <div>{data.status}</div>
                    <div>{data.category}</div>
                    <div>{data.publishedAt}</div>
                    <div>{data.updatedAt}</div>
                    <div>{data.userId}</div>
                </div>
            }



        </div>
    );
});