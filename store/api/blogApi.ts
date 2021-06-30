import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://simple-blog-api.crew.red/',
	withCredentials: true
})


export const postsAPI = {
	getPosts() {
		const promise = instance.get('posts');
		return promise
	},
	createPost(data: DataCreatePost) {
		const promise = instance.post('posts', data);
		return promise
	},
	deletePost(postId: number) {
		const promise = instance.delete(`posts/${postId}`);
		return promise
	},
	getOnePost(postId: string) {
		const promise = instance.get(`posts/${postId}?_embed=comments`);
		return promise
	}
}

export const commentAPI = {
	createComment(data: CreateCommentTCType) {
		const promise = instance.post(`comments`, data);
		return promise
	}
}

export type DataCreatePost = {
	title: string
	body: string
}
export type CreateCommentTCType = {
	postId: number
	body: string
}

