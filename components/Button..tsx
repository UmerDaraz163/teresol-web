import React from 'react';

interface ButtonProps {
  btnName: string;
}

const Button: React.FC<ButtonProps> = ({ btnName }) => {
  return (
    <button className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer inline-block">
      {btnName}
    </button>
  );
};

export default Button;