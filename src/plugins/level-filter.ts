import type { LoggerContext, LoggerMethod, LoggerPlugin } from '@/.';

export enum LogLevel {
	Trace = 0,
	Debug = 1,
	Info = 2,
	Warning = 3,
	Error = 4,
	Off = 5,
}

const methodLevels: Record<LoggerMethod, LogLevel> = {
	trace: LogLevel.Trace,
	debug: LogLevel.Debug,
	info: LogLevel.Info,
	log: LogLevel.Info, // log is of the same level of info
	warn: LogLevel.Warning,
	error: LogLevel.Error,
};

function createLevelFilter(minLevel: LogLevel): LoggerPlugin {
	const levelFilterPlugin: LoggerPlugin = (ctx: LoggerContext) => {
		const messageLevel = methodLevels[ctx.method];

		if (messageLevel < minLevel) {
			ctx.args = [];
			return 'abort';
		}
		return undefined;
	};

	return levelFilterPlugin;
}

export const levelFilter = createLevelFilter;
