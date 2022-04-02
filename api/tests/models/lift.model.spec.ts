import 'reflect-metadata';

import { expect } from 'chai';
import Container from 'typedi';
import { LiftEntity, LiftProps } from '../../src/entities/lift.entity';
import { Factory } from '../../src/models/factory';

describe('LiftModel Tests', () => {
	afterEach(async () => {
		const factory = Container.get(Factory);
		factory.LiftModel.cleanUp();
	});

	it('should return empty array', async () => {
		// ARRANGE
		const factory = Container.get(Factory);

		// ACT
		const lifts: LiftEntity[] = await factory.LiftModel.findAll();

		// ASSERT
		expect(lifts.length).to.equal(0);
	});

	it('should add Lift to Model/DB', async () => {
		// ARRANGE
		const factory = Container.get(Factory);
		const lift: LiftProps = {
			name: 'Lift',
			currentLocation: 0,
			minFloor: -2,
			maxFloor: 5,
		};
		const liftEntity: LiftEntity = new LiftEntity(lift);

		// ACT
		const liftID: number = await factory.LiftModel.add(liftEntity);
		const lifts: LiftEntity[] = await factory.LiftModel.findAll();

		// ASSERT
		expect(lifts.length).to.equal(1);
		expect(lifts[0]).not.to.be.null;
		expect(lifts[0].id).to.equal(liftID);
		expect(lifts[0].name).to.equal(liftEntity.name);
		expect(lifts[0].currentLocation).to.equal(liftEntity.currentLocation);
		expect(lifts[0].minFloor).to.equal(liftEntity.minFloor);
		expect(lifts[0].maxFloor).to.equal(liftEntity.maxFloor);
	});

	it('should find LiftEntity by id in Model/DB', async () => {
		// ARRANGE
		const factory = Container.get(Factory);
		const lift: LiftProps = {
			name: 'Lift',
			currentLocation: 0,
			minFloor: -2,
			maxFloor: 5,
		};
		const liftEntity: LiftEntity = new LiftEntity(lift);
		const liftID: number = await factory.LiftModel.add(liftEntity);

		// ACT
		const addedLiftEntity: LiftEntity | null = await factory.LiftModel.findByID(liftID);

		// ASSERT
		expect(addedLiftEntity).not.to.be.null;
		expect(addedLiftEntity?.id).to.equal(liftID);
		expect(addedLiftEntity?.name).to.equal(lift.name);
		expect(addedLiftEntity?.currentLocation).to.equal(lift.currentLocation);
		expect(addedLiftEntity?.minFloor).to.equal(lift.minFloor);
		expect(addedLiftEntity?.maxFloor).to.equal(lift.maxFloor);
	});
});
