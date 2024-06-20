import React from 'react';
import { FiSearch } from "react-icons/fi";

const SearchInput = ({ placeholder }) => {
    return (
        <form className="mx-4">   
            <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
                    <FiSearch />
                </div>
                <input type="text" id="search" className="block w-full p-4 ps-12 rounded-[500px] bg-[#F3F3F3] placeholder:text-[#4B4B4B] placeholder:text-[16px] placeholder:font-medium focus-visible:outline-none" placeholder={placeholder} />
            </div>
        </form>
    )
}

export default SearchInput;