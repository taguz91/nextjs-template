import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface HiddenInputProps {
  name: string;
  value: string;
}

export const HiddenInput: FC<HiddenInputProps> = ({ name, value }) => {
  const methods = useFormContext();

  return (
    <Controller
      control={methods.control}
      defaultValue={value}
      name={name}
      render={({ field }) => <input type="hidden" value={field.value} />}
    />
  );
};
