// src/services/PSGCService.ts
import axios from 'axios';
import { TblBarangay, TblCityMun, TblProvince, TblRegion } from '../values/interface/@psgcTypes';

export default class PSGCService {
    // Base URL for your API
    baseURL = 'http://localhost:8080/api';  // Replace with your actual base URL

    // Fetch regions
    public async getRegions(): Promise<TblRegion[]> {
        try {
            const response = await axios.get(`${this.baseURL}/tbl-region`);
            return response.data;
        } catch (error) {
            console.error('Error fetching regions:', error);
            throw error;
        }
    }

    // Fetch provinces
    public async getProvinces(): Promise<TblProvince[]> {
        try {
            const response = await axios.get(`${this.baseURL}/tbl-province`);
            return response.data;
        } catch (error) {
            console.error('Error fetching provinces:', error);
            throw error;
        }
    }

    // Fetch cities/municipalities
    public async getCities(): Promise<TblCityMun[]> {
        try {
            const response = await axios.get(`${this.baseURL}/tbl-city-mun`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cities/municipalities:', error);
            throw error;
        }
    }

    // Fetch barangays
    public async getBarangays(): Promise<TblBarangay[]> {
        try {
            const response = await axios.get(`${this.baseURL}/tbl-barangay`);
            return response.data;
        } catch (error) {
            console.error('Error fetching barangays:', error);
            throw error;
        }
    }
}