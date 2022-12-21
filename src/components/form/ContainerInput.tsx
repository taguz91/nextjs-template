import { FC, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import ErrorInput from './ErrorInput';

interface ContainerInputProps {
  children?: ReactNode;
  label?: string;
  showErrors: boolean;
  name: string;
}

export const ContainerInput: FC<ContainerInputProps> = ({ label, children, showErrors, name }) => {
  const methods = useFormContext();

  return (
    <div className="my-2">
      {label && <label className="block font-medium text-black text-left"> {label} </label>}

      {children}

      {showErrors && <ErrorInput errors={methods.formState.errors} name={name} />}
    </div>
  );
};

export default ContainerInput;
