import { FC, MouseEvent } from 'react';

type ButtonType = 'submit' | 'button' | 'reset';

interface ButtonProps {
  className: string;
  label: string;
  type: ButtonType;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<ButtonProps> = ({ className, label, type, onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {label}
    </button>
  );
};
