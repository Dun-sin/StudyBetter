import { useState, Dispatch, SetStateAction } from 'react';

import SubmitTextNotes from './Text';
import SubmitImageNotes from './Image';
import ErrorBox from './ErrorBox';

type Props = {
	setData: Dispatch<SetStateAction<{ note: string; task: string }>>;
	setIsResultOpen: Dispatch<SetStateAction<boolean>>;
};

const SubmitNotes = ({ setData, setIsResultOpen }: Props) => {
	const [type, setType] = useState('text');
	const [errorMessage, setErrorMessage] = useState({
		state: false,
		message: '',
	});

	const onClose = () => {
		setErrorMessage({ state: false, message: '' });
	};

	const handleTypeChange = (event: any) => {
		const { value } = event.target;
		errorMessage.state && onClose();
		setType(value);
	};

	return (
		<>
			<section className='center h-full w-full select-none flex-col'>
				<ul className='w-[85%] items-center bg-white text-sm font-medium text-white dark:bg-mid sm:flex md:min-w-[40%] md:max-w-[600px]'>
					<li className='border-sm:border-b-0 w-full border-dark sm:border-r'>
						<div className='flex items-center justify-center p-1'>
							<input
								id='text'
								type='radio'
								name='type'
								className='hidden'
								value='text'
								onClick={handleTypeChange}
								defaultChecked
							/>
							<label
								htmlFor='text'
								className='center w-full cursor-pointer rounded-sm p-1 text-f2xs font-medium'>
								Text
							</label>
						</div>
					</li>
					<li className='border-sm:border-b-0 w-full border-dark sm:border-r'>
						<div className='flex items-center justify-center p-1'>
							<input
								id='image'
								type='radio'
								name='type'
								className='hidden'
								value='image'
								onClick={handleTypeChange}
							/>
							<label
								htmlFor='image'
								className='center w-full cursor-pointer rounded-sm p-1 text-f2xs font-medium text-gray-900 focus:bg-red-700 dark:text-gray-300'>
								Image{' '}
							</label>
						</div>
					</li>
				</ul>
				<div className='center w-[85%] flex-col gap-3 md:min-w-[40%] md:max-w-[600px]'>
					{type === 'image' && (
						<SubmitImageNotes
							setData={setData}
							setIsResultOpen={setIsResultOpen}
							setErrorMessage={setErrorMessage}
						/>
					)}
					{type === 'text' && (
						<SubmitTextNotes
							setData={setData}
							setIsResultOpen={setIsResultOpen}
							setErrorMessage={setErrorMessage}
						/>
					)}
				</div>
			</section>
			{errorMessage.state && (
				<ErrorBox message={errorMessage.message} onClose={onClose} />
			)}
		</>
	);
};

export default SubmitNotes;
