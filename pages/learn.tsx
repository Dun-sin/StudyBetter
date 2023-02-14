import { Icon } from '@iconify/react';
import { useState } from 'react';
import SubmitNotes from '@/components/SubmitNotes';
import DisplayResult from '@/components/DisplayResult';

const learn = () => {
	const [isResultOpen, setIsResultOpen] = useState(false);
	const [data, setData] = useState({
		note: '',
		task: '',
	});

	const toggleResultVisibility = () => {
		const condition = Object.values(data).every((item) => item.length === 0);
		if (condition) return;

		setIsResultOpen(!isResultOpen);
	};

	return (
		<>
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
					<div className='ml-4 mr-4 flex h-[5%] justify-between'>
						<header>DeepLearn</header>
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
						<DisplayResult data={data} />
					) : (
						<SubmitNotes setData={setData} setIsResultOpen={setIsResultOpen} />
					)}
				</main>
			</section>
		</>
	);
};

export default learn;
// TODO: add proper error message for when no input is given
