import type { LoggerContext, LoggerPlugin } from '@/.';

export type TimestampStyle = 'iso' | 'utc';

function getFormattedTimestamp(style: TimestampStyle): string {
	const date = new Date();

	switch (style) {
		case 'iso':
			return date.toISOString();
		case 'utc':
			return date.toUTCString();
		default:
			throw new Error(`Unsupported timestamp style: ${style}`);
	}
}

function createTimestampPlugin(style: TimestampStyle): LoggerPlugin {
	const timestampPlugin: LoggerPlugin = (ctx: LoggerContext) => {
		const timestamp = getFormattedTimestamp(style);
		ctx.args.unshift(`[${timestamp}]`);
		return undefined;
	};

	return timestampPlugin;
}

export const timestamp = createTimestampPlugin;
