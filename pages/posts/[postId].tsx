
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextThunkDispatch, wrapper } from "../../store";
import { createCommentTC, getOnePostTC, InitialStatePostType } from "../../store/reducers/onePostReducer";
import { RootState } from "../../store/reducers/rootReducer";
import MainLayout from "../layout/mainLayout";
import style from './postId.module.css'




export const getServerSideProps = wrapper.getServerSideProps(async ({ params, store }) => {
	const dispatch = store.dispatch as NextThunkDispatch;
	await dispatch(getOnePostTC(`${params.postId}`))

})

export default function Post() {

	const post = useSelector<RootState, InitialStatePostType>(state => state.onePost)
	const dispatch = useDispatch();
	const [commentBody, setCommentBody] = useState<string>('')



	const onHandlerCommentText = (e: ChangeEvent<HTMLInputElement>) => {
		setCommentBody(e.currentTarget.value)
	}

	const createComment = () => {
		dispatch(createCommentTC({ postId: post.id, body: commentBody }))
		setCommentBody('');
	}


	const comments = post.comments.map(comment => {
		return (
			<div key={comment.id}>body comment: {comment.body}</div>

		)
	})
	return (
		<MainLayout title={'Info about post'}>
			<div className={style.mainBlock}>
				<h2>{post.title}</h2>
				<p>{post.body}</p>
				{comments}
				<div>
					<input placeholder='Enter your comment' value={commentBody} onChange={onHandlerCommentText} />
					<button onClick={createComment}>Create a comment on this post</button>
				</div>
			</div>
		</MainLayout>
	)
}