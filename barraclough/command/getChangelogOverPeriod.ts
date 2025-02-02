import { App, Editor, MarkdownView } from "obsidian";

interface RegExpArrayWithGroups extends RegExpExecArray {
	groups: { [key: string]: string };
}
const hasGroups = (v: RegExpExecArray): v is RegExpArrayWithGroups =>
	v.groups !== undefined;

type HourMinuteGroup = {
	hour: string;
	minute: string;
};
type HourMinute = {
	hour: number;
	minute: number;
};
type Period = {
  start: Date;
  end: Date;
}

const isHourMinuteGroup = (
	v: Record<PropertyKey, unknown>
): v is HourMinuteGroup => {
	if (!("hour" in v) || !("minute" in v)) {
		return false;
	}
	if (typeof v.hour !== "string" || typeof v.minute !== "string") {
		return false;
	}
	return true;
};

const isValidHourMinuteValue = (v: number): boolean => v >= 0 && v <= 59;

const parseHourMinute = (m: RegExpExecArray): HourMinute => {
	if (!hasGroups(m)) {
		throw new Error("Match does not have groups");
	}
	if (!isHourMinuteGroup(m.groups)) {
		throw new Error("Match groups do not have hour and minute");
	}
	const res = {
		hour: parseInt(m.groups.hour),
		minute: parseInt(m.groups.minute),
	};
	if (!isValidHourMinuteValue(res.hour) || !isValidHourMinuteValue(res.minute)) {
		throw new Error("Invalid hour or minute");
	}
	console.log("parseHourMinute", { res });
	return res;
};

const parsePeriod = (v: string) => {
	const p = /(?<hour>\d{2})[^\d]*(?<minute>\d{2})/g;
  const ms = Array.from(v.matchAll(p));
  let hms: HourMinute[] = [];
  try {
    hms = ms.map(parseHourMinute);
    if (hms.length === 0) {
      throw new Error('No matches found');
    }
    const start = new Date();
    start.setHours(hms[0].hour);
    start.setMinutes(hms[0].minute);
    
    const end = new Date();
    if (hms.length > 1) {
      end.setHours(hms[1].hour);
      end.setMinutes(hms[1].minute);
    }

    if (start > end) {
      throw new Error('Start time is greater than end time');
    }
    return { start, end };
  } catch (err) {
    console.error("parsePeriod", {
			v,
			pattern: p,
      matches: ms,
      hms,
		});
		throw new Error(`Unable to parse period from ${v}: ${err}`);
  }
};

export async function getChangelogOverPeriod(
	app: App,
	editor: Editor,
	view: MarkdownView
) {
	const selection = editor.getSelection();
	console.log("getChangelogOverPeriod", { selection });
	try {
    const period = parsePeriod(selection);
    console.log("getChangelogOverPeriod", { period });
	} catch (e) {
		console.error("getChangelogOverPeriod | unable to parse period", { e });
		return;
  }
  
	editor.replaceSelection(selection);
}
