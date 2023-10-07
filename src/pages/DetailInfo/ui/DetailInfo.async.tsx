import {FC, lazy, Suspense} from "react";

export const DetailInfoAsync = lazy<FC>(()=> import("./DetailInfo"))

export const DetailsDetailInfo =() => (
    <Suspense>
        <DetailInfoAsync/>
    </Suspense>
)
