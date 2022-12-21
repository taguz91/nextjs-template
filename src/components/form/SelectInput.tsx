import { ChangeEvent, FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { Option } from 'src/interfaces/form.types';

import ContainerInput from './ContainerInput';

interface SelectInputProps {
  name: string;
  label: string;
  options: Option[];
  firstOption?: Option;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectInput: FC<SelectInputProps> = ({
  name,
  label,
  options,
  onChange,
  firstOption = undefined,
}) => {
  const methods = useFormContext();

  if (firstOption) {
    options.unshift(firstOption);
  }

  return (
    <Controller
      control={methods.control}
      name={name}
      render={({ field }) => (
        <ContainerInput label={label} name={name} showErrors={true}>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
            value={field.value}
            onChange={(evt) => {
              onChange && onChange(evt);
              const currentValue = evt.target?.value;

              field.onChange(currentValue);
            }}
          >
            {options.map((opt, index) => {
              if (opt.value === '') {
                return (
                  <option key={index} hidden className="text-zinc-200 " value={opt.value}>
                    {opt.label}
                  </option>
                );
              }

              return (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              );
            })}
          </select>
        </ContainerInput>
      )}
    />
  );
};
