import { Service } from 'typedi';
import { LiftEntity, LiftProps } from '../entities/lift.entity';
import { Factory } from '../models/factory';
import { HttpError } from '../errors/http.error';
import { StatusCodes } from 'http-status-codes';

@Service({ transient: true })
export class LiftService {
	constructor(private _factory: Factory) {}

	async findAll(): Promise<LiftEntity[]> {
		const lifts = await this._factory.LiftModel.findAll();
		return lifts;
	}

	async findByID(id: number): Promise<LiftEntity> {
		const lift: LiftEntity | null = await this._factory.LiftModel.findByID(id);
		if (!lift) {
			throw new HttpError(StatusCodes.NOT_FOUND, 'Lift does not exist');
		}
		return lift;
	}

	async create(lift: LiftProps): Promise<LiftEntity> {
		if (lift.minFloor >= lift.maxFloor) {
			throw new HttpError(
				StatusCodes.FORBIDDEN,
				"Min floor can't be greather than or equal at max floor."
			);
		}

		if (
			lift.currentLocation &&
			(lift.currentLocation > lift.maxFloor || lift.currentLocation < lift.minFloor)
		) {
			throw new HttpError(
				StatusCodes.FORBIDDEN,
				"Lift location can't be greather than max floor or lower than min floor."
			);
		}

		const liftID = await this._factory.LiftModel.add(new LiftEntity(lift));

		const newLiftEntity = await this._factory.LiftModel.findByID(liftID);
		if (!newLiftEntity) {
			throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error while creating lift');
		}

		return newLiftEntity;
	}
}
