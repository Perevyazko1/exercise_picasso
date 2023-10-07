import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Post} from "./Post";


export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"https://jsonplaceholder.org",
    }),
    endpoints: (build) => ({
        getData: build.query<Post[], number>({
            query:(limit:number=5)=>({
                url: `/posts` ,
                params:{
                    _limit: limit
                }

        }),
        }),
        getDetailPost: build.query<Post[], number>({
            query:(id)=>({
                url: `/posts/${id}`
            }),
        }),
})
})