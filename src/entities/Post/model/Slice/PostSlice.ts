import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from "../../types/Post";

export interface PostInfoState {
    postState: Post[]
    portionPage: number
}


const initialState: PostInfoState = {
    postState: [{
        id: 0,
        title: "",
        body: "",
        userId: 0

    }],
    portionPage: 0

}

export const postInfoSlice = createSlice({
    name: 'postInfo',
    initialState,
    reducers: {
        PostSlice(state, action: PayloadAction<Post[]>) {
            state.postState = action.payload
        },

        PostUpdateSlice(state, action: PayloadAction<Post[]>) {
            state.postState = [...state.postState, ...action.payload];
        },
        PortionUpdateSlice(state, action: PayloadAction<number>) {
            state.portionPage = action.payload;
        },
    }
})

export default postInfoSlice.reducer;