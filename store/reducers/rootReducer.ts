import { combineReducers } from "redux";
import { postsReducer } from "./postsReducer";
import { HYDRATE } from 'next-redux-wrapper';
import { isInitializedReducer, IsInitializedReducerActionType } from "./appReducer";
import { ThunkAction } from "redux-thunk";
import { PostsReducerActionType } from './postsReducer'
import { onePostReducer, OnePostReducerActionType } from "./onePostReducer";


const rootReducer = combineReducers({
	posts: postsReducer,
	app: isInitializedReducer,
	onePost: onePostReducer
})

export const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		}
		if (state.count) nextState.count = state.count // preserve count value on client side navigation
		return nextState
	} else {
		return rootReducer(state, action)
	}
}

export type RootState = ReturnType<typeof rootReducer>
export type AppActionType = PostsReducerActionType | IsInitializedReducerActionType | OnePostReducerActionType;
export type AppThunk = ThunkAction<void, RootState, unknown, AppActionType>


