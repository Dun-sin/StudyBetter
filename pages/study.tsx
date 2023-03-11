import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';

import isOnline from 'is-online';
import { Icon } from '@iconify/react';
import { useTransition, animated } from '@react-spring/web';

import SubmitNotes from '@/components/SubmitNotes';
import DisplayResult from '@/components/DisplayResult';

const Study = () => {
	const [online, setOnline] = useState(true);

	const [isResultOpen, setIsResultOpen] = useState(false);
	const [data, setData] = useState({
		note: '',
		task: '',
	});

	useEffect(() => {
		const interval = setInterval(() => {
			isOnline().then((online) => {
				setOnline(online);
			});
		}, 3500);

		return () => clearInterval(interval);
	}, []);

	const toggleResultVisibility = () => {
		const condition = Object.values(data).every((item) => item.length === 0);
		if (condition) return;

		setIsResultOpen(!isResultOpen);
	};

	const resultTransitions = useTransition(isResultOpen, {
		from: { opacity: 0, transform: 'translateX(100%)' },
		enter: { opacity: 1, transform: 'translateX(0%)' },
		config: { tension: 1000, friction: 500, duration: 300 },
	});

	return (
		<>
			<Head>
				<title>Study Better | Make Exam Preparation Easier</title>
			</Head>
			<section className='flex h-screen flex-col gap-3 overflow-hidden bg-dark pt-4 text-fxl font-semibold text-light'>
				{isResultOpen ? (
					<div
						onClick={toggleResultVisibility}
						className='ml-4 flex w-fit cursor-pointer items-center gap-2 rounded border border-light border-opacity-40 px-2 py-1 text-fxs'>
						<Icon
							icon='ion:arrow-back-circle'
							color='#2D4C65'
							width='20'
							height='20'
						/>
						Back
					</div>
				) : (
					<div className='mx-10 flex h-[5%] justify-between'>
						<Link href='/'>
							<h1 className='text-f2xl'>Study Better</h1>
						</Link>
						<div
							onClick={toggleResultVisibility}
							className='ml-4 flex w-fit cursor-pointer items-center gap-2 rounded border border-light border-opacity-40 px-2 py-1 text-fxs'>
							<Icon
								icon='ion:arrow-forward-circle'
								color='#2D4C65'
								width='20'
								height='20'
							/>
							Open
						</div>
					</div>
				)}
				<main className='mx-4 h-[95%]'>
					{isResultOpen ? (
						// Use the animated component returned by the useTransition hook
						resultTransitions((style, item) =>
							item ? (
								<animated.div style={style}>
									<DisplayResult data={data} />
								</animated.div>
							) : null,
						)
					) : (
						<SubmitNotes setData={setData} setIsResultOpen={setIsResultOpen} />
					)}
				</main>
			</section>

			<div
				className={`fixed inset-0 z-50 overflow-y-auto ${
					online ? 'hidden' : 'block'
				}`}
				aria-labelledby='offline-modal-title'
				role='dialog'
				aria-modal='true'>
				<div className='flex min-h-screen items-center justify-center px-4 pt-6 pb-20 text-center sm:block sm:p-0'>
					<div
						className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
						aria-hidden='true'></div>

					<span
						className='hidden sm:inline-block sm:h-screen sm:align-middle'
						aria-hidden='true'>
						&#8203;
					</span>

					<div
						className='inline-block transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:align-middle'
						role='dialog'
						aria-modal='true'
						aria-labelledby='modal-headline'>
						<div className='bg-white px-4 py-5 sm:p-6'>
							<div className='sm:flex sm:items-start'>
								<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
									<Icon
										icon='circum:wifi-off'
										className='h-6 w-6 text-red-600'
									/>
								</div>
								<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
									<h3
										className='text-lg font-medium leading-6 text-gray-900'
										id='offline-modal-title'>
										{`You're offline`}
									</h3>
									<div className='mt-2'>
										<p className='text-sm text-gray-500'>
											Please check your internet connection
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Study;
// TODO: add proper error message for when no input is given
