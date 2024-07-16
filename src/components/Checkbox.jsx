import React from 'react';
import { FaCheck } from 'react-icons/fa6';


const Checkbox = ({ name, title, value, ...props }) => {
    return (
        <div className="flex items-center">
            <input
                id={ name } 
                type="checkbox"
                value={ value }
                className="relative peer shrink-0
                appearance-none w-5 h-5 border-[3px] border-[#5E5E5E] rounded-none bg-white
                checked:bg-black checked:border-0"
                {...props}
            />
                {
                    title && (
                        <label for={ name } className="ms-6 text-[16px] leading-5 font-medium">{ title }</label>
                    )
                }
            <FaCheck
                className="absolute w-5 h-5 p-1 text-white hidden peer-checked:block pointer-events-none"
            />
        </div>
    );
};

export default Checkbox;