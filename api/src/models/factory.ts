import { Service, Container } from 'typedi';
import { LiftModel } from './lift.model';
import { TravelModel } from './travel.model';

@Service({ transient: true })
export class Factory {
	private _liftModel: LiftModel;
	private _travelModel: TravelModel;

	constructor() {
		this._liftModel = Container.get(LiftModel);
		this._travelModel = Container.get(TravelModel);
	}

	get LiftModel(): LiftModel {
		return this._liftModel;
	}

	get TravelModel(): TravelModel {
		return this._travelModel;
	}
}
