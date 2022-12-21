export interface FormValidations {
  type: string;
  params: any[];
}

export interface YupConfig {
  id: string | string[];
  validationType: string;
  validations: FormValidations[];
}

export interface YupWhenValidation {
  is: any;
  then: FormValidations[];
  otherwise?: FormValidations[];
}

