export type LoggerMethod = 'debug' | 'error' | 'info' | 'log' | 'trace' | 'warn';
export type LoggerContext = {
	method: LoggerMethod;
	args: unknown[];
};

export type LoggerPlugin = (ctx: LoggerContext) => 'abort' | undefined;
export type LoggingFunction = (...args: unknown[]) => void;
export type Logger = Record<LoggerMethod, LoggingFunction> & {
	use: (plugin: LoggerPlugin) => Logger;
};

export const createLogger = (plugins: LoggerPlugin[] = []): Logger => {
	const run = (ctx: LoggerContext) => {
		for (const plugin of plugins) {
			if (plugin(ctx) === 'abort') return false;
		}
		return true;
	};

	const logger: Logger = {
		use: (plugin) => {
			return createLogger([...plugins, plugin]);
		},

		debug: (...args) => {
			const ctx: LoggerContext = { method: 'debug', args };
			if (run(ctx)) console.debug(...ctx.args);
		},

		error: (...args) => {
			const ctx: LoggerContext = { method: 'error', args };
			if (run(ctx)) console.error(...ctx.args);
		},

		info: (...args) => {
			const ctx: LoggerContext = { method: 'info', args };
			if (run(ctx)) console.info(...ctx.args);
		},

		log: (...args) => {
			logger.info(...args);
		},

		trace: (...args) => {
			const ctx: LoggerContext = { method: 'trace', args };
			if (run(ctx)) console.trace(...ctx.args);
		},

		warn: (...args) => {
			const ctx: LoggerContext = { method: 'warn', args };
			if (run(ctx)) console.warn(...ctx.args);
		},
	};

	return logger;
};

export const logger = createLogger();
