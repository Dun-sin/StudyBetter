import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';

import Tesseract from 'tesseract.js';
import { Icon } from '@iconify/react';
import { animated, useSpring } from '@react-spring/web';
import RadioButtons from '../RadioButtons';

type Props = {
	setData: Dispatch<SetStateAction<{ note: string; task: string }>>;
	setIsResultOpen: Dispatch<SetStateAction<boolean>>;
	setErrorMessage: Dispatch<
		SetStateAction<{ state: boolean; message: string }>
	>;
};

const SubmitImageNotes = ({
	setData,
	setIsResultOpen,
	setErrorMessage,
}: Props) => {
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
		if (imagePath === '') {
			setErrorMessage({ state: true, message: 'No Image Uploaded' });
			return;
		}
		setIsLoading(true);
		setTextExtractingStatus({
			...textExtractingStatus,
			status: 'Optimizing Image',
		});

		// Load the image
		const image = new Image();
		image.src = imagePath;

		image.onload = () => {
			// Create a canvas element
			// Create a canvas element
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			// Resize the image to reduce noise and increase speed
			const maxWidth = 1000;
			const maxHeight = 1000;
			let width = image.width;
			let height = image.height;
			if (width > height) {
				if (width > maxWidth) {
					height *= maxWidth / width;
					width = maxWidth;
				}
			} else {
				if (height > maxHeight) {
					width *= maxHeight / height;
					height = maxHeight;
				}
			}

			canvas.width = width;
			canvas.height = height;

			if (ctx === null) return;
			// Draw the image onto the canvas
			ctx.drawImage(image, 0, 0, width, height);

			// Adjust the brightness
			const imageData = ctx.getImageData(0, 0, width, height);
			const brightness = -50;
			for (let i = 0; i < width * height; i++) {
				const index = i * 4;
				const r = imageData.data[index];
				const g = imageData.data[index + 1];
				const b = imageData.data[index + 2];
				imageData.data[index] = r + brightness;
				imageData.data[index + 1] = g + brightness;
				imageData.data[index + 2] = b + brightness;
			}

			// Adjust the exposure
			const exposure = -78;
			const exposureFactor = Math.pow(2, exposure / 100);
			for (let i = 0; i < width * height; i++) {
				const index = i * 4;
				const r = imageData.data[index];
				const g = imageData.data[index + 1];
				const b = imageData.data[index + 2];
				imageData.data[index] = r * exposureFactor;
				imageData.data[index + 1] = g * exposureFactor;
				imageData.data[index + 2] = b * exposureFactor;
			}

			// Adjust the contrast
			const contrast = 74;
			const contrastFactor =
				(259 * (contrast + 255)) / (255 * (259 - contrast));
			for (let i = 0; i < width * height; i++) {
				const index = i * 4;
				const r = imageData.data[index];
				const g = imageData.data[index + 1];
				const b = imageData.data[index + 2];
				imageData.data[index] = contrastFactor * (r - 128) + 128;
				imageData.data[index + 1] = contrastFactor * (g - 128) + 128;
				imageData.data[index + 2] = contrastFactor * (b - 128) + 128;
			}

			// Export the modified image as a data URL
			ctx.putImageData(imageData, 0, 0);

			// Convert the canvas to a data URL and send it to Tesseract
			const optimizedImagePath = canvas.toDataURL('image/jpeg');
			Tesseract.recognize(optimizedImagePath, 'eng', {
				logger: ({ status, progress }) =>
					setTextExtractingStatus({ status, progress: progress * 100 }),
			})
				.then((result) => {
					const words = result.data.words.map((item) => item.text).join(' ');

					if (words.length > 1500) {
						setErrorMessage({
							state: true,
							message: 'Text is more than 1500 characters',
						});
						return;
					} else if (words.length === 0) throw Error();

					setData({ note: words, task: radioButtonValue });
					setIsLoading(false);
					setIsResultOpen(true);
				})
				.catch((err) => {
					console.error(err);
					setErrorMessage({
						state: true,
						message: 'Oops! Something went wrong',
					});
					setIsLoading(false);
				});
		};

		// Tesseract.recognize(imagePath, 'eng', {
		// 	logger: ({ status, progress }) =>
		// 		setTextExtractingStatus({ status, progress: progress * 100 }),
		// })
		// 	.then((result) => {
		// 		const words = result.data.words.map((item) => item.text).join(' ');

		// 		if (words.length > 1500) {
		// 			setErrorMessage({
		// 				state: true,
		// 				message: 'Text is more than 1500 characters',
		// 			});
		// 			return;
		// 		}

		// 		setData({ note: words, task: radioButtonValue });
		// 		setIsLoading(false);
		// 		setIsResultOpen(true);
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 		setIsLoading(false);
		// 	});
	};

	const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

	return (
		<>
			<animated.div className='w-full' style={springProps}>
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
						<p className='center flex-col p-4 text-sm text-mid'>
							{fileName === '' ? (
								<>
									<span className='font-semibold'>Click to upload</span>
									<p className='text-fxs'>
										{`Make sure it's not a low quality picture`}
									</p>
								</>
							) : (
								<>
									<span className='text-center font-semibold'>{fileName}</span>
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
			</animated.div>

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
