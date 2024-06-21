import React, { useState } from 'react';
import { Backdrop, SelectButton, Button } from './';

const SelectPanel = ({ title, selectType, onClick, onReset, icon, extendClass, children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const handleClick = () => {
        setMobileMenuOpen(false);
        onClick();
    }
    const handleReset = () => {
        setMobileMenuOpen(false);
        onReset();
    }
    
    return (
        <>
            <SelectButton
                icon={ icon }
                extendClass={ extendClass }
                onClick={ () => setMobileMenuOpen(!mobileMenuOpen) }
                value={ selectType }
            />
            <>
                <Backdrop state={ mobileMenuOpen } onClick={() => setMobileMenuOpen(false)} />
                <div id="dropdown" className={`fixed left-0 w-full 
                    bg-white z-10 rounded-tl-2xl rounded-tr-2xl
                    transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] 
                    ${mobileMenuOpen ? 'bottom-0' : '-bottom-full'}`}
                >
                    <h2 className="h-16 flex justify-center items-center leading-6 text-[18px] border-b-2 border-[#f3f3f3]">{ title }</h2>
                    { children }
                    <div className="w-full p-4">
                        <Button title="套用" textSize="medium" onClick={ handleClick } extendClass="w-full"/>
                        <Button title="重設" textSize="medium" outline onClick={ handleReset } extendClass="w-full mt-2"/>
                    </div>
                </div>
            </>
        </>
    );
};

export default SelectPanel;