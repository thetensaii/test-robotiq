import { useEffect, useState } from 'react';
import { AlertMessageBoxTypes } from 'components/AlertMessageBox';
import { AlertProps } from 'utils/props/AlertProps';

export const useAlert = (
	initialAlert: AlertProps | null = null
): [AlertProps | null, (type: AlertMessageBoxTypes, message: string) => void, () => void] => {
	const [alert, setAlert] = useState<AlertProps | null>(initialAlert);

	const updateAlert = (type: AlertMessageBoxTypes, message: string): void => {
		setAlert({ type, message });
	};

	const removeAlert = () => {
		setAlert(null);
	};

	useEffect(() => {
		return () => removeAlert();
	}, []);

	return [alert, updateAlert, removeAlert];
};
