import { apiPostRequest, apiGetRequest, ApiPaths } from 'utils/api';
import { LiftProps } from 'utils/props/LiftProps';

export class LiftService {
	static async getAll(): Promise<LiftProps[]> {
		const response = await apiGetRequest(ApiPaths.LIFTS);

		return response.data;
	}

	static async createTravel(data: {
		liftID: number;
		sourceFloor: number;
		targetFloor: number;
	}): Promise<boolean> {
		await apiPostRequest(ApiPaths.TRAVELS, data);

		return true;
	}
}
