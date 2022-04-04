import axios from 'axios';
import { useEffect, useState } from 'react';
import { LiftService } from 'services/LiftService';
import { LiftProps } from 'utils/props/LiftProps';

export const useLifts = (): [LiftProps[], string | null] => {
	const [lifts, setLifts] = useState<LiftProps[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const apiLifts = await LiftService.getAll();
				setLifts(apiLifts);
			} catch (error) {
				if (axios.isAxiosError(error) && error.response) {
					if (typeof error.response.data === 'string') {
						setError(error.response.data);
					} else {
						setError('An error as occured');
					}
				} else if (error instanceof Error) {
					setError('An error as occured');
				}
			}
		})();
	}, [setLifts]);

	return [lifts, error];
};
