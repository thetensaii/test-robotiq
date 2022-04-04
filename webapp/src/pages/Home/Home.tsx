import AlertMessageBox, { AlertMessageBoxTypes } from 'components/AlertMessageBox';
import { useAlert } from 'hooks/useAlert';
import { useLifts } from 'hooks/useLifts';
import React, { useEffect } from 'react';
import LiftCard from '../../components/LiftCard';
import styles from './Home.module.css';

export const Home: React.FC = () => {
	const [lifts, error] = useLifts();

	const [alert, updateAlert, removeAlert] = useAlert();

	useEffect(() => {
		if (!error) {
			removeAlert();
		} else {
			updateAlert(AlertMessageBoxTypes.danger, error);
		}
	}, [error]);

	return (
		<div className={styles.home}>
			<h1 className={styles.title}>Robotiq Test</h1>
			<h2 className={styles.subTitle}>Lifts</h2>

			{lifts.map((lift) => (
				<LiftCard
					key={lift.id}
					id={lift.id}
					name={lift.name}
					currentLocation={lift.currentLocation}
					minFloor={lift.minFloor}
					maxFloor={lift.maxFloor}
				/>
			))}

			{alert && (
				<AlertMessageBox type={alert.type} closeAlert={removeAlert}>
					{alert.message}
				</AlertMessageBox>
			)}
		</div>
	);
};
