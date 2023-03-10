import { Dispatch, SetStateAction, useRef, useState } from 'react';
import RadioButtons from '../RadioButtons';

type Props = {
	setData: Dispatch<SetStateAction<{ note: string; task: string }>>;
	setIsResultOpen: Dispatch<SetStateAction<boolean>>;
};

const SubmitTextNotes = ({ setData, setIsResultOpen }: Props) => {
	const [radioButtonValue, setRadioButtonValue] = useState('explain');
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const handleClick = () => {
		if (inputRef.current === null) return;
		if (inputRef.current.value.length === 0) return;

		setData({
			note: inputRef.current.value,
			task: radioButtonValue,
		});
		setIsResultOpen(true);
	};

	return (
		<>
			<div className='w-full'>
				<textarea
					id='large-input'
					placeholder='Enter the Notes'
					ref={inputRef}
					className='focus:ring-mid-500 block h-64 w-full resize-none border-2 border-mid bg-light  bg-clip-padding p-4 text-fxs font-normal text-gray-900 transition ease-in-out focus:border-dashed  focus:outline-none'
				/>
				<RadioButtons setRadioButtonValue={setRadioButtonValue} />
			</div>

			<button
				onClick={handleClick}
				className='rounded-sm bg-brand px-16 py-2 text-fmd text-light'>
				Submit
			</button>
		</>
	);
};

export default SubmitTextNotes;
