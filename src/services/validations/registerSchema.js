import * as yup from 'yup';

export const registerSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    // img: yup.string().url(),
    // confirmPassword: yup.string().required()
  })
  .required();

export const accountSettings = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    //password: yup.string().min(6).required(),
    // img: yup.string().url(),
    // confirmPassword: yup.string().required()
  })
  .required();
