import * as Yup from 'yup';

const suspectProfileSchema = Yup.object().shape({
    id: Yup.number().label('ID'),
    lastName: Yup.string().max(255, 'Last Name is too long').required('Last Name is required'),
    firstName: Yup.string().max(255, 'First Name is too long').required('First Name is required'),
    middleName: Yup.string().max(255, 'Middle Name is too long').required('Middle Name is required'),
    dateOfBirth: Yup.string().required('Date of Birth is required').typeError('Date of Birth must be a valid date'),
    addressStreet: Yup.string().max(512, 'Street address is too long'),
    addressBarangay: Yup.string().max(255, 'Barangay is too long').required('Barangay is required'),
    addressCityMunicipality: Yup.string().max(255, 'City/Municipality is too long').required('City/Municipality is required'),
    addressProvince: Yup.string().max(255, 'Province is too long').required('Province is required'),
    addressRegion: Yup.string().max(255, 'Region is too long').required('Region is required'),
    mobileNo: Yup.string().max(15, 'Mobile No is too long').notRequired(),
    telephoneNo: Yup.string().max(15, 'Telephone No is too long').notRequired(),
    status: Yup.string(), //.oneOf(['Active', 'Inactive'], 'Status must be either Active or Inactive').required('Status is required'),
    sex: Yup.string().oneOf(['Male', 'Female', 'Other'], 'Sex must be either Male, Female, or Other').required('Sex is required'),
    createdAt: Yup.string(),
    updatedAt: Yup.string(),
});

export interface ISuspectProfileSchema {
    id?: number;
    lastName: string;
    firstName: string;
    middleName: string;
    dateOfBirth: string;
    addressStreet?: string;
    addressBarangay: string;
    addressCityMunicipality: string;
    addressProvince: string;
    addressRegion: string;
    mobileNo: string;
    telephoneNo?: string;
    status?: string;
    sex: string;
    createdAt: string;
    updatedAt: string;
}

export default suspectProfileSchema;

