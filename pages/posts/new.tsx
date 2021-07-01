import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostTC } from "../../store/reducers/postsReducer";
import Link from 'next/link'
import style from './new.module.css'
import MainLayout from "../../layout/mainLayout";

export default function NewPost() {

	const dispatch = useDispatch();
	const [title, setTitle] = useState<string>('');
	const [body, setBody] = useState<string>('');

	const createNewPost = () => {
		dispatch(createPostTC({ title, body }))
		setTitle("")
		setBody("")
	}
	return (
		<MainLayout title={'Create new post'}>
			<div className={style.mainBlock}>
				<div>Enter title your post:
					<input
						type="text"
						placeholder='enter post title'
						onChange={(e) => setTitle(e.currentTarget.value)}
						value={title}
					/>
				</div>
				<div>Enter body your post:
					<input
						type="text"
						placeholder='enter post body'
						onChange={(e) => setBody(e.currentTarget.value)}
						value={body}
					/>
				</div>
				<Link href='/'><a className={style.link} onClick={createNewPost}>Create a new post</a></Link>
			</div>
		</MainLayout>
	)
}