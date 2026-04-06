import React from 'react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
    return (
        <button onClick={onClick} className={`px-6 py-3 text-white font-medium text-lg rounded shadow-lg transition-colors ${className}`}>
            {text}
        </button>
    );
};

export default Button;