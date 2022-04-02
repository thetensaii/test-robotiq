export type EntityProps = {
	id?: number | null;
};

export class Entity {
	private _id: number | null;

	constructor(entity: EntityProps) {
		if (this.constructor == Entity) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		this._id = entity.id || null;
	}

	get id(): number | null {
		return this._id;
	}

	set id(value: number | null) {
		this._id = value;
	}
}
