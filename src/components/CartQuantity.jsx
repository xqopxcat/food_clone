import React, { useEffect, useState } from 'react'
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";

const CartQuantity = ({ value, max, delIcon, onChange }) => {
    const [qty, setQty] = useState(value);
    
    const incQty = () => {
        if (qty >= max) return;
        setQty((prevQty) => prevQty + 1);
        onChange('inc');
    }
    
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            
            return prevQty - 1;
        });
        onChange('dec');
    }
    
    return (
        <div className="flex items-center w-fit rounded-full bg-[#f3f3f3]">
            <span className="flex justify-center items-center w-9 h-9 " onClick={ decQty }>
                {qty === 1 ? <FiTrash className="h-4 w-4" /> : <FiMinus className="h-4 w-4" />}
            </span>
            <span className="mx-3 text-[14px] leading-5 bg-[#f3f3f3]">
                { qty }
            </span>
            <span className="flex justify-center items-center w-9 h-9" onClick={ incQty }>
                <FiPlus className="h-4 w-4" />
            </span>
        </div>
    )
}

export default CartQuantity;