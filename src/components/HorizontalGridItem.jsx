import React from 'react';
import { FaRegThumbsUp } from 'react-icons/fa6';

const HorizontalGridItem = ({ title, price, imageUrl, rating }) => {
    return (
        <div className="h-fit whitespace-nowrap pr-2">
            <img
                alt={ title }
                src={ imageUrl }
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="h-full min-w-[144px] max-w-[144px] max-h-[132px] min-h-[132px] object-cover rounded-[8px]"
            />
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