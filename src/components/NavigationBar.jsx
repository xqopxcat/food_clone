import React, { useState } from 'react';

const NavigationItem = ({ title, icon, active, onClick }) => {
    return (
        <li onClick={ () => {
            if (active) return onClick()
            return onClick(title)
        } } className="flex items-center justify-center flex-col min-w-[72px]">
            <div className="mb-[4px]">
                <img
                    className={`w-16 h-16 smooth-transition rounded-full ${ active ? 'rotate-[20deg] bg-[#d3efda]' : ''}`}
                    alt=""
                    role="presentation"
                    src={ icon }
                />
            </div>
            <span
                className="text-[12px]"
                data-testid="rich-text"
            >
                { title }
            </span>
        </li>
    )
}

const NavigationBar = ({ items, children }) => {
    const [activeType, setActiveType] = useState();
    return (
        <nav className="p-[4px_0px_2px_8px] no-scrollbar overflow-y-auto">
            <ul className="flex flex-row gap-1">
                {
                    children ?? items.map(({ title, icon}) => {
                        return <NavigationItem title={ title } icon={ icon } active={ title === activeType } onClick={ setActiveType } />
                    })
                }
            </ul>
        </nav>
    );
};

export default NavigationBar;