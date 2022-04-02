import { Service } from 'typedi';
import { LiftEntity } from '../entities/lift.entity';

@Service()
export class LiftModel {
	private _lifts: LiftEntity[];

	constructor() {
		this._lifts = [];
	}

	async findAll(): Promise<LiftEntity[]> {
		return this._lifts;
	}

	async findByID(id: number): Promise<LiftEntity | null> {
		const lift = this._lifts.find((l) => l.id === id);

		if (!lift) {
			return null;
		}

		return lift;
	}

	async add(lift: LiftEntity): Promise<number> {
		lift.id = this._lifts.length + 1;

		this._lifts.push(lift);

		return lift.id;
	}

	async set(lift: LiftEntity): Promise<void> {
		this._lifts = this._lifts.map((l) => (l.id === lift.id ? lift : l));
	}

	async cleanUp(): Promise<void> {
		this._lifts = [];
	}
}
