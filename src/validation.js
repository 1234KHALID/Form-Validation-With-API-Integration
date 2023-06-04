import * as Yup from "yup"
export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  DateOfBirth: '',
  StreetOne: '',
  StreetTwo: '',
  StreetPermanentOne: '',
  StreetPermanentTwo: '',
  file: [{ fileName: '', fileType: '', fileSelect: '' }],
}

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  DateOfBirth: Yup.date()
    .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'You must be at least 18 years old')
    .required('Date of birth is required'),
  StreetOne: Yup.string().required('Street 1 address is required'),
  StreetTwo: Yup.string().required('Street 2 address is required'),
  StreetPermanentOne: Yup.string(),
  StreetPermanentTwo: Yup.string(),
  file: Yup.array()
    .of(
      Yup.object().shape({
        fileName: Yup.string().required('File name is required'),
        fileType: Yup.string().required('File type is required'),
        fileSelect: Yup.mixed().required('File is required'),
      })
    )
    .min(2, 'At least two files are required'),
});