import React from 'react';











const NavigationItem = ({ title, icon }) => {
    return (
        <li className="flex items-center justify-center flex-col min-w-[72px]">
            <div className="mb-[4px]">
                <img
                    className="w-16 h-16"
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
    return (
        <nav className="p-[4px_0px_2px_8px] no-scrollbar overflow-y-auto">
            <ul className="flex flex-row gap-1">
                {
                    children ?? items.map(({ title, icon}) => {
                        return <NavigationItem title={ title } icon={ icon } />
                    })
                }
            </ul>
        </nav>
    );
};

export default NavigationBar;