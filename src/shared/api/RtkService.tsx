import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Post} from "./Post";


export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"https://jsonplaceholder.typicode.com",
    }),
    endpoints: (build) => ({
        getData: build.query<Post[], {limit:number,start:number}>({
            query:({limit=5, start=0 })=>({
                url: `/posts` ,
                params:{
                    _limit:start + limit,
                    _start: start,
                }

        }),
        }),
        getDetailPost: build.query<Post, string>({
            query:(id)=>({
                url: `/posts/${id}`
            }),
        }),
})
})