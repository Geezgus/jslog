# JsLog

**JsLog** (pronounced /ˈdʒəslɒɡ/), from "Just Log", is a simple, lightweight, and pluggable logger for JavaScript and TypeScript.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Features

-   **Simple and lightweight:** No dependencies and a small footprint.
-   **Pluggable:** Extend the logger's functionality with plugins.
-   **Multiple log levels:** Supports `trace`, `debug`, `info`, `log`, `warn`, and `error`.
-   **TypeScript support:** Written in TypeScript and includes type definitions.

## Installation

```bash
npm install @geezgus/jslog
```

## Usage

```typescript
import { logger } from 'jslog';

logger.info('Hello, world!');
// Output: Hello, world!

logger.error('This is an error message.');
// Output: This is an error message.
```

### With Plugins

JsLog's functionality can be extended with plugins. Here's an example of how to use the `timestamp` and `levelFilter` plugins:

```typescript
import { logger as baseLogger } from 'jslog';
import { levelFilter, LogLevel, timestamp } from 'jslog/plugins';

const logger = baseLogger
  .use(timestamp('utc'))
  .use(levelFilter(LogLevel.Info));

logger.info('This message has a timestamp.');
// Output: [Thu, 03 Jul 2025 12:00:00 GMT] This message has a timestamp.

logger.debug('This message will be filtered out.');
// Output:
```

## Plugins

JsLog's core is small and simple. All additional features are implemented as plugins.

### Included Plugins

-   `levelFilter`: Filters log messages based on their severity level.
-   `timestamp`: Adds a timestamp to the beginning of the log message.

### Creating a Plugin

A plugin is just a function that receives the logger's context as an argument. The context contains the log method (e.g., `info`, `error`) and the arguments passed to it.

Here's an example of a plugin that adds a prefix to all log messages:

```typescript
import { LoggerContext } from 'jslog';

const prefix = (text: string) => (ctx: LoggerContext) => {
  ctx.args.unshift(text);
};

const logger = baseLogger.use(prefix('[API]'));

logger.info('This is a message from the API.');
// Output: [API] This is a message from the API.
```

## Development

### Scripts

-   `npm run build`: Builds the project.
-   `npm run dev`: Runs the project in development mode.
-   `npm run lint`: Lints the source code.
-   `npm run format`: Formats the source code.

## License

This project is licensed under the MIT License.
