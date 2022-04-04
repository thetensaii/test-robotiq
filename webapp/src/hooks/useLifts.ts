import axios from 'axios';
import { useEffect, useState } from 'react';
import { LiftService } from 'services/LiftService';
import { LiftProps } from 'utils/props/LiftProps';

export const useLifts = () => {
	const [lifts, setLifts] = useState<LiftProps[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const apiLifts = await LiftService.getAll();
				setLifts(apiLifts);
			} catch (error) {
				if (axios.isAxiosError(error) && error.response) {
					console.error(error.response.data);
				} else if (error instanceof Error) {
					console.error('Une erreur a été rencontrée');
				}
			}
		})();
	}, [setLifts]);

	return [lifts];
};
