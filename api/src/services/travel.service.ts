import { Service } from 'typedi';
import { LiftEntity } from '../entities/lift.entity';
import { TravelEntity, TravelProps } from '../entities/travel.entity';
import { Factory } from '../models/factory';
import { HttpError } from '../errors/http.error';
import { StatusCodes } from 'http-status-codes';

@Service({ transient: true })
export class TravelService {
	constructor(private _factory: Factory) {}

	async create(travel: TravelProps) {
		const lift = await this._factory.LiftModel.findByID(travel.liftID);

		if (!lift) {
			throw new HttpError(StatusCodes.NOT_FOUND, "This lift doesn't exist");
		}

		if (!isTravelValid(travel, lift)) {
			// change status code?
			throw new HttpError(StatusCodes.FORBIDDEN, 'This travel is not possible');
		}

		// if (lift.currentLocation === travel.sourceFloor) {
		// 	lift.currentLocation = travel.sourceFloor;
		// 	await this._factory.LiftModel.set(lift);
		// }

		const travelID = await this._factory.TravelModel.add(new TravelEntity(travel));

		const newTravelEntity = await this._factory.TravelModel.findByID(travelID);

		if (!newTravelEntity) {
			throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error while creating travel');
		}

		lift.currentLocation = travel.targetFloor;
		await this._factory.LiftModel.set(lift);
	}
}

const isTravelValid = (travel: TravelProps, lift: LiftEntity): boolean => {
	if (travel.sourceFloor === travel.targetFloor) {
		return false;
	}

	if (travel.sourceFloor < lift.minFloor || travel.sourceFloor > lift.maxFloor) {
		return false;
	}

	if (travel.targetFloor < lift.minFloor || travel.targetFloor > lift.maxFloor) {
		return false;
	}

	return true;
};
