import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://simple-blog-api.crew.red/',
	withCredentials: true
})


export const postsAPI = {
	getPosts() {
		return instance.get<InitialStatePostsType>('posts');
	},
	createPost(data: DataCreatePost) {
		return instance.post<CreatePostDataAC>('posts', data);

	},
	deletePost(postId: number) {
		return instance.delete(`posts/${postId}`);
	},
	getOnePost(postId: string) {
		return instance.get<InitialStatePostType>(`posts/${postId}?_embed=comments`);
	}
}

export const commentAPI = {
	createComment(data: CreateCommentTCType) {
		return instance.post<CreateCommetType>(`comments`, data);
	}
}

export type InitialStatePostsType = {
	id: number;
	title: string;
	body: string;
}[]

export type CreatePostDataAC = {
	id: number
	title: string
	body: string
}

export type InitialStatePostType = {
	id: number;
	title: string;
	body: string;
	comments: {
		id: number;
		postId: number;
		body: string;
	}[];
}
export type CreateCommetType = {
	id: number
	postId: string
	body: string
}

export type DataCreatePost = {
	title: string
	body: string
}
export type CreateCommentTCType = {
	postId: number
	body: string
}

