import React from 'react';

const ItemTag = ({ text, icon }) => {
    return (
        <div className="flex">
            <span className="flex gap-1 text-[14px] leading-4 px-2 py-1 bg-[#F3F3F3] text-[#5E5E5E] rounded">
                { icon && icon }
                { text }
            </span>
        </div>
    );
};

export default ItemTag;