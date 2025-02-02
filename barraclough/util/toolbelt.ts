export const sortByKey = <T extends Record<string, any>>(obj: T): T =>
	Object.fromEntries(
		Object.entries(obj).sort(([k1, _], [k2, __]) => k1.localeCompare(k2))
	) as T;
