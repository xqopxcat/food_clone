import React, { useState } from 'react';

const RadioCard = ({ id, name, value, checked, description, onChange }) => {
    
    const handleChange = (e) => {
        onChange(e.target.value);
    }
    
    return (
        <label htmlFor={ id }>
            <li className={`min-w-[340px] p-4 mr-[10px] rounded-[8px] border-[3px] ${ checked ? "border-black" : "border-[#F3F3F3]"} whitespace-nowrap`}>
                <div className="flex justify-between mb-2">
                    <span className="text-[16px] leading-5 whitespace-nowrap">{ name }</span>
                    <input 
                        id={ id }
                        type="radio"
                        onChange={ handleChange }
                        value={ value }
                        name="bordered-radio" 
                    />
                </div>
                <span className="text-[14px] text-[#5e5e5e]">{ description }</span>
            </li>
        </label>
    );
};

export default RadioCard;