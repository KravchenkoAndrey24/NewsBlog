import React from "react";
import Head from 'next/head'
import Link from 'next/link';
import style from './mainLayout.module.css'


export const MainLayout = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title || 'Blog'}</title>
			</Head>
			<div className={style.header}>
				<Link href="/posts/new">
					<a>Создать новый пост</a>
				</Link>
				<Link href='/'>
					<a>Главная страница</a>
				</Link>

			</div>
			<div>
				{children}
			</div>
		</>
	);
};

