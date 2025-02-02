const hasTimeZoneName = (v: Record<any, any>): v is { timeZoneName: string } => {
  return 'timeZoneName' in v && typeof v.timeZoneName === 'string';
}

type IntlParts<T extends Intl.DateTimeFormatOptions> = {
  [P in keyof T]: P extends 'timeZoneName' ? string | T[P]: T[P];
}

const getIntlParts = <T extends Intl.DateTimeFormatOptions>(
	d: Date,
	options: T
): IntlParts<T> => {
	const sharedOptions = {
		...(options.hour12 !== undefined ? { hour12: options.hour12 } : {}),
		...(options.timeZone !== undefined
			? { timeZone: options.timeZone }
			: {}),
	};
	// console.log({ sharedOptions });
	const parts = Object.keys(options).reduce((acc, k) => {
		const v = Intl.DateTimeFormat("en-US", {
			[k]: options[k as keyof T],
			...sharedOptions,
		}).format(d);
		acc[k as keyof T] = v as IntlParts<T>[keyof T];
		return acc;
	}, {} as IntlParts<T>);
	if (hasTimeZoneName(parts)) {
		parts.timeZoneName = parts.timeZoneName.split(" ")[1];
	}
	return parts;
};

export const getDisplayDate = (d: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "America/New_York",
		timeZoneName: "short",
		hour: "numeric",
		minute: "numeric",
		hour12: false,
	};
	// const fmt = Intl.DateTimeFormat('en-US', options);
	const parts = getIntlParts(d, options);
	return `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year} ${parts.hour}:${parts.minute} (${parts.timeZoneName})`;
};