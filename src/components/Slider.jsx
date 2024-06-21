import React from 'react';

const Slider = ({ items, value, onChange, direction = 'right' }) => {
    const position = (value / (items.length - 1)) * 100;
    
    const handleChange = (e) => {
        e.preventDefault();
        onChange(e.target.value);
    }
    
    return (
        <>
            <div className="flex items-center justify-between text-[14px] leading-4 font-medium pb-2">
                {
                    items.map((item) => {
                        return (
                            <div className="text-[14px]">{ item.title }</div>
                        )
                    })
                }
            </div>
            <input
                type="range"
                min="0"
                max={ items.length - 1 }
                step="1"
                value={ value }
                onChange={ handleChange }
                className={`slider gradient-to-${direction === 'right' ? 'r' : 'l'}-${Math.floor(position)}`}
            />
        </>
    )
}

export default Slider;