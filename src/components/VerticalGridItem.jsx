import React from 'react';
import { FaRegThumbsUp } from 'react-icons/fa6';
import { Link } from "react-router-dom";

const VerticalGridItem = ({
    title,
    price,
    rating,
    imageUrl,
    description,
    url
}) => {
    return (
        <Link to={ url }>
            <div className="flex justify-between pl-2 pr-3 pb-3">
                <div className="flex flex-col justify-center pt-1">
                    <div className="text-[16px] leading-5">
                        <span>{ title }</span>
                    </div>
                    <div className="text-[#757575] flex flex-col items-start justify-start leading-5 text-[14px] font-normal">
                        <div className="text-[#757575] pt-[2px] flex items-center justify-center leading-5 text-[14px] font-normal">
                            <span>{`$${price / 100}`}</span>
                            <span>&nbsp;•&nbsp;</span>
                            <FaRegThumbsUp />
                            <span>&nbsp;{ rating }</span>
                        </div>
                        <div className="line-clamp text-[#757575] whitespace-pre-wrap ">
                            { description }
                        </div>
                    </div>
                </div>
                {
                    imageUrl && (
                        <img
                            alt={ title }
                            src={ imageUrl }
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            className="h-full min-w-[120px] max-w-[120px] max-h-[112px] min-h-[112px] object-cover rounded-[8px]"
                        />
                    )
                }
            </div>
        </Link>
    );
};

export default VerticalGridItem;