import { Container } from 'typedi';
import { LiftProps } from '../entities/lift.entity';
import { LiftService } from '../services/lift.service';

export default async () => {
	const liftService = Container.get(LiftService);

	const initialLifts: LiftProps[] = [
		{
			name: 'Lift A',
			currentLocation: 0,
			minFloor: -2,
			maxFloor: 5,
		},
		{
			name: 'Lift B',
			currentLocation: 0,
			minFloor: -2,
			maxFloor: 5,
		},
		{
			name: 'Lift C',
			currentLocation: 0,
			minFloor: -2,
			maxFloor: 5,
		},
	];

	for (const lift of initialLifts) {
		await liftService.create(lift);
	}
};
