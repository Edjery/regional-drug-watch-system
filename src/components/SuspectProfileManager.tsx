import { Typography } from "@mui/material";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useEffect, useState } from "react";
import getColumns from "../helper/getColumns";
import getHiddenColumns from "../helper/getHiddenColumns";
import getPSGC from "../helper/getPSGC";
import { TSuspectProfile } from "../schema/suspectProfileSchema";
import PSGCService from "../service/PSGCService";
import SuspectProfileService from "../service/SuspectProfileService";
import { TblBarangay, TblCityMun, TblProvince, TblRegion } from "../values/interface/@psgcTypes";
import theme from "../values/theme";
import GenericTable from "./common/GenericTable";
import { suspectProfileColumns } from "./common/table/suspectProfileColumn";
import TopToolbar from "./common/table/toolbars/TopToolbar";
import { popupError } from "./Popups";

const SuspectProfileManager = () => {
  const suspectProfileService = new SuspectProfileService();
  const psgcService = new PSGCService();

  const [regions, setRegions] = useState<TblRegion[]>([]);
  const [barangays, setBarangays] = useState<TblBarangay[]>([]);
  const [cities, setCities] = useState<TblCityMun[]>([]);
  const [provinces, setProvinces] = useState<TblProvince[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isAPIError, setAPIError] = useState(false);
  const [filteredData, setFilteredData] = useState<TSuspectProfile[]>([]);

  // Fetch PSGC Data
  useEffect(() => {
    setLoading(true);
    Promise.all([
      psgcService.getRegions(),
      psgcService.getBarangays(),
      psgcService.getCities(),
      psgcService.getProvinces(),
    ])
      .then(([regionData, barangayData, cityData, provinceData]) => {
        setRegions(regionData);
        setBarangays(barangayData);
        setCities(cityData);
        setProvinces(provinceData);
      })
      .catch(() => {
        popupError("Error: Unable to load PSGC data.");
        setAPIError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fetch suspect profile data
  const { data: fetchedData = [] } = suspectProfileService.getAllItems();

  // Map address codes to names using getPSGC
  useEffect(() => {
    if (regions.length && provinces.length && cities.length && barangays.length && fetchedData.length) {
      const mappedData = fetchedData.map((profile) => {
        const { addressRegion, addressProvince, addressCityMunicipality, addressBarangay } = profile;

        const { regionName, provinceName, cityName, barangayName } = getPSGC(
          addressRegion,
          addressProvince,
          addressCityMunicipality,
          addressBarangay,
          regions,
          provinces,
          cities,
          barangays
        );

        return {
          ...profile,
          addressRegion: regionName ? regionName.region_m : "",
          addressProvince: provinceName ? provinceName.province_m : "",
          addressCityMunicipality: cityName ? cityName.citymun_m : "",
          addressBarangay: barangayName ? barangayName.barangay_m : "",
        };
      });
      setFilteredData(mappedData);
    }
  }, [regions, provinces, cities, barangays, fetchedData]);

  const outerColor = theme.palette.primary.main;
  const innerHeadColor = theme.palette.secondary.dark;
  const innerBodyColor = theme.palette.secondary.main;
  const innerTableColor = theme.palette.primary.light;
  const hiddenColumnsObject = getHiddenColumns(suspectProfileColumns);

  const table = useMaterialReactTable({
    columns: getColumns<TSuspectProfile>(suspectProfileColumns),
    data: filteredData,
    state: {
      isLoading: isLoading,
    },

    // CRUD methods
    renderTopToolbarCustomActions: ({ table }) => <TopToolbar table={table} disableAdd />,

    // Utility
    initialState: { columnVisibility: hiddenColumnsObject },
    createDisplayMode: "row",

    // Design
    muiTopToolbarProps: {
      sx: { bgcolor: outerColor, height: "5vh" },
    },
    muiTableHeadRowProps: {
      sx: { bgcolor: innerHeadColor, height: "5vh" },
    },
    muiTableContainerProps: {
      sx: { minHeight: "60vh" },
    },
    muiTableBodyRowProps: {
      sx: { bgcolor: innerBodyColor },
    },
    muiBottomToolbarProps: {
      sx: { bgcolor: outerColor, minHeight: "10vh" },
    },
    muiTablePaperProps: {
      sx: { bgcolor: innerTableColor, minHeight: "75vh" },
    },
  });

  if (isAPIError) {
    return <Typography>Error: Cannot load PSGC API, Please try again</Typography>;
  }

  return (
    <GenericTable title="Suspect Profiles">
      <MaterialReactTable table={table} />
    </GenericTable>
  );
};

export default SuspectProfileManager;
