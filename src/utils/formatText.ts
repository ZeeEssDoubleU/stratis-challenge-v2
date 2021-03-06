import { upperFirst } from 'lodash';

// ************
// functions
// ************

export const titleCase = (string: string) =>
	string.split(" ").map(upperFirst).join(" ")
