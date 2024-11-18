export interface TblRegion {
    region_c: string;  // Region Code
    region_m: string;  // Region Name
    abbreviation: string;  // Abbreviation
    region_sort?: number | null;  // Region Sort (optional)
}

export interface TblProvince {
    region_c: string;  // Region Code
    province_c: string;  // Province Code
    province_m: string;  // Province Name
    income: string;  // Income level
}

export interface TblCityMun {
    region_c: string;  // Region Code
    province_c: string;  // Province Code
    district_c: string;  // District Code
    citymun_c: string;  // City/Municipality Code
    citymun_m: string;  // City/Municipality Name
    lgu_type: string;  // LGU Type
    income: string;  // Income level
}

export interface TblBarangay {
    region_c: string;  // Region Code
    province_c: string;  // Province Code
    citymun_c: string;  // City/Municipality Code
    barangay_c: string;  // Barangay Code
    district_c: string;  // District Code (binary?)
    barangay_m: string;  // Barangay Name
    income: string;  // Income level
    population?: string | null;  // Population (optional)
    classification?: string | null;  // Classification (optional)
}
