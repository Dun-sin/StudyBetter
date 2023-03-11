import { Dispatch, SetStateAction } from 'react';

type Props = {
	setRadioButtonValue: Dispatch<SetStateAction<string>>;
};

const RadioButtons = ({ setRadioButtonValue }: Props) => {
	const handleRadioButtonChange = (event: any) => {
		const { value } = event.target;
		setRadioButtonValue(value);
	};
	return (
		<ul className='grid w-full grid-cols-2 bg-white text-sm font-medium text-white dark:bg-mid sm:grid-cols-4'>
			<li className='border-sm:border-b-0 w-full border-dark sm:border-r'>
				<div className='flex items-center justify-center p-1'>
					<input
						id='explain'
						type='radio'
						name='task'
						className='hidden'
						value='explain'
						onClick={handleRadioButtonChange}
						defaultChecked
					/>
					<label
						htmlFor='explain'
						className='center w-full cursor-pointer rounded-sm p-1 text-f2xs font-medium text-gray-900 focus:bg-red-700 dark:text-gray-300'>
						Explain{' '}
					</label>
				</div>
			</li>
			<li className='border-sm:border-b-0 w-full border-dark sm:border-r'>
				<div className='flex items-center justify-center p-1'>
					<input
						id='simplify'
						type='radio'
						name='task'
						className='hidden'
						value='simplify'
						onClick={handleRadioButtonChange}
					/>
					<label
						htmlFor='simplify'
						className='center w-full cursor-pointer rounded-sm p-1 text-f2xs font-medium text-gray-900 focus:bg-red-700 dark:text-gray-300'>
						Simplify
					</label>
				</div>
			</li>
			<li className='border-sm:border-b-0 w-full border-dark sm:border-r'>
				<div className='flex items-center justify-center p-1'>
					<input
						id='keypoints'
						type='radio'
						name='task'
						className='hidden'
						value='keypoints'
						onClick={handleRadioButtonChange}
					/>
					<label
						htmlFor='keypoints'
						className='center w-full cursor-pointer rounded-sm p-1 text-f2xs font-medium text-gray-900 focus:bg-red-700 dark:text-gray-300'>
						Key Points
					</label>
				</div>
			</li>
			<li className='w-full border-dark'>
				<div className='flex items-center justify-center p-1'>
					<input
						id='question'
						type='radio'
						name='task'
						className='hidden'
						value='question'
						onClick={handleRadioButtonChange}
					/>
					<label
						htmlFor='question'
						className='center w-full cursor-pointer rounded-sm p-1 text-f2xs font-medium text-gray-900 focus:bg-red-700 dark:text-gray-300'>
						Generate Question
					</label>
				</div>
			</li>
		</ul>
	);
};

export default RadioButtons;
