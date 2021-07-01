import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NextThunkDispatch, wrapper } from '../store';
import { deletePostTC, postsTC } from '../store/reducers/postsReducer'
import { RootState } from '../store/reducers/rootReducer';
import Link from 'next/link';
import style from './index.module.css';
import { InitialStatePostsType } from '../store/api/blogApi';
import MainLayout from '../layout/mainLayout';



export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(postsTC());
})


export default function Index() {
  const posts = useSelector<RootState, InitialStatePostsType>(state => state.posts);
  const dispatch = useDispatch();
  const isInitialized = useSelector<RootState, boolean>(state => state.app.isInitialized)

  if (!isInitialized) {
    return <div>Loading</div>
  }

  return (
    <MainLayout title={'All posts'}>
      {posts.map(post => {
        return (
          <div key={post.id} className={style.postFlex} >
            <div className={`${style.postItem} ${style.postItemTitle}`}>
              <Link href={`/posts/${post.id}`}><a>{post.title} </a></Link>
              <div>
                <button onClick={() => { dispatch(deletePostTC(post.id)) }}>
                  <span>X</span> Delete post
                </button>
              </div>
            </div>
            <div className={style.postItem}>{post.body}</div>
          </div>
        )
      })}
    </MainLayout>
  )
}


