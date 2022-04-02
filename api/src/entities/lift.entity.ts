import { Entity, EntityProps } from './entity';

export type LiftProps = {
	name: string;
	minFloor: number;
	maxFloor: number;
	currentLocation?: number;
} & EntityProps;
export class LiftEntity extends Entity {
	private _name: string;
	private _currentLocation: number;
	private _minFloor: number;
	private _maxFloor: number;

	constructor(lift: LiftProps) {
		super(lift);

		this._name = lift.name;
		this._minFloor = lift.minFloor;
		this._maxFloor = lift.maxFloor;
		this._currentLocation =
			lift.currentLocation === undefined ? lift.minFloor : lift.currentLocation;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get minFloor(): number {
		return this._minFloor;
	}
	get maxFloor(): number {
		return this._maxFloor;
	}

	get currentLocation(): number {
		return this._currentLocation;
	}

	set currentLocation(value: number) {
		this._currentLocation = value;
	}

	toJSON(): LiftProps {
		return {
			id: super.id,
			name: this._name,
			currentLocation: this._currentLocation,
			minFloor: this._minFloor,
			maxFloor: this._maxFloor,
		};
	}
}
