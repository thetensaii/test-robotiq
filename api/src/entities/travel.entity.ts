import { Entity, EntityProps } from './entity';

export type TravelProps = {
	liftID: number;
	sourceFloor: number;
	targetFloor: number;
} & EntityProps;

export class TravelEntity extends Entity {
	private _liftID: number;
	private _sourceFloor: number;
	private _targetFloor: number;

	constructor(travel: TravelProps) {
		super(travel);

		this._liftID = travel.liftID;
		this._sourceFloor = travel.sourceFloor;
		this._targetFloor = travel.targetFloor;
	}

	get liftID(): number {
		return this._liftID;
	}

	set liftID(value: number) {
		this._liftID = value;
	}

	get sourceFloor(): number {
		return this._sourceFloor;
	}

	set sourceFloor(value: number) {
		this._sourceFloor = value;
	}

	get targetFloor(): number {
		return this._targetFloor;
	}

	set targetFloor(value: number) {
		this._targetFloor = value;
	}

	toJSON(): TravelProps {
		return {
			id: super.id,
			liftID: this._liftID,
			sourceFloor: this.sourceFloor,
			targetFloor: this._targetFloor,
		};
	}
}
