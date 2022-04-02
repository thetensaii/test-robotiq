import 'reflect-metadata';

import { expect } from 'chai';
import Container from 'typedi';
import { Factory } from '../../src/models/factory';
import { TravelEntity, TravelProps } from '../../src/entities/travel.entity';

describe('TravelModel Tests', () => {
	afterEach(async () => {
		const factory = Container.get(Factory);
		await factory.TravelModel.cleanUp();
	});

	it('should return empty array', async () => {
		// ARRANGE
		const factory = Container.get(Factory);

		// ACT
		const lifts: TravelEntity[] = await factory.TravelModel.findAll();

		// ASSERT
		expect(lifts.length).to.equal(0);
	});

	it('should add Travel to Model/DB', async () => {
		// ARRANGE
		const factory = Container.get(Factory);
		const travel: TravelProps = {
			liftID: 2,
			sourceFloor: 3,
			targetFloor: 8,
		};
		const travelEntity: TravelEntity = new TravelEntity(travel);

		// ACT
		const travelID: number = await factory.TravelModel.add(travelEntity);
		const travels: TravelEntity[] = await factory.TravelModel.findAll();

		// ASSERT
		expect(travels.length).to.equal(1);
		expect(travels[0]).not.to.be.null;
		expect(travels[0].id).to.equal(travelID);
		expect(travels[0].liftID).to.equal(travel.liftID);
		expect(travels[0].sourceFloor).to.equal(travel.sourceFloor);
		expect(travels[0].targetFloor).to.equal(travel.targetFloor);
	});

	it('should find TravelEntity by id in Model/DB', async () => {
		/// ARRANGE
		const factory = Container.get(Factory);
		const travel: TravelProps = {
			liftID: 2,
			sourceFloor: 3,
			targetFloor: 8,
		};
		const travelEntity: TravelEntity = new TravelEntity(travel);
		const travelID: number = await factory.TravelModel.add(travelEntity);

		// ACT
		const addedTravelEntity: TravelEntity | null = await factory.TravelModel.findByID(travelID);

		// ASSERT
		expect(addedTravelEntity).not.to.be.null;
		expect(addedTravelEntity?.id).to.equal(travelID);
		expect(addedTravelEntity?.liftID).to.equal(travel.liftID);
		expect(addedTravelEntity?.sourceFloor).to.equal(travel.sourceFloor);
		expect(addedTravelEntity?.targetFloor).to.equal(travel.targetFloor);
	});
});
