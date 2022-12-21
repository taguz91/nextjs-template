import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import ContainerInput from './ContainerInput';
import Input from './Input';

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

export const PasswordInput: FC<PasswordInputProps> = ({ name, label, placeholder }) => {
  const methods = useFormContext();

  return (
    <Controller
      control={methods.control}
      name={name}
      render={({ field }) => (
        <ContainerInput label={label} name={name} showErrors={true}>
          <Input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            field={field}
            placeholder={placeholder}
            type="password"
          />
        </ContainerInput>
      )}
      shouldUnregister={true}
    />
  );
};
