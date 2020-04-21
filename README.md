<br>

<p>
  Electron-poc project uses Boilerplate for stable developing:
  https://github.com/electron-react-boilerplate/electron-react-boilerplate
<br>
  For PDF view and render to text uses PDF.js:
  https://mozilla.github.io/pdf.js/

</p>

## Install

First, clone the repo via git

And then install the dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
$ yarn start in new window
```

Change code at app/ and app will rerender
<br/>

## Build

**Windows:**

```bash
$ yarn build:win
```

<br/>

**Linux:**

```bash
$ yarn build:linux
```

P.S. <br/>
For linux build use Linux. Other OS give error.
<br/>

**MacOS:**

```bash
$ build:mac
```

<p>
By default build for current platform and current arch. Use CLI flags --mac, --win, --linux to specify platforms. And --ia32, --x64 to specify arch.
For example, to build app for MacOS, Windows and Linux:

```bash
$ electron-builder -mwl
```

More information:
https://www.electron.build/multi-platform-build

</p>
