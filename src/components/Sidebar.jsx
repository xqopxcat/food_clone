import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiShoppingCart } from 'react-icons/fi';
import {
    logo
} from '../assets';
import { Backdrop } from './';


const Sidebar = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const onItemClick = () => {
        setMobileMenuOpen(false)
    }
    
    return (
        <>
            <header>
                <div className="w-full">
                    <div className="flex justify-start items-center h-12 px-4">
                        <div className="mr-[10px] ml-[-6px]">
                            <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex items-center justify-center h-9 w-9">
                                <FiMenu className="h-5 w-5" />
                            </button>
                        </div>
                        <img height="16px" className="h-4" src={ logo } alt="logo" onClick={() => navigate('/')}/>
                        <div className="flex-1"></div>
                        <div className="ml-2">
                            <button onClick={() => navigate('/cart')} className="relative flex items-center justify-center h-9 w-9">
                                <FiShoppingCart className="h-5 w-5" />
                                {
                                    JSON.parse(localStorage.getItem('order')) && JSON.parse(localStorage.getItem('order')).length > 0 && (
                                        <div className="absolute top-[-2px] right-[-2px] flex items-center justify-center rounded-3xl w-5 h-5 text-white bg-[#0E838B] text-[12px] leading-4 font-medium">
                                            { JSON.parse(localStorage.getItem('order')).length }
                                        </div>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <Backdrop state={ mobileMenuOpen } onClick={() => setMobileMenuOpen(false)} />
            <div className={`fixed w-[300px] z-10 top-0 h-screen
                smooth-transition ${mobileMenuOpen ? 'left-0 opacity-100' : '-left-full opacity-0'}`}>
                <aside className="flex flex-col gap-2 h-full shadow-[0_0_25px_rgba(0,0,0,0.1)] bg-white p-6 md:hidden">
                    <Link onClick={ onItemClick } to="/">Home</Link>
                    <Link onClick={ onItemClick } to="/payment">Payment</Link>
                </aside>
            </div>
        </>
    )
}

export default Sidebar;