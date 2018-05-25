# NASA Rovers

## What is this?

It's a recruitment task that was given to me by one of the companies I applied to.
They basically said "find yourself an API and create an app for it", so I
made an app that demonstrates photos taken by NASA's Mars rovers.

## Installation

`npm install`

## Configuration

No configuration is strictly required thanks to provided defaults, although it's strongly encouraged to supply your own NASA API key due to [demo key limitations](https://api.nasa.gov/api.html#demo_key-rate-limits). Obtaining one takes one minute and can be done at [NASA's website](https://api.nasa.gov/index.html#apply-for-an-api-key).
You can supply your API key using `NASA_API_KEY` environment variable. Simply export that variable or create `.env` file copying from `.env.template` in application's root directory.

## Running

* `npm run start:dev` for development mode (port 8080)
* `npm run start:prod` for production mode (port 3000, overridable by `PORT` env var)

## Usage

Soon after the app boots up you'll see a timeline of rovers' activity on Mars. Click on the timeline to get photos for a particular day.

## Quality assurance during development

This project uses slightly modified ESLint configuration by AirBnB and Jest tests to ensure code quality. Checks are performed automatically before each commit.

## Ideas for further development

This project is a prototype and there is a lot of room for further development. Some of the ideas:

* More robust error handling
* More tests coverage
* Caching (could be done by Service Worker, including both assets and idempotent API calls)
* Timeline state reflected in the URL
* Server-side rendering
* Photo zoom-in
* etc. :)
