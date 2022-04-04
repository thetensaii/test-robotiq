import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import config from 'config';
import { ApiPaths } from 'utils/api';
import { Home } from './Home';
import { LiftProps } from 'utils/props/LiftProps';
import { act } from 'react-dom/test-utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home page component tests', () => {
	it('should renders Home page', () => {
		mockedAxios.get.mockResolvedValueOnce({
			data: [],
			status: 200,
			statusText: '',
			headers: {},
			config: {},
		});
		let container;

		render(<Home />);

		expect(container).toMatchSnapshot();
	});

	it('should renders title', () => {
		mockedAxios.get.mockResolvedValueOnce({
			data: [],
			status: 200,
			statusText: '',
			headers: {},
			config: {},
		});

		render(<Home />);

		const titleElement = screen.getByRole('heading', { name: /robotiq test/i });
		expect(titleElement).toBeInTheDocument();
	});

	it('should renders subtitle', () => {
		mockedAxios.get.mockResolvedValueOnce({
			data: [],
			status: 200,
			statusText: '',
			headers: {},
			config: {},
		});
		act(() => {
			render(<Home />);
		});

		const titleElement = screen.getByRole('heading', { name: /lifts/i });
		expect(titleElement).toBeInTheDocument();
	});

	it('should not renders LiftCard', async () => {
		mockedAxios.get.mockResolvedValueOnce({
			data: [],
			status: 200,
			statusText: '',
			headers: {},
			config: {},
		});

		render(<Home />);

		const liftsElement = screen.queryAllByRole('button', { name: /travel/i });
		expect(mockedAxios.get).toHaveBeenCalledTimes(1);
		expect(mockedAxios.get).toHaveBeenCalledWith(config.API_URL + ApiPaths.LIFTS, {});

		expect(liftsElement.length).toBe(0);
	});

	it('should renders multiple LiftCard', async () => {
		const lifts: LiftProps[] = [
			{ id: 1, name: 'Lift a', currentLocation: 0, minFloor: -2, maxFloor: 5 },
			{ id: 2, name: 'Lift b', currentLocation: 0, minFloor: -2, maxFloor: 5 },
			{ id: 3, name: 'Lift c', currentLocation: 0, minFloor: -2, maxFloor: 5 },
		];

		mockedAxios.get.mockResolvedValueOnce({
			data: lifts,
			status: 200,
			statusText: '',
			headers: {},
			config: {},
		});

		render(<Home />);

		const liftsElement = await screen.findAllByRole('button', { name: /travel/i });

		expect(mockedAxios.get).toHaveBeenCalledTimes(1);
		expect(mockedAxios.get).toHaveBeenCalledWith(config.API_URL + ApiPaths.LIFTS, {});

		expect(liftsElement.length).toBe(3);
	});
});
