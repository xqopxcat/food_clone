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
                className="slider"
                style={{
                    background: `
                        -webkit-linear-gradient(${direction === 'right' ? 'to right' : 'to left'}, rgb(243, 243, 243) 0%, rgb(243, 243, 243) 0%, rgb(0, 0, 0) 0%, 
                        rgb(0, 0, 0) ${ direction === 'right' ? position : (100 - position) }%, rgb(243 243, 243) ${ direction === 'right' ? position : (100 - position) }%, rgb(243, 243, 243) 100%)`
                }}
            />
        </>
    )
}

export default Slider;