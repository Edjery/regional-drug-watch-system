import * as Yup from 'yup';
import { Identifiable } from '../service/genericService';

const suspectProfileSchema = Yup.object().shape({
    id: Yup.number().label('ID'),
    lastName: Yup.string().max(255, 'Last Name is too long').required('Last Name is required'),
    firstName: Yup.string().max(255, 'First Name is too long').required('First Name is required'),
    middleName: Yup.string().max(255, 'Middle Name is too long'),
    dateOfBirth: Yup.date()
        .required('Date of Birth is required')
        .typeError('Date of Birth must be a valid date')
        .max(new Date(), 'Date of Birth cannot be in the future')
        .test(
            'is-valid-date',
            'Date of Birth must be in the format YYYY-MM-DD',
            (value) => {
                // Check that it's a valid date object
                return value instanceof Date && !isNaN(value.getTime());
            }
        ),
    addressStreet: Yup.string().max(512, 'Street address is too long'),
    addressBarangay: Yup.string().max(255, 'Barangay is too long').required('Barangay is required'),
    addressCityMunicipality: Yup.string().max(255, 'City/Municipality is too long').required('City/Municipality is required'),
    addressProvince: Yup.string().max(255, 'Province is too long').required('Province is required'),
    addressRegion: Yup.string().max(255, 'Region is too long').required('Region is required'),
    mobileNo: Yup.string().max(15, 'Mobile No is too long').notRequired(),
    telephoneNo: Yup.string().max(15, 'Telephone No is too long').notRequired(),
    status: Yup.string(), //.oneOf(['Active', 'Inactive'], 'Status must be either Active or Inactive').required('Status is required'),
    sex: Yup.string().required('Sex is required'),
    createdAt: Yup.string(),
    updatedAt: Yup.string(),
});

export interface ISuspectProfile {
    id?: number;
    lastName: string;
    firstName: string;
    middleName?: string;
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
    createdAt?: string;
    updatedAt?: string;
}

export default suspectProfileSchema;

export type TSuspectProfile = Yup.InferType<typeof suspectProfileSchema> & Identifiable;
