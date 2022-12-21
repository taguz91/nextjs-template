import { FC } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { isAbsent } from 'src/helpers/data';

export type InputType = 'text' | 'number' | 'password' | 'date';

interface InputProps {
  className: string;
  type: InputType;
  placeholder?: string;
  field: ControllerRenderProps<any, string>;
}

export const Input: FC<InputProps> = ({ className, type, placeholder, field }) => {
  return (
    <input
      autoComplete={type === 'password' ? 'off' : 'on'}
      className={className}
      placeholder={placeholder}
      type={type}
      value={field.value || ''}
      onChange={(evt) => {
        const currentValue = evt.target?.value;

        if (!isAbsent(currentValue)) {
          field.onChange(currentValue);
        }
      }}
    />
  );
};

export default Input;
