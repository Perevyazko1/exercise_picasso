import {memo, MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button, Table} from "react-bootstrap";
import {postApi} from "shared/api/RtkService";
import {useNavigate} from "react-router-dom";
import {useInfiniteScroll} from "shared/hooks/useInfinityScroll/useInfinityScroll";
import {useAppdispatch, useAppSelector} from "shared/hooks/Redux/redux";
import {postInfoSlice} from "shared/api/Slice/PostSlice";

interface ListTableProps {
    className?: string
    children?: ReactNode
}


export const ListTable = memo((props: ListTableProps) => {


    const navigate = useNavigate()
    const [currentPostStart, setCurrentPostStart] = useState(0);

    const dispatch = useAppdispatch()
    const {PostSlice} = postInfoSlice.actions
    const {PostUpdateSlice} = postInfoSlice.actions
    const {postState} = useAppSelector(state => state.PostSlice)
    const {data, isLoading, error} = postApi.useGetDataQuery({limit: 25, start: currentPostStart})
    useEffect(() => {
        if (data) {
            if (postState.length === 1) {
                dispatch(PostSlice(data))
            } else {
                dispatch(PostUpdateSlice(data))
            }
        }

    }, [data]);


    const onScrollEnd = () => {
        if (postState.length < 76) {
            setCurrentPostStart(postState.length)
        }
    };




    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

    useInfiniteScroll({
        triggerRef,
        callback: onScrollEnd
    })

    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
        <div
            className={classNames('', mods, [className])}
            {...otherProps}
        >
            {isLoading && <h1 style={{height: "1000px"}}>Загрузка постов...</h1>}
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
                {postState && postState.map((post, index) =>
                    <tr  key={index}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body.length > 20 ? `${post.title.slice(0, 20)}...` : post.title}</td>
                            <td><Button onClick={() => navigate(`/detail/id=${post.id}`)}
                                        variant="secondary">Просмотр</Button></td>
                    </tr>
                )}
                </tbody>
            </Table>
            <div style={{height: "20px"}} ref={triggerRef}></div>
        </div>
    );
});
