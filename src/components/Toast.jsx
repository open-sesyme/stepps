import React, { useEffect } from 'react'

const Toast = ({ success = false, onClose, duration = 5000, message }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration])

    return (
        <div className={`toast ${success ? 'bg-green' : 'bg-white'} `}>
            {success && <span className='icon'><i className='bi bi-check2-circle'></i></span>}
            <p>{message}</p>
            <button type='button' onClick={onClose}><i class="bi bi-x-circle-fill"></i></button>
        </div>
    )
}

export default Toast;