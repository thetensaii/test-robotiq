import { expect } from 'chai';
import { TravelEntity, TravelProps } from '../../src/entities/travel.entity';

describe('TravelEntity Tests', () => {
	it('should instantiate TravelEntity', () => {
		// ARRANGE
		const travel: TravelProps = {
			id: 1,
			liftID: 2,
			sourceFloor: 3,
			targetFloor: 8,
		};

		// ACT
		const travelEntity = new TravelEntity(travel);

		// ASSERT
		expect(travelEntity.id).to.equal(travel.id);
		expect(travelEntity.liftID).to.equal(travel.liftID);
		expect(travelEntity.sourceFloor).to.equal(travel.sourceFloor);
		expect(travelEntity.targetFloor).to.equal(travel.targetFloor);
	});

	it('should instantiate TravelEntity without id', () => {
		// ARRANGE
		const travel: TravelProps = {
			liftID: 2,
			sourceFloor: 3,
			targetFloor: 8,
		};

		// ACT
		const travelEntity = new TravelEntity(travel);

		// ASSERT
		expect(travelEntity.id).to.be.null;
		expect(travelEntity.liftID).to.equal(travel.liftID);
		expect(travelEntity.sourceFloor).to.equal(travel.sourceFloor);
		expect(travelEntity.targetFloor).to.equal(travel.targetFloor);
	});

	it('should set TravelEntity', () => {
		// ARRANGE
		const travel: TravelProps = {
			id: 4,
			liftID: 2,
			sourceFloor: 3,
			targetFloor: 8,
		};
		const travelEntity = new TravelEntity(travel);

		// ACT
		const newTravel = {
			id: 1,
			liftID: 4,
			sourceFloor: -2,
			targetFloor: 5,
		};

		travelEntity.id = newTravel.id;
		travelEntity.liftID = newTravel.liftID;
		travelEntity.sourceFloor = newTravel.sourceFloor;
		travelEntity.targetFloor = newTravel.targetFloor;

		// ASSERT
		expect(travelEntity.id).to.equal(newTravel.id);
		expect(travelEntity.liftID).to.equal(newTravel.liftID);
		expect(travelEntity.sourceFloor).to.equal(newTravel.sourceFloor);
		expect(travelEntity.targetFloor).to.equal(newTravel.targetFloor);
	});

	it('should generate a LiftProps object', () => {
		// ARRANGE
		const travel: TravelProps = {
			id: 1,
			liftID: 2,
			sourceFloor: 3,
			targetFloor: 8,
		};
		const travelEntity = new TravelEntity(travel);

		// ACT
		const travelObject: TravelProps = travelEntity.toJSON();

		// ASSERT
		expect(travelEntity.id).to.equal(travelObject.id);
		expect(travelEntity.liftID).to.equal(travelObject.liftID);
		expect(travelEntity.sourceFloor).to.equal(travelObject.sourceFloor);
		expect(travelEntity.targetFloor).to.equal(travelObject.targetFloor);
	});
});
