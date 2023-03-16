import { Dispatch, SetStateAction, useRef, useState, useEffect } from 'react';

import { animated, useSpring } from '@react-spring/web';

import RadioButtons from '../RadioButtons';

type Props = {
	setData: Dispatch<SetStateAction<{ note: string; task: string }>>;
	setIsResultOpen: Dispatch<SetStateAction<boolean>>;
	setErrorMessage: Dispatch<
		SetStateAction<{ state: boolean; message: string }>
	>;
};

const SubmitTextNotes = ({
	setData,
	setIsResultOpen,
	setErrorMessage,
}: Props) => {
	const [radioButtonValue, setRadioButtonValue] = useState('explain');
	const [lengthOfText, setLengthOfText] = useState(0);

	const inputRef = useRef<HTMLTextAreaElement>(null);
	const spanRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const input = inputRef.current;
		if (input === null) return;

		const handleChange = () => {
			const length = input?.value?.length || 0;
			setLengthOfText(length);
		};

		input.addEventListener('input', handleChange);

		return () => {
			input.removeEventListener('input', handleChange);
		};
	}, [inputRef]);

	const handleClick = () => {
		const text = inputRef.current?.value;
		if (text === null || text === undefined) return;
		if (text.length === 0) {
			setErrorMessage({ state: true, message: 'No text found' });
			return;
		}
		if (text.length > 1500) {
			setErrorMessage({
				state: true,
				message: 'Text is more than 1500 characters',
			});
			return;
		}

		setData({
			note: text,
			task: radioButtonValue,
		});
		setIsResultOpen(true);
	};

	const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

	return (
		<>
			<animated.div className='w-full' style={springProps}>
				<div className='relative'>
					<textarea
						id='large-input'
						placeholder='Enter the Notes'
						ref={inputRef}
						className='focus:ring-mid-500 block h-64 w-full resize-none border-2 border-mid bg-light  bg-clip-padding p-4 text-fxs font-normal text-gray-900 transition ease-in-out focus:border-dashed  focus:outline-none'></textarea>
					<span
						className='absolute bottom-2 right-4 text-fsm text-gray-800'
						ref={spanRef}>
						{lengthOfText}/1500
					</span>
				</div>
				<RadioButtons setRadioButtonValue={setRadioButtonValue} />
			</animated.div>

			<button
				onClick={handleClick}
				className='rounded-sm bg-brand px-16 py-2 text-fmd text-light'>
				Submit
			</button>
		</>
	);
};

export default SubmitTextNotes;
