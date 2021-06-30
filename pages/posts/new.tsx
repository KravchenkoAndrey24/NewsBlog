import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { createPostTC } from "../../store/reducers/postsReducer";
import Link from 'next/link'
import MainLayout from '../layout/mainLayout'
import style from './new.module.css'

export default function NewPost() {
	const dispatch = useDispatch();
	const [title, setTitle] = useState<string>('');
	const [body, setBody] = useState<string>('');



	const onChangePostTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	}
	const onChangePostBody = (e: ChangeEvent<HTMLInputElement>) => {
		setBody(e.currentTarget.value);
	}

	const createNewPost = () => {
		dispatch(createPostTC({ title, body }))
		setTitle("")
		setBody("")
	}
	return (
		<MainLayout title={'Create new post'}>
			<div className={style.mainBlock}>
				<div>Enter title your post: <input type="text" placeholder='enter post title' onChange={onChangePostTitle} value={title} /></div>
				<div>Enter body your post: <input type="text" placeholder='enter post body' onChange={onChangePostBody} value={body} /></div>
				<Link href='/'><a className={style.link} href="" onClick={createNewPost} >Create a new post</a></Link>
			</div>
		</MainLayout>
	)
}