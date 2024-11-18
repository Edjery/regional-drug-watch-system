// src/services/PSGCService.ts
import axios from 'axios';
import { TblBarangay, TblCityMun, TblProvince, TblRegion } from '../values/interface/@psgcTypes';

class PSGCService {
    // Base URL for your API
    static baseURL = 'http://localhost:8080/api';  // Replace with your actual base URL

    // Fetch regions
    static async getRegions(): Promise<TblRegion[]> {
        try {
            const response = await axios.get(`${this.baseURL}/tbl-region`);
            return response.data;
        } catch (error) {
            console.error('Error fetching regions:', error);
            throw error;
        }
    }

    // Fetch provinces
    static async getProvinces(): Promise<TblProvince[]> {
        try {
            const response = await axios.get(`${this.baseURL}/tbl-province`);
            return response.data;
        } catch (error) {
            console.error('Error fetching provinces:', error);
            throw error;
        }
    }

    // Fetch cities/municipalities
    static async getCities(): Promise<TblCityMun[]> {
        try {
            const response = await axios.get(`${this.baseURL}/tbl-city-mun`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cities/municipalities:', error);
            throw error;
        }
    }

    // Fetch barangays
    static async getBarangays(): Promise<TblBarangay[]> {
        try {
            const response = await axios.get(`${this.baseURL}/tbl-barangay`);
            return response.data;
        } catch (error) {
            console.error('Error fetching barangays:', error);
            throw error;
        }
    }
}

export default PSGCService;
