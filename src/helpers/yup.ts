import * as yup from "yup";

import {
  FormValidations,
  YupConfig,
  YupWhenValidation,
} from "src/interfaces/yup.types";

const mapValidations = (schema: any, validators: FormValidations[]) => {
  validators.forEach((validation) => {
    const { params, type } = validation;

    if (!schema[type]) {
      return schema;
    }
    schema = schema[type](...params);
  });

  return schema;
};

export const createYupDynamicSchema = (configs: YupConfig[]) => {
  return configs.reduce((schema, config) => {
    const { id: idParam, validationType, validations = [] } = config;
    const ids = typeof idParam === "string" ? [idParam] : idParam;

    return reduceValidations(ids, schema, validationType, validations);
  }, yup.object().shape({}));
};

const reduceValidations = (
  ids: string[],
  schema: any,
  validationType: string,
  validations: FormValidations[]
) => {
  return ids.reduce((schema, id: string) => {
    const isObject = id.indexOf(".") >= 0;

    if (!(yup as any)[validationType]) {
      return schema;
    }
    const validator = mapValidator(validationType, validations);

    if (!isObject) {
      return schema.concat(yup.object().shape({ [id]: validator }));
    }

    const reversePath = id.split(".").reverse();
    const currNestedObject = reversePath.slice(1).reduce(
      (yupObj, path, _, __) => {
        if (Number.isNaN(path)) {
          return { array: yup.array().of(yup.object().shape(yupObj)) };
        }
        if (yupObj.array) {
          return { [path]: yupObj.array };
        }

        return { [path]: yup.object().shape(yupObj) };
      },
      { [reversePath[0]]: validator }
    );

    const newSchema = yup.object().shape(currNestedObject);

    return schema.concat(newSchema);
  }, schema);
};

const mapValidator = (
  validationType: string,
  validations: FormValidations[]
) => {
  let validator = (yup as any)[validationType]();

  validations.forEach((validation) => {
    const { params, type } = validation;

    if (!validator[type]) {
      return;
    }

    if (type === "when") {
      const { is, then, otherwise } = params[1] as YupWhenValidation;
      const whenParams = {} as any;

      whenParams.is = (value: any) => {
        const currentValue = typeof value === "object" ? value?.value : value;

        return typeof is === "object"
          ? is.includes(currentValue)
          : currentValue === is;
      };
      whenParams.then = mapValidations((yup as any)[validationType](), then);

      if (otherwise) {
        whenParams.otherwise = mapValidations(
          (yup as any)[validationType](),
          otherwise
        );
      }

      validator = validator["when"](params[0], whenParams);
    } else {
      validator = validator[type](...params);
    }
  });

  return validator;
};
