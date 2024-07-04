import React from 'react';
import { FaRegThumbsUp, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const HorizontalGridItem = ({ url, title, price, imageUrl, rating, onAdd }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        onAdd();
        navigate(url);
    }
    
    return (
        <div onClick={ handleClick } className="h-fit whitespace-nowrap pr-2">
            <div className="relative">
                <img
                    alt={ title }
                    src={ imageUrl }
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="h-full min-w-[144px] max-w-[144px] max-h-[132px] min-h-[132px] object-cover rounded-[8px]"
                />
                <div className="bottom-2 right-2 absolute p-3 bg-white rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
                    <FaPlus className="relative w-3 h-3" />
                </div>
            </div>
            <div className="pt-1">
                <div className="text-[16px] leading-5">
                    <span>{ title }</span>
                </div>
                <div className="pt-[2px] flex items-center justify-start leading-5 text-[14px] text-[#757575] font-normal">
                    <span>{`$${price / 100}`}</span>
                    <span>&nbsp;•&nbsp;</span>
                    <FaRegThumbsUp />
                    <span>&nbsp;{ rating }</span>
                </div>
            </div>
        </div>
    )
}

export default HorizontalGridItem;