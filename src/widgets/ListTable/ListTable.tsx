import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button, Table} from "react-bootstrap";
import {postApi} from "../../shared/api/RtkService";
import {useNavigate} from "react-router-dom";

interface ListTableProps {
    className?: string
    children?: ReactNode
}


export const ListTable = memo((props: ListTableProps) => {

    const {data, isLoading, error} = postApi.useGetDataQuery(5)
    const navigate = useNavigate()

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
            {isLoading && <h1>Загрузка постов...</h1>}
            {error && <h1>Ошибка загрузки</h1>}
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Номер</th>
                    <th>Заголовок</th>
                    <th>Описание</th>
                    <th>Просмотр</th>
                </tr>
                </thead>
                <tbody>
                    {data && data.map(post =>
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.content.length > 20 ? `${post.title.slice(0, 20)}...` : post.title}</td>
                        <td><Button onClick={()=> navigate(`/detail/id=${post.id}`)} variant="secondary">Просмотр</Button></td>
                    </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
});