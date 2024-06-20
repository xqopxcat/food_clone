import React, { useState } from 'react';
import { Backdrop, SelectButton, Button } from './';

const Dropdown = ({ title, selectValue, selectType, onClick, extendClass, children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const handleClick = () => {
        setMobileMenuOpen(false);
        onClick();
    }
    
    return (
        <>
            <SelectButton
                extendClass={ extendClass }
                onClick={ () => setMobileMenuOpen(!mobileMenuOpen) }
                value={ selectType }
            />
            {
                mobileMenuOpen && (
                    <>
                        <Backdrop state={ mobileMenuOpen } onClick={() => setMobileMenuOpen(false)} />
                        <div id="dropdown" className="absolute w-full bg-white z-10 bottom-0">
                            <h2 className="h-16 flex justify-center items-center leading-6 text-[18px] border-b-2 border-[#f3f3f3]">{ title }</h2>
                            { children }
                            <div className="w-full px-4 pb-8">
                                <Button title={`確認${selectValue}`} onClick={ handleClick } extendClass="w-full"/>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Dropdown