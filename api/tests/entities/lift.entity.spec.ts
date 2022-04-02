import { expect } from 'chai';
import { LiftEntity, LiftProps } from '../../src/entities/lift.entity';

describe('LiftEntity Tests', () => {
	it('should instantiate LiftEntity', () => {
		// ARRANGE
		const lift: LiftProps = {
			id: 1,
			name: 'Lift',
			currentLocation: 0,
			minFloor: -2,
			maxFloor: 5,
		};

		// ACT
		const liftEntity: LiftEntity = new LiftEntity(lift);

		// ASSERT
		expect(liftEntity.id).to.equal(lift.id);
		expect(liftEntity.name).to.equal(lift.name);
		expect(liftEntity.currentLocation).to.equal(lift.currentLocation);
		expect(liftEntity.minFloor).to.equal(lift.minFloor);
		expect(liftEntity.maxFloor).to.equal(lift.maxFloor);
	});

	it('should instantiate LiftEntity without id', () => {
		// ARRANGE
		const lift: LiftProps = {
			name: 'Lift',
			currentLocation: 0,
			minFloor: -2,
			maxFloor: 5,
		};

		// ACT
		const liftEntity: LiftEntity = new LiftEntity(lift);

		// ASSERT
		expect(liftEntity.id).to.be.null;
		expect(liftEntity.name).to.equal(lift.name);
		expect(liftEntity.currentLocation).to.equal(lift.currentLocation);
		expect(liftEntity.minFloor).to.equal(lift.minFloor);
		expect(liftEntity.maxFloor).to.equal(lift.maxFloor);
	});

	it('should instantiate LiftEntity with currentLocation equal to minFloor', () => {
		// ARRANGE
		const lift: LiftProps = {
			id: 1,
			name: 'Lift',
			minFloor: -2,
			maxFloor: 5,
		};

		// ACT
		const liftEntity: LiftEntity = new LiftEntity(lift);

		// ASSERT
		expect(liftEntity.id).to.equal(lift.id);
		expect(liftEntity.name).to.equal(lift.name);
		expect(liftEntity.currentLocation).to.equal(lift.minFloor);
		expect(liftEntity.minFloor).to.equal(lift.minFloor);
		expect(liftEntity.maxFloor).to.equal(lift.maxFloor);
	});

	it('should set LiftEntity', () => {
		// ARRANGE
		const lift: LiftProps = {
			id: 1,
			name: 'Lift',
			currentLocation: 0,
			minFloor: -2,
			maxFloor: 5,
		};

		const liftEntity: LiftEntity = new LiftEntity(lift);

		// ACT
		const newLift = {
			id: 2,
			name: 'Lift A',
			currentLocation: 0,
			minFloor: -1,
			maxFloor: 9,
		};

		liftEntity.id = newLift.id;
		liftEntity.name = newLift.name;
		liftEntity.currentLocation = newLift.currentLocation;

		// ASSERT
		expect(liftEntity.id).to.equal(newLift.id);
		expect(liftEntity.name).to.equal(newLift.name);
		expect(liftEntity.currentLocation).to.equal(newLift.currentLocation);
		expect(liftEntity.minFloor).to.equal(lift.minFloor);
		expect(liftEntity.maxFloor).to.equal(lift.maxFloor);
	});

	it('should generate a LiftProps object', () => {
		// ARRANGE
		const lift: LiftProps = {
			id: 1,
			name: 'Lift',
			currentLocation: 0,
			minFloor: -2,
			maxFloor: 5,
		};

		const liftEntity: LiftEntity = new LiftEntity(lift);

		// ACT
		const liftObject = liftEntity.toJSON();

		// ASSERT
		expect(liftEntity.id).to.equal(liftObject.id);
		expect(liftEntity.name).to.equal(liftObject.name);
		expect(liftEntity.currentLocation).to.equal(liftObject.currentLocation);
		expect(liftEntity.minFloor).to.equal(liftObject.minFloor);
		expect(liftEntity.maxFloor).to.equal(liftObject.maxFloor);
	});
});
