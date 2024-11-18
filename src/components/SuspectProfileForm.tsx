import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import suspectProfileSchema, { ISuspectProfile } from "../schema/suspectProfileSchema";
import PSGCService from "../service/PSGCService";
import SuspectProfileService from "../service/SuspectProfileService";
import { TblBarangay, TblCityMun, TblProvince, TblRegion } from "../values/interface/@psgcTypes";
import { popupError } from "./Popups";

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

  const [regions, setRegions] = useState<TblRegion[]>([]);
  const [barangays, setBarangays] = useState<TblBarangay[]>([]);
  const [cities, setCities] = useState<TblCityMun[]>([]);
  const [provinces, setProvinces] = useState<TblProvince[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCityMunicipality, setSelectedCityMunicipality] = useState<string | null>(null);

  const [provincesOption, setProvincesOption] = useState<TblProvince[]>([]);
  const [citiesOption, setCitiesOption] = useState<TblCityMun[]>([]);
  const [barangaysOption, setBarangaysOption] = useState<TblBarangay[]>([]);

  const [isLoading, setLoading] = useState(true);
  const [isAPIError, setAPIError] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    // Start loading state
    setLoading(true);

    // Fetch data concurrently with Promise.all
    Promise.all([
      PSGCService.getRegions(),
      PSGCService.getBarangays(),
      PSGCService.getCities(),
      PSGCService.getProvinces(),
    ])
      .then(([regionData, barangayData, cityData, provinceData]) => {
        // Update the state with fetched data
        setRegions(regionData);
        setBarangays(barangayData);
        setCities(cityData);
        setProvinces(provinceData);
      })
      .catch(() => {
        // Show error if data fetching fails
        popupError("Error: Something went wrong");
        setAPIError(true);
      })
      .finally(() => {
        // Set loading to false once the data has been fetched or if there's an error
        setLoading(false);
      });
  }, []); // Empty dependency array to run the effect once when component mounts

  // Update provinces when region is selected
  const handleRegionChange = (event: any) => {
    const regionCode: string = event.target.value;
    setSelectedRegion(regionCode);

    // Filter provinces based on selected region
    const filteredProvinces = provinces.filter((province) => province.region_c === regionCode);
    setProvincesOption(filteredProvinces);

    // Clear city and barangay selections when region changes
    setSelectedProvince(null);
    setSelectedCityMunicipality(null);
    setCitiesOption([]);
    setBarangaysOption([]);
  };

  // Update cities when province is selected
  const handleProvinceChange = (event: any) => {
    const provinceCode = event.target.value;
    setSelectedProvince(provinceCode);

    // Filter cities based on selected province
    const filteredCities = cities.filter(
      (city) => city.province_c === provinceCode && city.region_c === selectedRegion
    );
    setCitiesOption(filteredCities);

    // Clear barangay selection when province changes
    setSelectedCityMunicipality(null);
    setBarangaysOption([]);
  };

  // Update barangays when city/municipality is selected
  const handleCityChange = (event: any) => {
    const cityCode = event.target.value;
    setSelectedCityMunicipality(cityCode);

    // Filter barangays based on selected city/municipality
    const filteredBarangays = barangays.filter(
      (barangay) =>
        barangay.citymun_c === cityCode &&
        barangay.province_c === selectedProvince &&
        barangay.region_c === selectedRegion
    );
    console.log(filteredBarangays);
    setBarangaysOption(filteredBarangays);
  };

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isAPIError) {
    return <Typography>Error: Cannot load PSGC API, Please try again</Typography>;
  }

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
      {({ errors, touched, setFieldValue }) => (
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

          {/* Region */}
          <FormControl fullWidth margin="normal" required sx={{ textAlign: "left" }}>
            <InputLabel>Region</InputLabel>
            <Field
              name="addressRegion"
              render={({ field }: { field: any }) => (
                <Select
                  {...field}
                  label="Region"
                  onChange={(e) => {
                    handleRegionChange(e);
                    setFieldValue("addressRegion", e.target.value);
                  }}
                >
                  {regions.map((region) => (
                    <MenuItem key={region.region_c} value={region.region_c}>
                      {region.region_m}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>
              <ErrorMessage name="sex" />
            </FormHelperText>
          </FormControl>

          {/* Province */}
          <FormControl fullWidth margin="normal" required sx={{ textAlign: "left" }}>
            <InputLabel>Province</InputLabel>
            <Field
              name="addressProvince"
              render={({ field }: { field: any }) => (
                <Select
                  {...field}
                  label="Province"
                  onChange={(e) => {
                    handleProvinceChange(e);
                    setFieldValue("addressProvince", e.target.value);
                  }}
                  disabled={!selectedRegion}
                >
                  {provincesOption
                    .filter((province) => province.region_c === selectedRegion)
                    .map((province) => (
                      <MenuItem key={province.province_c} value={province.province_c}>
                        {province.province_m}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            <FormHelperText>
              <ErrorMessage name="addressProvince" />
            </FormHelperText>
          </FormControl>

          {/* City/Municipality */}
          <FormControl fullWidth margin="normal" required sx={{ textAlign: "left" }}>
            <InputLabel>City/Municipality</InputLabel>
            <Field
              name="addressCityMunicipality"
              render={({ field }: { field: any }) => (
                <Select
                  {...field}
                  label="City/Municipality"
                  onChange={(e) => {
                    handleCityChange(e);
                    setFieldValue("addressCityMunicipality", e.target.value);
                  }}
                  disabled={!selectedProvince}
                >
                  {citiesOption
                    .filter((city) => city.province_c === selectedProvince)
                    .map((city) => (
                      <MenuItem key={city.citymun_c} value={city.citymun_c}>
                        {city.citymun_m}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            <FormHelperText>
              <ErrorMessage name="addressCityMunicipality" />
            </FormHelperText>
          </FormControl>

          {/* Barangay */}
          <FormControl fullWidth margin="normal" required sx={{ textAlign: "left" }}>
            <InputLabel>Barangay</InputLabel>
            <Field
              name="addressBarangay"
              render={({ field }: { field: any }) => (
                <Select
                  {...field}
                  label="Barangay"
                  onChange={(e) => {
                    setFieldValue("addressBarangay", e.target.value);
                  }}
                  disabled={!selectedCityMunicipality}
                >
                  {barangaysOption
                    .filter((barangay) => barangay.citymun_c === selectedCityMunicipality)
                    .map((barangay) => (
                      <MenuItem key={barangay.barangay_c} value={barangay.barangay_c}>
                        {barangay.barangay_m}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            <FormHelperText>
              <ErrorMessage name="addressBarangay" />
            </FormHelperText>
          </FormControl>

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
          <FormControl fullWidth margin="normal" required sx={{ textAlign: "left" }}>
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
          <FormControl fullWidth margin="normal" required sx={{ textAlign: "left" }}>
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
