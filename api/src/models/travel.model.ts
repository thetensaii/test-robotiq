import { Service } from 'typedi';
import { TravelEntity } from '../entities/travel.entity';

@Service()
export class TravelModel {
	private _travels: TravelEntity[];

	constructor() {
		this._travels = [];
	}

	async findAll(): Promise<TravelEntity[]> {
		return this._travels;
	}

	async findByID(id: number): Promise<TravelEntity | null> {
		const travel = this._travels.find((t) => t.id === id);

		if (!travel) {
			return null;
		}

		return travel;
	}

	async add(travel: TravelEntity): Promise<number> {
		travel.id = this._travels.length + 1;
		this._travels.push(travel);

		return travel.id;
	}

	async cleanUp(): Promise<void> {
		this._travels = [];
	}
}
