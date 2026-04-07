import React from 'react';
import { SignIn } from '@clerk/clerk-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
      <div className="relative bg-white rounded-lg shadow-2xl p-6" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-4 text-text-muted hover:text-text-dark text-xl font-sans transition-colors">
          &times;
        </button>
        <SignIn forceRedirectUrl='/details'/>
      </div>
    </div>
  );
};

export default Modal;
