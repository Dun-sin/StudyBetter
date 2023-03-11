import Head from 'next/head';
import Link from 'next/link';

import { Icon } from '@iconify/react';

export default function Home() {
	return (
		<>
			<Head>
				<title>Study Better | Make Exam Preparation Easier</title>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link rel='manifest' href='/site.webmanifest' />
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
				<meta name='msapplication-TileColor' content='#da532c' />
				<meta name='theme-color' content='#ffffff' />
			</Head>
			<div className='flex min-h-screen flex-col items-center justify-center bg-dark py-5'>
				<div className='max-w-3xl px-4 text-center'>
					<h1 className='mb-2 text-f3xl font-bold text-white'>
						Study Better Simplifies Your Studies
					</h1>
					<p className='mb-4 text-fxl leading-none text-white'>
						Upload your study notes and easily review concepts and quickly
						prepare for exams. Explain difficult concepts, simplify your notes,
						and generate possible questions for exams.
					</p>
					<Link
						href='/study'
						className='inline-block rounded-full bg-brand py-3 px-8 font-bold text-white transition duration-300 hover:bg-mid'>
						Get Started
					</Link>
				</div>
				<div className='mt-8 grid max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-3'>
					<Card
						icon='icon-park-outline:concept-sharing'
						header='Explain Difficult Concepts'
						text='Breaks down complex topics into easy-to-understand terms'
					/>
					<Card
						icon='gg:notes'
						header='Simplify Your Notes'
						text='Helps you understand them better by simplifying them.'
					/>
					<Card
						icon='mdi:head-question-outline'
						header='Generate Possible Questions'
						text='Provides a list of possible exam questions'
					/>
				</div>
			</div>
		</>
	);
}

type Props = {
	header: string;
	text: string;
	icon: string;
};

function Card({ header, text, icon }: Props) {
	return (
		<div className='center transform flex-col rounded-lg bg-mid p-8 text-center shadow-lg transition duration-300 hover:scale-105'>
			<Icon icon={icon} color='white' width='40' height='40' />
			<h2 className='mb-2 text-fxl font-bold leading-none text-white'>
				{header}
			</h2>
			<p className='text-fmd leading-none text-white'>{text}</p>
		</div>
	);
}
