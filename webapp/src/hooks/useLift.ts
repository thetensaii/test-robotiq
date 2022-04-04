import { useEffect, useState } from 'react';
import { LiftService } from 'services/LiftService';
import { getAllNumbersBetween } from 'utils/functions';
import { LiftProps } from 'utils/props/LiftProps';

export const useLift = (
	initialLift: LiftProps
): [LiftProps, number[], (sourceFloor: number, targetFloor: number) => Promise<void>] => {
	const [lift, setLift] = useState<LiftProps>(initialLift);
	const [floors, setFloors] = useState<number[]>([]);

	useEffect(() => {
		setFloors(getAllNumbersBetween(lift.minFloor, lift.maxFloor));
	}, [lift]);

	const createTravel = async (sourceFloor: number, targetFloor: number) => {
		await LiftService.createTravel({
			liftID: lift.id,
			sourceFloor: sourceFloor,
			targetFloor: targetFloor,
		});

		setLift((l) => ({ ...l, currentLocation: targetFloor }));
	};

	return [lift, floors, createTravel];
};
