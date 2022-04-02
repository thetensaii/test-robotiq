import 'reflect-metadata';

import { expect } from 'chai';
import Container from 'typedi';
import { LiftEntity, LiftProps } from '../../src/entities/lift.entity';
import { LiftService } from '../../src/services/lift.service';
import { Factory } from '../../src/models/factory';

describe('LiftService Tests', () => {
	afterEach(async () => {
		const factory = Container.get(Factory);
		factory.LiftModel.cleanUp();
	});

	it('should render empty array', async () => {
		// ARRANGE
		const liftService: LiftService = Container.get(LiftService);

		// ACT
		const lifts: LiftEntity[] = await liftService.findAll();

		// ASSERT
		expect(lifts.length).to.equal(0);
	});

	it('should add Lift to Model/DB', async () => {
		// ARRANGE
		const liftService: LiftService = Container.get(LiftService);
		const lift: LiftProps = {
			name: 'Lift',
			currentLocation: 0,
			minFloor: -2,
			maxFloor: 5,
		};

		// ACT
		const liftEntity: LiftEntity = await liftService.create(lift);
		const lifts: LiftEntity[] = await liftService.findAll();

		// ASSERT
		expect(lifts.length).to.equal(1);
		expect(lifts[0]).not.to.be.null;
		expect(lifts[0].id).to.equal(liftEntity.id);
		expect(lifts[0].name).to.equal(lift.name);
		expect(lifts[0].currentLocation).to.equal(lift.currentLocation);
		expect(lifts[0].minFloor).to.equal(lift.minFloor);
		expect(lifts[0].maxFloor).to.equal(lift.maxFloor);
	});
});
