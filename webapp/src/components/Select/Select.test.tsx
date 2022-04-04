import React from 'react';
import { render, screen } from '@testing-library/react';
import { OptionProps, Select } from './Select';
import userEvent from '@testing-library/user-event';

describe('Select component tests', () => {
	it('should renders Select', () => {
		const options: OptionProps[] = [
			{
				value: 1,
				label: 'Test 1',
			},
			{
				value: 2,
				label: 'Test 2',
			},
			{
				value: 3,
				label: 'Test 3',
			},
		];
		const { container } = render(<Select name={'test'} options={options} />);
		expect(container).toMatchSnapshot();
	});

	it('should renders html select element', () => {
		const options: OptionProps[] = [
			{
				value: 1,
				label: 'Test 1',
			},
			{
				value: 2,
				label: 'Test 2',
			},
			{
				value: 3,
				label: 'Test 3',
			},
		];

		render(<Select name={'test'} options={options} />);

		const selectElement = screen.getByRole('combobox');

		expect(selectElement).toBeInTheDocument();
	});

	it('should renders html option element', () => {
		const options: OptionProps[] = [
			{
				value: 1,
				label: 'Test 1',
			},
		];

		render(<Select name={'test'} options={options} />);

		const optionElement: HTMLOptionElement = screen.getByRole('option');

		expect(optionElement).toBeInTheDocument();
		expect(optionElement).toHaveValue('1');
		expect(optionElement).toHaveTextContent(/test 1/i);
		expect(optionElement.selected).toBeTruthy();
	});

	it('should renders multiple html options elements', () => {
		const options: OptionProps[] = [
			{
				value: 1,
				label: 'Test 1',
			},
			{
				value: 2,
				label: 'Test 2',
			},
			{
				value: 3,
				label: 'Test 3',
			},
		];

		render(<Select name={'test'} options={options} />);

		const optionsElement = screen.getAllByRole('option');

		expect(optionsElement.length).toBe(3);
		expect(optionsElement[0]).toBeInTheDocument();
		expect(optionsElement[1]).toBeInTheDocument();
		expect(optionsElement[2]).toBeInTheDocument();
	});

	it('should change selected option', async () => {
		const user = userEvent.setup();
		const options: OptionProps[] = [
			{
				value: 1,
				label: 'Test 1',
			},
			{
				value: 2,
				label: 'Test 2',
			},
			{
				value: 3,
				label: 'Test 3',
			},
		];

		render(<Select name={'test'} options={options} />);

		const selectElement = screen.getByRole('combobox');
		const optionsElement: HTMLOptionElement[] = screen.getAllByRole('option');
		expect(optionsElement[0].selected).toBeTruthy();

		await user.selectOptions(selectElement, optionsElement[2]);
		expect(optionsElement[2].selected).toBeTruthy();
		expect(optionsElement[0].selected).toBeFalsy();
	});
});
