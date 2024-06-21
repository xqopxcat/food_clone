import React, { useEffect } from 'react';
import { disableScroll, enableScroll } from '../helpers/disableScroll';

const Backdrop = ({ state, onClick }) => {
    useEffect(() => {
        if (state) {
            disableScroll();
        }
        return () => {
            enableScroll();
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