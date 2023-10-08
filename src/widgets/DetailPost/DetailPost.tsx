import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {postApi} from "../../shared/api/RtkService";
import {useParams} from "react-router-dom"
import {Button, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import cls from "./DetailPost.module.scss"


interface DetailPostProps {
    className?: string
    children?: ReactNode
}


export const DetailPost = memo((props: DetailPostProps) => {

    const { id } = useParams();
    const navigate = useNavigate()



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
            className={classNames(cls.DetailPost, mods, [className])}
            {...otherProps}
        >
            {isLoading && <h1>Загрузка поста...</h1>}
            {error && <h1>Ошибка загрузки</h1>}
            {data &&
                <div>
                    <p className={cls.Headers}>title</p>
                    <div className={cls.Value}>{data.title}</div>
                    <p className={cls.Headers}>body</p>
                    <div className={cls.Value}>{data.body}</div>
                    <p className={cls.Headers}>userId</p>
                    <div className={cls.Value}>{data.userId}</div>
                </div>

            }

            <Button className={cls.Button}  variant="secondary" onClick={()=> navigate("/") }>Назад</Button>

        </div>
    );
});