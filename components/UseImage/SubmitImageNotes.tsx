import Tesseract from 'tesseract.js';
import { Icon } from '@iconify/react';
import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';
import RadioButtons from '../RadioButtons';

type Props = {
	setData: Dispatch<SetStateAction<{ note: string; task: string }>>;
	setIsResultOpen: Dispatch<SetStateAction<boolean>>;
};

const SubmitImageNotes = ({ setData, setIsResultOpen }: Props) => {
	const [fileName, setFileName] = useState('');
	const [imagePath, setImagePath] = useState('');
	const [textExtractingStatus, setTextExtractingStatus] = useState({
		status: '',
		progress: 0,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [radioButtonValue, setRadioButtonValue] = useState('explain');

	const handleOnImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		setImagePath(URL.createObjectURL(event.target.files[0]));
		setFileName(event.target.files[0].name);
	};

	const handleClick = () => {
		setIsLoading(true);
		Tesseract.recognize(imagePath, 'eng', {
			logger: ({ status, progress }) =>
				setTextExtractingStatus({ status, progress: progress * 100 }),
		})
			.then((result) => {
				const arrayOfWords = result.data.words.map((item) => item.text);
				setData({ note: arrayOfWords.join(' '), task: radioButtonValue });
				setIsLoading(false);
				setIsResultOpen(true);
			})
			.catch((err) => {
				console.error(err);
				setIsLoading(false);
			});
	};

	return (
		<>
			<div className='w-full'>
				<label
					htmlFor='dropzone-file'
					className='flex h-64 w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-mid bg-light hover:bg-gray-50 hover:opacity-60'>
					<div className='flex flex-col items-center justify-center pt-5 pb-6'>
						<Icon
							icon='material-symbols:cloud-upload'
							color='#101A22'
							width='100'
							height='100'
						/>
						<p className='center flex-col text-sm text-mid'>
							{fileName === '' ? (
								<>
									<span className='font-semibold'>Click to upload</span> or drag
									and drop
								</>
							) : (
								<>
									<span className='font-semibold'>{fileName}</span>
									<br />
									<span className='font-light underline underline-offset-2'>
										Click to upload another Image
									</span>
								</>
							)}
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

				<RadioButtons setRadioButtonValue={setRadioButtonValue} />
			</div>

			{isLoading ? (
				<div className='h-4 w-[85%] rounded-full bg-mid md:min-w-[40%] md:max-w-[600px]'>
					<div
						className='h-3.5 rounded-full bg-brand'
						style={{ width: textExtractingStatus.progress + '%' }}></div>
					<p className='text-fxs'>
						{textExtractingStatus.status.toUpperCase()}
					</p>
				</div>
			) : (
				<button
					onClick={handleClick}
					className='rounded-sm bg-brand px-16 py-2 text-fmd text-light'>
					Submit
				</button>
			)}
		</>
	);
};

export default SubmitImageNotes;
