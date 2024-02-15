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
    const [startSlice, setStartSlice] = useState(0)

    const dispatch = useAppdispatch()
    const {PostSlice} = postInfoSlice.actions
    const {PostUpdateSlice} = postInfoSlice.actions
    const {postState} = useAppSelector(state => state.PostSlice)
    const {data, isLoading, error} = postApi.useGetDataQuery({limit: 25, start: currentPostStart})
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const rootRef = useRef() as MutableRefObject<HTMLDivElement>

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

    const rowHeight = 50
    let visibleRows = Math.floor(window.innerHeight / rowHeight)

    const getTopHeight = () => {
        return rowHeight * startSlice
    }
    const getBottomHeight = () => {
        return rowHeight * (postState.length - (startSlice + visibleRows + 1))
    }

    useEffect(() => {
        function onScroll(e: any) {
            setStartSlice(Math.min(
                postState.length - visibleRows - 1,
                Math.floor(e.target.scrollTop / rowHeight)
            ));
        }

        rootRef.current.addEventListener('scroll', onScroll);

        return () => {
            rootRef.current.removeEventListener('scroll', onScroll);
        }
    }, [postState.length, visibleRows, rowHeight]);

    useInfiniteScroll({
        triggerRef,
        callback: onScrollEnd,
    })

    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
        <div
            ref={wrapperRef}
            className={classNames('', mods, [className])}
            {...otherProps}
        >
            {isLoading && <h1 style={{height: "1000px"}}>Загрузка постов...</h1>}
            {error && <h1>Ошибка загрузки</h1>}
            <div style={{height: rowHeight * visibleRows + 1, overflow: 'auto'}} ref={rootRef}>
                <div/>
                <Table>
                    <thead className="thead-dark">
                    <tr style={{height: getTopHeight()}}>
                        <th>Номер</th>
                        <th className="w-75">Заголовок</th>
                        <th className="w-50">Описание</th>
                        <th>Просмотр</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postState && postState.slice(startSlice, startSlice + visibleRows + 1).map((post, index) =>
                        <tr style={{height: rowHeight}} key={startSlice + index}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body.length > 20 ? `${post.title.slice(0, 20)}...` : post.title}</td>
                            <td><Button onClick={() => navigate(`/detail/id=${post.id}`)}
                                        variant="secondary">Просмотр</Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <div style={{height: getBottomHeight()}} ref={triggerRef}></div>
            </div>
        </div>
    );
});
