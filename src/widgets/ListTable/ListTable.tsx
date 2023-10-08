import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button, Table} from "react-bootstrap";
import {postApi} from "../../shared/api/RtkService";
import {useNavigate} from "react-router-dom";

interface ListTableProps {
    className?: string
    children?: ReactNode
}


export const ListTable = memo((props: ListTableProps) => {


    const navigate = useNavigate()
    const [currentPostStart, setCurrentPostStart] = useState(0);
    const [isMyFetchingDown, setIsFetchingDown] = useState(false);
    const [isMyFetchingUp, setIsMyFetchingUp] = useState(false);

    const {data, isLoading, error} = postApi.useGetDataQuery({limit:25,start:currentPostStart})


    useEffect(()=>{
    if(isMyFetchingUp)
    {
        setCurrentPostStart(prev=>{
            return prev>0?prev-1:prev
        })
        setIsMyFetchingUp(false)
    }
    },[isMyFetchingUp])

    useEffect(() => {
      if (isMyFetchingDown) {
        fetchMorePosts();
        setIsFetchingDown(false);
      }
    }, [isMyFetchingDown]);


    useEffect(()=>{
      document.addEventListener('scroll',scrollHandler)
      return ()=>{
        document.removeEventListener('scroll',scrollHandler)
      }
    },[])


    const scrollHandler = (e: any): void => {
      if (e.target.documentElement.scrollTop < 200) {
        setIsMyFetchingUp(true);
      }
      if (
        e.target.documentElement.scrollHeight -
          e.target.documentElement.scrollTop -
          window.innerHeight <
        50
      ) {
        setIsFetchingDown(true);
      }
    };

    const fetchMorePosts = (): void => {
      setCurrentPostStart((prev) => {
        return prev + 1;
      });
    };


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
                        <td>{post.body.length > 20 ? `${post.title.slice(0, 20)}...` : post.title}</td>
                        <td><Button onClick={()=> navigate(`/detail/id=${post.id}`)} variant="secondary">Просмотр</Button></td>
                    </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
});
