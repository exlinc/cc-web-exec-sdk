# Coding Rooms Web Exec SDK for iframes

SDK for building and communicating with web execution environments that are embedded as iframes in Coding Rooms

## Usage

First get the distribution: `npm install @exlinc/cc-web-exec-sdk`

All web exec implementations, should create a single instance of `CCWebExecClient` in their iframe and then implement their event listeners/senders on that instance.

For an example implementation in plain JS:

* `examples/js-demo/iframe.html` >>> This is an example implementation of `CCWebExecClient` (probably what you need)

* `examples/js-demo/index.html` >>> This is an example implementation of the `CCWebExecManager` for example/testing purposes ONLY. This is implemented by Coding Rooms -- your app only needs to implement the client-side of this framework. 

To play with the JS example, load `examples/js-demo/index.html` in your browser. It uses a relative path to load in the iframe.

A CDN for plain JS implementations/demos is available via UNPKG: `https://unpkg.com/@exlinc/cc-web-exec-sdk@1.0.6/dist/cc-web-exec-sdk.js` (not really recommended for production; better to package yourself)

## TypeScript Usage

The simplest+safest way to implement this library for production use is via the TypeScript interface. Types are provided in the NPM distribution. 

## Supported Event Types

A list of the supported event types are available here: `src/consts.ts`

A list of the supported event payloads are available here: `src/models.ts`

## Development Setup

```
git clone https://github.com/exlinc/cc-web-exec-sdk
cd cc-web-exec-sdk
npm install
```

## Building

The build step places `cc-web-exec-sdk.js` into the `dist/` directory of the project. This is the only required output bundle.

```
npm run build
```

## Publish to NPM

`npm publish`
