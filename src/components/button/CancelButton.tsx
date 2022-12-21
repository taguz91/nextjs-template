import { FC, MouseEvent } from 'react';

import { Button } from './Button';

interface CancelarButtonProps {
  label?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const CancelButton: FC<CancelarButtonProps> = ({ label = 'Cancelar', onClick }) => {
  return (
    <Button
      className="bg-slate-500 text-lg font-medium w-full focus:outline-none py-2 rounded-3xl text-white hover:bg-slate-600"
      label={label}
      type="button"
      onClick={onClick}
    />
  );
};
