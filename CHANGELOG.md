# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2025-07-03

### Changed

- Renamed package from `jslog` to `@geezgus/jslog`.

### Added

- Initial release of `jslog`.
- Core logger with `trace`, `debug`, `info`, `log`, `warn`, and `error` methods.
- Plugin system to extend the logger's functionality.
- `timestamp` plugin to add a timestamp to log messages.
- `levelFilter` plugin to filter log messages based on their severity level.
