import React from 'react';
import { render, screen } from '@testing-library/react';
import { AlertMessageBox } from './AlertMessageBox';
import userEvent from '@testing-library/user-event';

describe('AlertMessageBox component tests', () => {
	it('should renders AlertMessageBox', () => {
		const closeAlert = jest.fn();

		const alertContainer = document.createElement('div');
		alertContainer.setAttribute('id', 'alert');

		const { container } = render(
			<AlertMessageBox closeAlert={closeAlert}>Alert test</AlertMessageBox>,
			{
				container: document.body.appendChild(alertContainer),
			}
		);
		expect(container).toMatchSnapshot();
	});

	it('should renders message', () => {
		const closeAlert = jest.fn();

		const alertContainer = document.createElement('div');
		alertContainer.setAttribute('id', 'alert');

		render(<AlertMessageBox closeAlert={closeAlert}>Alert test</AlertMessageBox>, {
			container: document.body.appendChild(alertContainer),
		});

		const messageElement = screen.getByText(/alert test/i);

		expect(messageElement).toBeInTheDocument();
	});

	it('should close message box', async () => {
		const closeAlert = jest.fn();
		const user = userEvent.setup();

		const alertContainer = document.createElement('div');
		alertContainer.setAttribute('id', 'alert');

		render(<AlertMessageBox closeAlert={closeAlert}>Alert test</AlertMessageBox>, {
			container: document.body.appendChild(alertContainer),
		});

		const buttonElement = screen.getByRole('button');

		expect(buttonElement).toBeInTheDocument();
		await user.click(buttonElement);

		expect(closeAlert).toHaveBeenCalledTimes(1);
	});
});
