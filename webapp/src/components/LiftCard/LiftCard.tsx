import React from 'react';
import { getFormData } from '../../utils/functions';
import styles from './LiftCard.module.css';
import Select from '../Select';
import { useLift } from 'hooks/useLift';
import { useAlert } from 'hooks/useAlert';
import AlertMessageBox, { AlertMessageBoxTypes } from 'components/AlertMessageBox';
import axios from 'axios';
import { ImArrowRight2 } from 'react-icons/im';
export type LiftCardProps = {
	id: number;
	name: string;
	currentLocation: number;
	minFloor: number;
	maxFloor: number;
};

export const LiftCard: React.FC<LiftCardProps> = ({
	id,
	name,
	currentLocation,
	minFloor,
	maxFloor,
}) => {
	const [alert, updateAlert, removeAlert] = useAlert();

	const [lift, floors, createTravel] = useLift({
		id: id,
		name: name,
		currentLocation: currentLocation,
		minFloor: minFloor,
		maxFloor: maxFloor,
	});

	const onTravelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		removeAlert();

		const createTravelForm = e.currentTarget;
		const createTravelFormDataRaw = getFormData(createTravelForm);

		const travel = {
			sourceFloor: Number(createTravelFormDataRaw.sourceFloor),
			targetFloor: Number(createTravelFormDataRaw.targetFloor),
		};

		try {
			await createTravel(travel.sourceFloor, travel.targetFloor);
			updateAlert(
				AlertMessageBoxTypes.success,
				`${lift.name} took you from ${travel.sourceFloor} floor to ${travel.targetFloor}`
			);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				updateAlert(AlertMessageBoxTypes.danger, error.response.data);
			} else if (error instanceof Error) {
				updateAlert(AlertMessageBoxTypes.danger, 'Une erreur a été rencontrée');
			}
		}
	};

	return (
		<div className={styles.liftCard}>
			<h3>{name}</h3>
			<p>Location : {lift.currentLocation}</p>
			<div>
				This lift goes from {lift.minFloor} to {lift.maxFloor}
			</div>
			<form aria-label="form" className={styles.form} onSubmit={onTravelSubmit}>
				<div className={styles.formField}>
					<Select
						name="sourceFloor"
						options={floors.map((f) => ({ value: f, label: f }))}
					/>

					<ImArrowRight2 />
					<Select
						name="targetFloor"
						options={floors.map((f) => ({ value: f, label: f }))}
					/>
				</div>
				<button type="submit" className={styles.submitButton}>
					Travel
				</button>
			</form>
			{alert && (
				<AlertMessageBox type={alert.type} closeAlert={removeAlert}>
					{alert.message}
				</AlertMessageBox>
			)}
		</div>
	);
};
