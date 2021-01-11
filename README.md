# IFTTHA

A IFTTT for [Home Assistant](https://www.home-assistant.io/), in your browser. **Still heavily work in progress!**

## Installation

### Prerequisites

IFTTHA uses Home Assistant's [REST API](https://developers.home-assistant.io/docs/api/rest) to communicate with your instance of Home Assistant. Before we start automating from the browser, make sure that your setup reflects the following:

- A Home Assistant instance is running on a machine that is reachable from the browser machine's network
- You have created a valid [long-lived access token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token)

### Firefox (WIP)

- Download the latest version as .xpi file
- Install the extension [from file](https://support.mozilla.org/en-US/kb/unable-install-add-ons-extensions-or-themes#w_you-are-asked-to-download-the-add-on-rather-than-installing-it)

## Develop

Install dependencies

```sh
yarn
```

Start developing:

```sh
yarn dev
```

The command above:

- Builds and bundles the extension source using [Parcel](https://parceljs.org); the output goes to `dist/` directory
- Opens the browser using [`web-ext`](https://github.com/mozilla/web-ext), watching for file changes automatically

### See also

- [Getting started with web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext)
