export const getAllNumbersBetween = (min: number, max: number): number[] => {
	const numbers = [];

	for (let i = min; i < max + 1; i++) {
		numbers.push(i);
	}

	return numbers;
};

export const getFormData: (form: HTMLFormElement) => { [k: string]: FormDataEntryValue } = (
	form
) => {
	const formData: FormData = new FormData(form);
	return Object.fromEntries(formData);
};
