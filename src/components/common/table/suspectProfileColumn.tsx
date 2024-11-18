import ITableColumn from "./ITableColumn";

export const suspectProfileColumns: ITableColumn[] = [
  {
    key: "id",
    label: "ID",
    enableEdit: false,
    width: 80,
  },
  {
    key: "lastName",
    label: "Last Name",
    enableEdit: true,
  },
  {
    key: "firstName",
    label: "First Name",
    enableEdit: true,
  },
  {
    key: "middleName",
    label: "Middle Name",
    enableEdit: true,
  },
  {
    key: "dateOfBirth",
    label: "Date of Birth",
    enableEdit: false,
    isHidden: false,
  },
  {
    key: "addressStreet",
    label: "Street",
    enableEdit: true,
  },
  {
    key: "addressBarangay",
    label: "Barangay",
    enableEdit: true,
  },
  {
    key: "addressCityMunicipality",
    label: "City/Municipality",
    enableEdit: true,
  },
  {
    key: "addressProvince",
    label: "Province",
    enableEdit: true,
  },
  {
    key: "addressRegion",
    label: "Region",
    enableEdit: true,
  },
  {
    key: "mobileNo",
    label: "Mobile No",
    enableEdit: true,
  },
  {
    key: "telephoneNo",
    label: "Telephone No",
    enableEdit: true,
  },
  {
    key: "status",
    label: "Status",
    enableEdit: true,
    editType: "select",
    selectOptions: ["Active", "Inactive"],
  },
  {
    key: "sex",
    label: "Sex",
    enableEdit: true,
    editType: "select",
    selectOptions: ["Male", "Female", "Other"],
  },
  {
    key: "createdAt",
    label: "Created At",
    enableEdit: false,
    isHidden: true,
  },
  {
    key: "updatedAt",
    label: "Updated At",
    enableEdit: false,
    isHidden: true,
  },
];
