import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { LiftCard } from './LiftCard';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import config from 'config';
import { ApiPaths } from 'utils/api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LiftCard component tests', () => {
	it('should render LiftCard', () => {
		const { container } = render(
			<LiftCard id={6} name={'Lift test'} currentLocation={0} minFloor={-2} maxFloor={8} />
		);
		expect(container).toMatchSnapshot();
	});

	it('should render lift name', () => {
		render(
			<LiftCard id={6} name={'Lift test'} currentLocation={0} minFloor={-2} maxFloor={8} />
		);

		const nameElement = screen.getByRole('heading', { name: /lift test/i });

		expect(nameElement).toBeInTheDocument();
	});

	it('should render lift location', () => {
		render(
			<LiftCard id={6} name={'Lift test'} currentLocation={0} minFloor={-2} maxFloor={8} />
		);

		const locationElement = screen.getByText(/location : 0/i);
		expect(locationElement).toBeInTheDocument();
	});

	it('should render lift floors', () => {
		render(
			<LiftCard id={6} name={'Lift test'} currentLocation={0} minFloor={-2} maxFloor={8} />
		);

		const floorsElement = screen.getByText(/this lift goes from -2 to 8/i);
		expect(floorsElement).toBeInTheDocument();
	});

	it('should render travel form', () => {
		render(
			<LiftCard id={6} name={'Lift test'} currentLocation={0} minFloor={-2} maxFloor={8} />
		);

		const form: HTMLFormElement = screen.getByRole('form');
		const selectsElement = screen.getAllByRole('combobox');
		const submitElement = screen.getByRole('button', { name: /travel/i });

		expect(form).toBeInTheDocument();

		expect(selectsElement.length).toBe(2);
		expect(selectsElement[0]).toBeInTheDocument();
		expect(selectsElement[1]).toBeInTheDocument();

		expect(submitElement).toBeInTheDocument();
	});

	it('should set lift location', async () => {
		mockedAxios.post.mockResolvedValueOnce({
			data: {},
			status: 201,
			statusText: '',
			headers: {},
			config: {},
		});

		const user = userEvent.setup();
		const alertContainer = document.createElement('div');
		alertContainer.setAttribute('id', 'alert');

		render(
			<LiftCard id={6} name={'Lift test'} currentLocation={0} minFloor={-2} maxFloor={8} />,
			{
				container: document.body.appendChild(alertContainer),
			}
		);

		const submitElement = screen.getByRole('button', { name: /travel/i });
		const locationElement = screen.getByText(/location : 0/i);
		const selectsElement = screen.getAllByRole('combobox');
		const optionsElement: HTMLOptionElement[] = screen.getAllByRole('option');

		// Initial Test
		expect(locationElement).toBeInTheDocument();

		// Select 2nd floor for targetFloor
		await user.selectOptions(selectsElement[1], optionsElement[15]);
		expect(optionsElement[15].selected).toBeTruthy();
		expect(mockedAxios).toHaveBeenCalledTimes(0);

		// Send request
		await act(async () => {
			await user.click(submitElement);
		});

		expect(mockedAxios.post).toHaveBeenCalledTimes(1);
		expect(mockedAxios.post).toHaveBeenCalledWith(
			config.API_URL + ApiPaths.TRAVELS,
			{
				liftID: 6,
				sourceFloor: -2,
				targetFloor: 2,
			},
			{}
		);

		expect(locationElement).toBeInTheDocument();
		expect(locationElement).toHaveTextContent(/location : 2/i);
	});

	it('should not set lift location', async () => {
		mockedAxios.post.mockRejectedValueOnce({
			data: {},
			status: 201,
			statusText: '',
			headers: {},
			config: {},
		});

		const user = userEvent.setup();
		const alertContainer = document.createElement('div');
		alertContainer.setAttribute('id', 'alert');

		render(
			<LiftCard id={6} name={'Lift test'} currentLocation={0} minFloor={-2} maxFloor={8} />,
			{
				container: document.body.appendChild(alertContainer),
			}
		);

		const submitElement = screen.getByRole('button', { name: /travel/i });
		const locationElement = screen.getByText(/location : 0/i);

		// Initial Test
		expect(locationElement).toBeInTheDocument();

		// Send request
		await act(async () => {
			await user.click(submitElement);
		});

		expect(mockedAxios.post).toHaveBeenCalledTimes(1);
		expect(mockedAxios.post).toHaveBeenCalledWith(
			config.API_URL + ApiPaths.TRAVELS,
			{
				liftID: 6,
				sourceFloor: -2,
				targetFloor: -2,
			},
			{}
		);

		expect(locationElement).toBeInTheDocument();
		expect(locationElement).toHaveTextContent(/location : 0/i);
	});
});
