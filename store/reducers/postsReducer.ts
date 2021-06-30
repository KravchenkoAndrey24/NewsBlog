import { CreatePostDataAC, DataCreatePost, InitialStatePostsType, postsAPI } from "../api/blogApi";
import { isInitialized } from "./appReducer";
import { AppThunk } from "./rootReducer";

enum ACTION_TYPE {
	SET_POSTS = 'SET_POSTS',
	CREATE_POST = 'CREATE_POST',
	DELETE_POST = 'DELETE_POST',
}

export const initialState = [{
	id: 0,
	title: '',
	body: ''
}]

export type PostsReducerActionType =
	ReturnType<typeof setPosts> |
	ReturnType<typeof createPost> |
	ReturnType<typeof deletePost>

export const postsReducer = (state: InitialStatePostsType = initialState, action: PostsReducerActionType): InitialStatePostsType => {
	switch (action.type) {
		case ACTION_TYPE.SET_POSTS:
			return action.posts.reverse();
		case ACTION_TYPE.CREATE_POST:
			return [{ ...action.data }, ...state];
		case ACTION_TYPE.DELETE_POST:
			return state.filter(post => post.id !== action.postId);
		default:
			return state
	}
}


//Action
export const setPosts = (posts: InitialStatePostsType) => ({ type: ACTION_TYPE.SET_POSTS, posts } as const)
export const createPost = (data: CreatePostDataAC) => ({ type: ACTION_TYPE.CREATE_POST, data } as const)
export const deletePost = (postId: number) => ({ type: ACTION_TYPE.DELETE_POST, postId } as const)

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
		await postsAPI.deletePost(postId);
		dispatch(deletePost(postId))
	} catch (error) {
		console.log(error);
	} finally {
		dispatch(isInitialized(true))
	}
}

