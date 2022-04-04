import React from 'react';

export type OptionProps = {
	value: string | number;
	label: string | number;
};

type SelectProps = {
	name: string;
	options: OptionProps[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = ({ name, options, ...rest }) => {
	return (
		<select id={name} name={name} {...rest}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};
