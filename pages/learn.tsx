import DisplayResult from '@/components/DisplayResult';
import SubmitNotes from '@/components/SubmitNotes';
import { useState } from 'react';

const learn = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [data, setData] = useState({
		note: '',
		task: '',
	});

	return (
		<>
			<section className='bg-dark h-screen text-light text-fxl font-semibold p-5'>
				<header className='h-[5%]'>DeepLearn</header>
				<main className='h-[95%]'>
					{isSubmitted ? <DisplayResult /> : <SubmitNotes setData={setData} />}
				</main>
			</section>
		</>
	);
};

export default learn;
