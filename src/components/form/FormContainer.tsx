import { FC, useEffect } from 'react';
import {
  useForm,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
  FieldValues,
  FieldErrorsImpl,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { createYupDynamicSchema } from 'src/helpers/yup';
import { YupConfig } from 'src/interfaces/yup.types';
import { PreloadService, usePreload } from 'src/hooks/usePreload';

interface FormContainerProps {
  children?: JSX.Element | JSX.Element[];
  validations: YupConfig[];
  onSubmit: (data: any, methods: UseFormReturn<FieldValues, any>) => void;
  onErrors?: (errors: FieldErrorsImpl<any>) => void;
  preload?: PreloadService;
  defaultValues?: Record<string, any>;
}

export const FormContainer: FC<FormContainerProps> = ({
  onSubmit,
  onErrors,
  validations = [],
  children,
  defaultValues = {},
  preload = {
    service: '',
  },
}) => {
  const methods = useForm({
    resolver: yupResolver(createYupDynamicSchema(validations)),
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
  });

  const onSubmitBase: SubmitHandler<any> = (data) => {
    onSubmit(data, methods);
  };

  const onSubmitError: SubmitErrorHandler<any> = (errors) => {
    onErrors && onErrors(errors);
  };

  const { handleSubmit } = methods;

  const load = usePreload(preload);

  useEffect(() => {
    if (!load.isCompleted) {
      load.load(methods);
    }
  }, [load, methods, preload]);

  return (
    <FormProvider {...methods}>
      <form
        className={`w-full ${load.isCompleted ? '' : 'disabled'}`}
        onSubmit={handleSubmit(onSubmitBase, onSubmitError)}
      >
        {children}
      </form>
    </FormProvider>
  );
};
