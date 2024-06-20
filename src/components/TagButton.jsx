import React, { useEffect, useState } from 'react'

const TagButton = ({ value, icon, active = false, onClick, extendClass = '' }) => {
    return (
        <button
            className={`flex items-center text-[14px] py-2 px-3 bg-[#F3F3F3] rounded-[500px] whitespace-nowrap
                transition-all duration-200 ease-[cubic-bezier(0,0,1,1)]
                ${ active ? 'bg-black text-white' : '' } ${ extendClass }`} 
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
        </button>
    );
};

export default TagButton;