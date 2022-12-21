import { FC } from 'react';

import { Button } from './Button';

interface SubmitButtonProps {
  label?: string;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ label = 'Guardar' }) => {
  return (
    <Button
      className="bg-primary-800 text-lg font-medium w-full focus:outline-none py-2 rounded-3xl text-white hover:bg-primary-700 disabled:bg-primary-300"
      label={label}
      type="submit"
    />
  );
};
