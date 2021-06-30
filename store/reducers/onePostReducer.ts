import { commentAPI, CreateCommentTCType, postsAPI } from "../api/blogApi";
import { isInitialized } from "./appReducer";
import { AppThunk } from "./rootReducer";

enum ACTION_TYPE {
	SET_POST = 'SET_POST',
}

export const initialState = {
	"id": 0,
	"title": "",
	"body": "",
	"comments": [
		{
			"id": 0,
			"postId": 0,
			"body": ""
		}
	]
}

export type OnePostReducerActionType =
	ReturnType<typeof setPostAC>

export type InitialStatePostType = typeof initialState;

export const onePostReducer = (state: InitialStatePostType = initialState, action: OnePostReducerActionType): InitialStatePostType => {
	switch (action.type) {
		case ACTION_TYPE.SET_POST:
			return { ...action.postInfo, comments: action.postInfo.comments.map(item => item) }

		default:
			return state
	}
}

//Action 
export const setPostAC = (postInfo: InitialStatePostType) => ({ type: ACTION_TYPE.SET_POST, postInfo } as const)

//Thunks
export const getOnePostTC = (postId: string): AppThunk => async dispatch => {
	dispatch(isInitialized(false))
	try {
		const res = await postsAPI.getOnePost(postId)
		dispatch(setPostAC(res.data))
	} catch (error) {
		console.log(error);
	} finally {
		dispatch(isInitialized(true))
	}


}


export const createCommentTC = (data: CreateCommentTCType): AppThunk => async dispatch => {
	dispatch(isInitialized(false))
	try {
		const res = await commentAPI.createComment(data)
		dispatch(getOnePostTC(res.data.postId));
	} catch (error) {
		console.log(error);
	} finally {
		dispatch(isInitialized(true));
	}
}

