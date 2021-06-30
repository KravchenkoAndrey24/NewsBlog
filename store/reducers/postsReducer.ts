import { DataCreatePost, postsAPI } from "../api/blogApi";
import { isInitialized } from "./appReducer";
import { AppThunk } from "./rootReducer";

enum ACTION_TYPE {
	SET_POSTS = 'SET_POSTS',
	CREATE_POST = 'CREATE_POST'
}

export const initialState = [{
	id: 0,
	title: '',
	body: ''
}]

export type PostsReducerActionType =
	ReturnType<typeof setPosts> |
	ReturnType<typeof createPost>

export type InitialStatePostsType = typeof initialState;

export const postsReducer = (state: InitialStatePostsType = initialState, action: PostsReducerActionType): InitialStatePostsType => {
	switch (action.type) {
		case ACTION_TYPE.SET_POSTS:
			return action.posts
		case ACTION_TYPE.CREATE_POST:
			return [...state, { ...action.data }]
		default:
			return state
	}
}

//Action
export const setPosts = (posts: InitialStatePostsType) => ({ type: ACTION_TYPE.SET_POSTS, posts } as const)
export const createPost = (data: any) => ({ type: ACTION_TYPE.CREATE_POST, data } as const)

//Thunks
export const postsTC = (): AppThunk => async (dispatch) => {
	dispatch(isInitialized(false))
	try {
		const res = await postsAPI.getPosts()
		dispatch(setPosts(res.data))
	} catch (error) {
		console.log(error);
	} finally {
		dispatch(isInitialized(true))
	}


}


export const createPostTC = (data: DataCreatePost): AppThunk => async dispatch => {
	dispatch(isInitialized(false))
	try {
		const res = await postsAPI.createPost(data)
		dispatch(createPost(res.data))
	} catch (error) {
		console.log(error);
	} finally {
		dispatch(isInitialized(true))
	}


}

export const deletePostTC = (postId: number): AppThunk => async dispatch => {
	dispatch(isInitialized(false))
	try {
		const res = await postsAPI.deletePost(postId);
		dispatch(postsTC())
	} catch (error) {
		console.log(error);
	} finally {
		dispatch(isInitialized(true))
	}
}

