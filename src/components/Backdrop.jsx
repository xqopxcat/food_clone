import React, { useEffect } from 'react';

const Backdrop = ({ state, onClick }) => {
    useEffect(() => {
        if (state) {
            document.body.style.position = 'relative';
            document.body.style.overflowY = 'hidden';
        }
        return () => {
            document.body.style.overflowY = 'visible';
        }
    }, [state]);
    return (
        <div 
            onClick={ onClick } 
            className={`fixed left-0 w-full bg-[#262626]/[0.8] top-0 h-full smooth-transition 
                ${state ? 'z-[9] opacity-100' : 'z-[-1] opacity-0'}`}>
        </div>
    );
};

export default Backdrop;