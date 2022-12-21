import { FC } from 'react';
import { FieldErrors } from 'react-hook-form';

import { valueFromPath } from 'src/helpers/data';

interface ErrorInputProps {
  name: string;
  errors: FieldErrors<any>;
}

export const ErrorInput: FC<ErrorInputProps> = ({ name, errors }) => {
  let error = undefined;

  if (name.includes('.')) {
    error = valueFromPath(errors, name);
  } else {
    error = errors[name];
  }

  return error ? <p className="text-left text-red-700">{error?.message}</p> : <></>;
};

export default ErrorInput;
