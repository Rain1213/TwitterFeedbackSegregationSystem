import React from 'react';
import './Button.css';

const Button = ({text, onClick}) => {
    return (
        <button className="btn" onClick={onClick}><span className="btn-text">{text}</span></button>
    );
}

export default Button;