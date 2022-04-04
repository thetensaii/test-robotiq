import React from 'react';
import { createPortal } from 'react-dom';
import styles from './AlertMessageBox.module.css';
import { MdClose } from 'react-icons/md';

export enum AlertMessageBoxTypes {
	danger = 'alertDanger',
	info = 'alertInfo',
	success = 'alertSuccess',
}

type AlertMessageBoxProps = {
	type?: AlertMessageBoxTypes;
	closeAlert: () => void;
};

export const AlertMessageBox: React.FC<AlertMessageBoxProps> = ({
	type = AlertMessageBoxTypes.info,
	closeAlert,
	children,
}) => {
	return createPortal(
		<div className={`${styles.alert} ${styles[type]}`}>
			{children}
			<button className={styles.closeButton} onClick={closeAlert}>
				<MdClose />
			</button>
		</div>,
		document.getElementById('alert') as Element
	);
};
