import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import suspectProfileSchema, { ISuspectProfile } from "../schema/suspectProfileSchema";
import SuspectProfileService from "../service/SuspectProfileService";

const initialValues: ISuspectProfile = {
  lastName: "",
  firstName: "",
  middleName: "",
  dateOfBirth: "",
  addressStreet: "",
  addressBarangay: "",
  addressCityMunicipality: "",
  addressProvince: "",
  addressRegion: "",
  mobileNo: "",
  telephoneNo: "",
  status: "",
  sex: "Male",
};

const SuspectProfileForm = () => {
  const suspectProfileService = new SuspectProfileService();
  const { mutateAsync: createItems, isLoading: isCreating } = suspectProfileService.createItem();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={suspectProfileSchema}
      onSubmit={(values, { resetForm }) => {
        createItems(values).then(() => {
          resetForm();
        });
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {/* Last Name */}
          <Field
            name="lastName"
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                helperText={touched.lastName && errors.lastName ? errors.lastName : ""}
                error={Boolean(errors.lastName && touched.lastName)} // Proper error check
              />
            )}
          />

          {/* First Name */}
          <Field
            name="firstName"
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                helperText={touched.firstName && errors.firstName ? errors.firstName : ""}
                error={Boolean(errors.firstName && touched.firstName)} // Proper error check
              />
            )}
          />

          {/* Middle Name */}
          <Field
            name="middleName"
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Middle Name"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={touched.middleName && errors.middleName ? errors.middleName : ""}
                error={Boolean(errors.middleName && touched.middleName)} // Proper error check
              />
            )}
          />

          {/* Date of Birth */}
          <Field
            name="dateOfBirth"
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Date of Birth"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                helperText={touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : ""}
                error={Boolean(errors.dateOfBirth && touched.dateOfBirth)} // Proper error check
              />
            )}
          />

          {/* Street */}
          <Field
            name="addressStreet"
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Street"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={touched.addressStreet && errors.addressStreet ? errors.addressStreet : ""}
                error={Boolean(errors.addressStreet && touched.addressStreet)} // Proper error check
              />
            )}
          />

          {/* Barangay */}
          <Field
            name="addressBarangay"
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Barangay"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                helperText={touched.addressBarangay && errors.addressBarangay ? errors.addressBarangay : ""}
                error={Boolean(errors.addressBarangay && touched.addressBarangay)} // Proper error check
              />
            )}
          />

          {/* City/Municipality */}
          <Field
            name="addressCityMunicipality"
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="City/Municipality"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                helperText={
                  touched.addressCityMunicipality && errors.addressCityMunicipality
                    ? errors.addressCityMunicipality
                    : ""
                }
                error={Boolean(errors.addressCityMunicipality && touched.addressCityMunicipality)} // Proper error check
              />
            )}
          />

          {/* Province */}
          <Field
            name="addressProvince"
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Province"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                helperText={touched.addressProvince && errors.addressProvince ? errors.addressProvince : ""}
                error={Boolean(errors.addressProvince && touched.addressProvince)} // Proper error check
              />
            )}
          />

          {/* Region */}
          <Field
            name="addressRegion"
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Region"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                helperText={touched.addressRegion && errors.addressRegion ? errors.addressRegion : ""}
                error={Boolean(errors.addressRegion && touched.addressRegion)} // Proper error check
              />
            )}
          />

          {/* Mobile No */}
          <Field
            name="mobileNo"
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Mobile No"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={touched.mobileNo && errors.mobileNo ? errors.mobileNo : ""}
                error={Boolean(errors.mobileNo && touched.mobileNo)} // Proper error check
              />
            )}
          />

          {/* Telephone No */}
          <Field
            name="telephoneNo"
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Telephone No"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={touched.telephoneNo && errors.telephoneNo ? errors.telephoneNo : ""}
                error={Boolean(errors.telephoneNo && touched.telephoneNo)} // Proper error check
              />
            )}
          />

          {/* Status */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Field
              name="status"
              render={({ field }: { field: any }) => (
                <Select {...field} label="Status">
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>
              <ErrorMessage name="status" />
            </FormHelperText>
          </FormControl>

          {/* Sex */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Sex</InputLabel>
            <Field
              name="sex"
              render={({ field }: { field: any }) => (
                <Select {...field} label="Sex">
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>
              <ErrorMessage name="sex" />
            </FormHelperText>
          </FormControl>

          {/* Submit Button */}
          <Box sx={{ height: "1rem" }} />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isCreating}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SuspectProfileForm;
