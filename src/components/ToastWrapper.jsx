import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../slices/toastSlice';
import Toast from './Toast';


const ToastWrapper = () => {
  	const dispatch = useDispatch();
	const toast = useSelector((state) => state.toast);

	const handleCloseToast = () => {
		dispatch(hideToast());
	};

	return (
		<>
			{toast.visible && (
				<Toast
					success={toast.success}
					message={toast.message}
					onClose={handleCloseToast}
				/>
			)}
		</>
	);
}

export default ToastWrapper