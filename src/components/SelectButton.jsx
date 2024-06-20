import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

const SelectButton = ({ extendClass = '', icon, onClick, value }) => {
    return (
        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" 
            className={`flex items-center text-[14px] py-2 px-3 bg-[#F3F3F3] rounded-[500px] whitespace-nowrap ${ extendClass }`} 
            type="button"
            onClick={ onClick }
        >
            {
                icon && (
                    <div className="mr-2">
                        { icon }
                    </div>
                )
            }
            { value }
            <FiChevronDown className="ms-2" />
        </button>
    )
}

export default SelectButton;