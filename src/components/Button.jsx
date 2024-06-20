import React from 'react';

const Button = ({ title, onClick, extendClass = '', outline, textSize = 'large' }) => {
    return (
        <button 
            onClick={ onClick } 
            className={`btn 
                ${outline ? 'btn-outline' : ''}
                ${textSize === 'medium' ? 'btn-small' : 'btn-large'}
                ${extendClass}`}
        >
            { title }
        </button>
    );
};

export default Button;