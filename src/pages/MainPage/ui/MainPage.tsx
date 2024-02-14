import {memo, ReactNode} from 'react';
import {ListTable} from "../../../widgets/ListTable/ListTable";

interface MainPageProps {
    className?: string
    children?: ReactNode
}

const MainPage = memo((props: MainPageProps) => {


    const {
        className,
        children,
        ...otherProps
    } = props


    return (
        <div
            {...otherProps}
        >
            <ListTable/>
        </div>
    );
});
export default MainPage