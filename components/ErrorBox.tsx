import { useState } from 'react';

import { useSpring, animated } from '@react-spring/web';
import { Icon } from '@iconify/react';

type Props = {
	message: string;
	onClose: () => void;
};

const ErrorBox: React.FC<Props> = ({ message, onClose }) => {
	const [show, setShow] = useState(true);

	const handleClose = () => {
		setShow(false);
		onClose();
	};

	const errorBoxAnimation = useSpring({
		from: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
		to: {
			opacity: show ? 1 : 0,
			transform: show ? 'translate3d(0, 0%, 0)' : 'translate3d(0, 100%, 0)',
		},
	});

	return show ? (
		<animated.div
			style={errorBoxAnimation}
			className='pointer-events-none fixed right-0 bottom-0 z-50 flex items-end justify-center px-4 py-6 sm:items-start sm:justify-end sm:p-6'>
			<div className='pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-red-600 shadow-lg ring-1 ring-black ring-opacity-5'>
				<div className='p-4'>
					<div className='flex items-center justify-between gap-6'>
						<div className='flex items-center'>
							<Icon
								icon='material-symbols:error-outline'
								className='h-6 w-6 text-white'
							/>
							<span className='ml-1 text-center text-fsm font-medium'>
								Error: {message}
							</span>
						</div>
						<div className='flex-shrink-0'>
							<button
								type='button'
								className='text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
								onClick={handleClose}>
								<span className='sr-only'>Close</span>
								<Icon
									icon='material-symbols:cancel-outline-rounded'
									className='h-5 w-5 text-white'
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</animated.div>
	) : null;
};

export default ErrorBox;
