Modern WebDev
=============

TODO
----

1. test debugger for chrome (vscode)
1. test debugger for phantomjs (vscode)
1. tests with html
1. review documentation
1. zip dist
1. iterate on ui
    1. bootstrap tour
    1. ngAnimate the dex two searches
    1. filter icon in search bar

Stretch Goals
-------------

1. review pokedex module (pokemon / team), it was all copypasta
1. load vendor libs with requires, not static on page
1. package data/*.json into a data requirejs lib
1. remove eslint-plugin-requirejs, why not just use env: amd: true
1. prune node packages
1. split utilsModule into multiple files

What's in the project
---------------------

### Build Pipeline

<dl>
<dt>gulp, gulp-*</dt>
<dd>we kind of need a gulp plugin for everything, that's probably the biggest drawback</dd>
<dd>need to learn how to write gulp plugins if we are going to do this</dd>
<dt>gulp-amd-optimizer, gulp-uglify, gulp-sourcemaps</dt>
<dd>we are using requirejs, but requirejs is a ui library</dd>
<dd>requirejs has some build tools, but they don't integrate naturally with gulp</dd>
<dt>express, gulp-live-server</dt>
<dd>express is something you can configure and launch directly from node (e.g. `node server.js`)</dd>
<dd>gulp-live-server is a gulp wrapper around gulp-express (I guess they renamed it?)</dd>
<dd>we want this for arbitrary webdev, and will live the target, but hopefully we can convery json to requirejs loading</dd>
<dt>karma, karma-*</dt>
<dd>test runner, runs js in actual browser</dd>
<dd>plugins for coverage, multiple browsers, requirejs, jasmine</dd>
</dl>

### UI Libraries

<dl>
<dt>jquery</dt>
<dd>jquery is at the heart of everything in the ui</dd>
<dt>boostrap, bootswatch</dt>
<dd>boostrap uses semantic markup and styles it</dd>
<dd>bootswatch is a collection of predefined styles for bootstrap</dd>
<dt>angular, angular-route</dt>
<dt>angular-local-storage</dt>
<dd>not officially by angular</dd>
<dd>has some nice interactions with local storage, defaults to cookies</dd>
<dd>just all around nicer to work with than raw local storage</dd>
<dt>requirejs, requirejs-plugins, requirejs/text</dt>
<dd>dependency loading</dd>
<dd>requirejs by default only supports loading js, plugins allow us to load other types of data</dd>
</dl>


VSCode plugins
--------------

### Dev Tools

<dl>
<dt>Debugger for Chrome, Debugger for Edge, Debugger for Firefox, Debugger for PhantomJS</dt>
<dd>VSCode integration with browsers</dd>
<dd>PhantomJS is always a contentious point, but if we can make first-pass testing quicker, then it's worthwhile</dd>
<dd>There isn't an debugger for</dd>
<dt>ESLint</dt>
<dd>always-running eslint</dd>
<dd>it's part of the build pipeline, but it's nice to have immediate feedback in context</dd>
<dt>HTMLHint</dt>
<dt>Python</td>
<dt>Beautify</dt>
<dt>Java Extension Pack</dt>
<dt>PowerShell</dt>
</dl>

### IDE Tools

<dl>
<dt>fire-icons</dt>
<dd>more icons for more file types</dd>
<dt>gitignore</dt>
<dd>we can dream</dd>
<dd>our project may use different scm, but side projects and the like may use git</dd>
<dt>Nord</dt>
<dt>Rainbow Brackets</dt>
<dt>Rainbow CSV</dt>
<dt>Intellisense for CSSS in HTML</dt>
</dl>
