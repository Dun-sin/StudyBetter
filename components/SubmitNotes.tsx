import Tesseract from 'tesseract.js';
import { Icon } from '@iconify/react';
import { ChangeEvent, useState } from 'react';

const SubmitNotes = () => {
	const [imagePath, setImagePath] = useState('');
	const [text, setText] = useState('');

	const handleOnImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		setImagePath(URL.createObjectURL(event.target.files[0]));
	};

	const handleClick = () => {
		Tesseract.recognize(imagePath, 'eng', {
			logger: (m) => console.log(m),
		})
			.then((result) => {
				const arrayOfWords = result.data.words.map((item) => item.text);
				setText(arrayOfWords.join(' '));
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<section className='center flex-col w-full h-full gap-3'>
			<div className='md:min-w-[40%] md:max-w-[600px] w-[85%]'>
				<label
					htmlFor='dropzone-file'
					className='flex flex-col items-center justify-center h-64 border-2 border-mid border-dashed cursor-pointer bg-light hover:bg-gray-50 hover:opacity-60 w-full'>
					<div className='flex flex-col items-center justify-center pt-5 pb-6'>
						<Icon
							icon='material-symbols:cloud-upload'
							color='#101A22'
							width='100'
							height='100'
						/>
						<p className='mb-2 text-sm text-mid'>
							<span className='font-semibold'>Click to upload</span> or drag and
							drop
						</p>
					</div>
					<input
						id='dropzone-file'
						type='file'
						className='hidden'
						onChange={handleOnImageUpload}
						accept='image/*'
					/>
				</label>

				<ul className='items-center w-full text-sm font-medium bg-white sm:flex dark:bg-mid text-white'>
					<li className='w-full border-sm:border-b-0 sm:border-r border-dark'>
						<div className='flex items-center p-1 justify-center'>
							<input id='explain' type='radio' name='task' className='hidden' />
							<label
								htmlFor='explain'
								className='w-full p-1 font-medium text-gray-900 dark:text-gray-300 text-f2xs focus:bg-red-700 rounded-sm center cursor-pointer'>
								Explain{' '}
							</label>
						</div>
					</li>
					<li className='w-full border-sm:border-b-0 sm:border-r border-dark'>
						<div className='flex items-center p-1 justify-center'>
							<input
								id='simplify'
								type='radio'
								name='task'
								className='hidden'
							/>
							<label
								htmlFor='simplify'
								className='w-full p-1 font-medium text-gray-900 dark:text-gray-300 text-f2xs focus:bg-red-700 rounded-sm center cursor-pointer'>
								Simplify
							</label>
						</div>
					</li>
					<li className='w-full border-sm:border-b-0 sm:border-r border-dark'>
						<div className='flex items-center p-1 justify-center'>
							<input
								id='keypoints'
								type='radio'
								name='task'
								className='hidden'
							/>
							<label
								htmlFor='keypoints'
								className='w-full p-1 font-medium text-gray-900 dark:text-gray-300 text-f2xs focus:bg-red-700 rounded-sm center cursor-pointer'>
								Key Points
							</label>
						</div>
					</li>
					<li className='w-full border-dark'>
						<div className='flex items-center p-1 justify-center'>
							<input
								id='question'
								type='radio'
								name='task'
								className='hidden'
							/>
							<label
								htmlFor='question'
								className='w-full p-1 font-medium text-gray-900 dark:text-gray-300 text-f2xs focus:bg-red-700 rounded-sm center cursor-pointer'>
								Generate Question
							</label>
						</div>
					</li>
				</ul>
			</div>

			<button
				onClick={handleClick}
				className='text-fmd bg-brand px-16 py-2 text-light rounded-sm'>
				Submit
			</button>
		</section>
	);
};

export default SubmitNotes;
