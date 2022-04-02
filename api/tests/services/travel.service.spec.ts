import 'reflect-metadata';

import { expect } from 'chai';
import Container from 'typedi';
import { LiftEntity, LiftProps } from '../../src/entities/lift.entity';
import { LiftService } from '../../src/services/lift.service';
import { Factory } from '../../src/models/factory';
import { TravelService } from '../../src/services/travel.service';
import { TravelProps } from '../../src/entities/travel.entity';

describe('TravelService Tests', () => {
	afterEach(async () => {
		const factory = Container.get(Factory);
		factory.TravelModel.cleanUp();
	});

	it('should add Travel and set Lift in Model/DB', async () => {
		// ARRANGE
		const factory = Container.get(Factory);
		const liftService: LiftService = Container.get(LiftService);
		const lift: LiftProps = {
			name: 'Lift',
			currentLocation: 0,
			minFloor: -2,
			maxFloor: 10,
		};

		let liftEntity: LiftEntity | null = await liftService.create(lift);
		if (!liftEntity.id) {
			throw new Error('Problem while creating LiftEntity');
		}

		const travel: TravelProps = {
			liftID: liftEntity.id,
			sourceFloor: 3,
			targetFloor: 8,
		};
		const travelService: TravelService = Container.get(TravelService);

		// ACT
		await travelService.create(travel);

		// ASSERT
		liftEntity = await factory.LiftModel.findByID(travel.liftID);
		if (!liftEntity) {
			throw new Error('Problem while setting LiftEntity');
		}

		const travels = await factory.TravelModel.findAll();

		expect(travels.length).to.equal(1);
		expect(travels[0]).not.to.be.null;

		expect(travels[0].id).not.to.be.null;
		expect(travels[0].sourceFloor).to.equal(travel.sourceFloor);
		expect(travels[0].targetFloor).to.equal(travel.targetFloor);

		expect(travels[0].liftID).to.equal(liftEntity.id);
		expect(liftEntity.currentLocation).to.equal(travel.targetFloor);
	});
});
