import React, { useState } from 'react';

const TabSwitch = ({ items }) => {
    const [selected, setSelected] = useState(items[0].value);
    
    const handleClick = (value) => {
        setSelected(value);
    };
    
    return (
        <ul className="bg-[#e8e8e8] rounded-[500px] h-9 flex items-center whitespace-nowrap">
            {
                items.map(({ title, value }) => {
                    return (
                        <li 
                            value={ value }
                            onClick={ () => handleClick(value) }
                            className={`w-full flex justify-center p-3 text-[14px]
                                ${ selected === value ? 'items-center h-full bg-white rounded-[500px] border shadow-[0_0_5px_0_rgba(0,0,0,0.14)]' : '' }`}
                        >
                            { title }
                        </li>
                    )
                })
            }
            {/* <li className="w-full flex justify-center items-center h-full bg-white rounded-[500px] border shadow-[0_0_5px_0_rgba(0,0,0,0.14)] ">
                Left
            </li>
            <li className="w-full flex justify-center">
                Right
            </li> */}
        </ul>
    )
}

export default TabSwitch;