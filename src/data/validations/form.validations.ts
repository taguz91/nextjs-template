export const loginValidations = [
  {
    id: 'email',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: [],
      },
      {
        type: 'email',
        params: [],
      },
    ],
  },
  {
    id: 'password',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: [],
      },
    ],
  },
];
