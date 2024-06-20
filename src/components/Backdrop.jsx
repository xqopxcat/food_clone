import React from 'react';

const Backdrop = ({ state, onClick }) => {
    return (
        <div 
            onClick={ onClick } 
            className={`absolute left-0 w-full bg-[#262626]/[0.8] top-0 h-full smooth-transition 
                ${state ? 'z-[9] opacity-100' : 'z-[-1] opacity-0'}`}>
        </div>
    );
};

export default Backdrop;