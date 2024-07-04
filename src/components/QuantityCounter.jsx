import React, { useState } from 'react'
import { FiMinus, FiPlus } from "react-icons/fi";

const QuantityCounter = ({ value, max, onChange }) => {
    const [qty, setQty] = useState(value);
    
    const incQty = () => {
        if (qty >= max) return;
        setQty((prevQty) => {
            return prevQty + 1
        });
        onChange(1);
    }
    
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 0) return 0;
            return prevQty - 1;
        });
        onChange(-1);
    }
    
    return (
        <p className="flex items-center">
            {
                qty > 0 && (
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f3f3f3]" onClick={ decQty }>
                        <FiMinus className="h-4 w-4" />
                    </span>
                )
            }
            <span className="mx-3 text-[14px] leading-5">
                { qty }
            </span>
            <span className={`flex items-center justify-center w-9 h-9 rounded-full bg-[#f3f3f3]`} onClick={ incQty }>
                <FiPlus className={`h-4 w-4 ${qty >= max ? 'text-[#a6a6a6]' : 'text-black'}`}  />
            </span>
        </p>
    );
};

export default QuantityCounter;