import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';
export const apiGetRequest = async (
	endpoint: string,
	requestConfig: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
	const response: AxiosResponse = await axios.get(config.API_URL + endpoint, requestConfig);
	return response;
};
export const apiPostRequest = async (
	endpoint: string,
	data: any,
	requestConfig: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
	const response: AxiosResponse = await axios.post(
		config.API_URL + endpoint,
		data,
		requestConfig
	);

	return response;
};

export const enum ApiPaths {
	LIFTS = '/lifts',
	TRAVELS = '/travels',
}
