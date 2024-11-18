import { TblRegion, TblProvince, TblCityMun, TblBarangay } from "../values/interface/@psgcTypes"; // Adjust path as needed

const getPSGC = (
    addressRegion: string,
    addressProvince: string,
    addressCityMunicipality: string,
    addressBarangay: string,
    regions: TblRegion[],
    provinces: TblProvince[],
    cities: TblCityMun[],
    barangays: TblBarangay[]
) => {
    // Find the region name
    const regionName = regions.find((item) => item.region_c === addressRegion);

    // Find the province name
    const provinceName = provinces.find(
        (item) => item.region_c === addressRegion && item.province_c === addressProvince
    );

    // Find the city/municipality name
    const cityName = cities.find(
        (item) =>
            item.region_c === addressRegion &&
            item.province_c === addressProvince &&
            item.citymun_c === addressCityMunicipality
    );

    // Find the barangay name
    const barangayName = barangays.find(
        (item) =>
            item.region_c === addressRegion &&
            item.province_c === addressProvince &&
            item.citymun_c === addressCityMunicipality &&
            item.barangay_c === addressBarangay
    );

    // Return the names of region, province, city, and barangay
    return {
        regionName,
        provinceName,
        cityName,
        barangayName,
    };
};

export default getPSGC;
