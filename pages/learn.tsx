import DisplayResult from '@/components/DisplayResult';
import SubmitNotes from '@/components/SubmitNotes';
import { useState } from 'react';

const learn = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);

	return (
		<>
			<section className='bg-dark h-screen text-light text-fxl font-semibold p-5'>
				<header className='h-[5%]'>DeepLearn</header>
				<main className='h-[95%]'>
					{isSubmitted ? <DisplayResult /> : <SubmitNotes />}
				</main>
			</section>
		</>
	);
};

export default learn;
