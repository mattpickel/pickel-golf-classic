import React from 'react';

interface ContainerProps {
    children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="flex justify-center px-4">
            <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-gold-500/20">
                {children}
            </div>
        </div>
    );
}

export default Container;
