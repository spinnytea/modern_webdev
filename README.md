Modern WebDev
=============

This isn't a perfect example of modern web ui development, but given that there are so many different tools and frameworks, what is? This is one setup for developing a web ui application at the end of ES5, before HTML5 and ES6 become widespread.


Stretch Goals
-------------

1. build each *Module.js in it's own minified file - requirejs modules?
1. load vendor libs with requirejs, not static on page (the hard part is angular)
1. iterate on ui
    1. pokedex: uib-pagination
    1. wobbly animation (e.g. when hovering over buttons)
    1. update home page tour
    1. tour for each page
    1. description for each setting on the settings page
    1. sample/demo for each setting on the settings page
    1. keyboard shortcut to temporarily show tour-start icons
    1. standard ng-model-options config
        * maybe a module.constant path
        * maybe a service that provides objects by name
        * a directive that adds ng-model-options attr in pre-link
1. refactor dist/themes and dist/vendor/bootstrap (themes), they really don't need to be in vendor, it's okay
1. finish skipped tests & 100% coverage
1. finish code TODOs
1. lint config
    1. eslint-plugin-requirejs
    1. stylelint
    1. bootlint
    1. eslint-plugin-angular
1. read up on [aria](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
1. bootstrap tour + path does NOT work from the filesystem
    * tours on page do work
    * paths only work with `/#`, the don't work with just `#`
    * for now, disable the tourStart icon based on location protocol


What's in the project
---------------------

### RequireJS Config

When you add new libraries, you need to update the requirejs definition in these locations.
The specifics are documented in each file, this is just a starting point.

* `build_scripts/requirejs_data_config.js`
* `build_scripts/requirejs_src_config.js`
* `src/mainModule.js`
* `static/index.html`
* `test/karma.conf.js`
* `test/test-main.js`


Node Library Documentation
--------------------------

### Build Pipeline

<dl>
<dt>gulp, gulp-*, ansi-colors</dt>
<dd>we kind of need a gulp plugin for everything, that's probably the biggest drawback</dd>
<dd>that said, with the power of the internet, we have all the plugins we could want</dd>
<dd>and writing new plugins isn't difficult</dd>

<dt>requirejd</dt>
<dd>we are using require to package our javascript files</dd>

<dt>eslint, eslint-plugin-angular, eslint-plugin-requirejs</dt>
<dd>javascript linter, vscode plugin can use --fix option on save</dd>

<dt>stylelint, less, cleanCSS, scss2less, sourcemaps</dt>
<dd>less/css linter</dd>
<dd>less compiler -> css</dd>
<dd>css minification</dd>

<dt>htmlhint, bootlint, angular-templatecache</dt>
<dd>html linter, support for custom rules (read: styleguide linting)</dd>
<dd>bootstrap styleguide</dd>
<dd>minify html into js for angular (allows loading html partials from filesystem)</dd>

<dt>express, gulp-live-server</dt>
<dd>express is something you can configure and launch directly from node (e.g. `node server.js`)</dd>
<dd>gulp-live-server is a gulp wrapper around gulp-express (I guess they renamed it?)</dd>
<dd>we want this for arbitrary webdev, and will live the target, but hopefully we can convery json to requirejs loading</dd>

<dt>karma, karma-*</dt>
<dd>test runner, runs js in actual browser</dd>
<dd>plugins for coverage, multiple browsers, requirejs, jasmine</dd>

<dt>general</dt>
<dd>del - cleaning temp files</dd>
<dd>opn - open files/folders, launch browser at url</dd>
<dd>yargs - command line option parsing and help output</dd>
</dl>

### UI Libraries

<dl>
<dt>angular, angular-*</dt>
<dd>we are using angular as our ui library</dd>

<dt>angular-local-storage</dt>
<dd>angular plugin</dd>
<dd>has some nice interactions with local storage, defaults to cookies</dd>
<dd>just all around nicer to work with than raw local storage</dd>

<dt>angular-hotkeys</dt>
<dd>angular plugin</dd>
<dd>easy keyboard shortcuts</dd>

<dt>boostrap, bootswatch, bootstrap-solarized-theme</dt>
<dd>css reset, default styles</dd>
<dd>boostrap uses semantic markup and styles it</dd>
<dd>bootswatch is a collection of predefined styles for bootstrap</dd>
<dd>bootstrap-solarized-theme is a custom variables file for bootstrap</dd>

<dt>bootstrap-tour</dt>
<dd>guided tour baked into the ui</dd>

<dt>font-awesome</dt>
<dd>extensive set of standard ui icons</dd>

<dt>jquery</dt>
<dd>jquery is at the heart of everything in the ui (angular, bootstrap, requirejs)</dd>

<dt>lodash</dt>
<dd>brings functional programming to javascript</dd>
<dd>helpers and accelorators for common array/object/string functions that are not part of standard javascript</dd>

<dt>requirejs, requirejs-plugins, requirejs/text</dt>
<dd>dependency loading</dd>
<dd>requirejs by default only supports loading js, plugins allow us to load other types of data</dd>
</dl>

### Server Libraries

This project is meant to be client-only, so there isn't a mechanism to demo these.
But in the event we do write a node/server component, these are good things to have.
Maybe this will be the next project.

<dl>
<dt>bluebird</dt>
<dd>angular uses $q, and this simple app doesn't need much more</dd>
<dd>we may not need it with an upgraded node</dd>

<dt>cheerio</dt>
<dd>parsing html in node</dd>
<dd>your imagination is the limit</dd>

<dt>debug</dt>
<dd>sort of like log4j for node</dd>

<dt>express</dt>
<dd>gotta have a web server</dd>

<dt>gulp-mkdirp</dt>
<dd>this gets us mkdirp as well as gulp integration</dd>

<dt>strip-json-comments</dt>
<dd>json files are good for data</dd>
<dd>json files that are used for config need comments</dd>

<dt>socket.io</dt>
<dd>this application does not include a server component, so there's nothing to talk to</dd>

<dt>uuid</dt>
<dd>why generate you're own IDs when there's already a way to do that</dd>
</dl>


VSCode plugins
--------------

### Dev Tools

<dl>
<dt>Debugger for Chrome (by Microsoft), Debugger for Edge (by Microsoft), Debugger for Firefox (by Holgar Beni)</dt>
<dd>VSCode integration with browsers</dd>
<dd>PhantomJS is always a contentious point, but if we can make first-pass testing quicker, then it's worthwhile</dd>
<dd>There isn't an debugger for</dd>

<dt>ESLint (by Dirk Baeumer)</dt>
<dd>always-running eslint</dd>
<dd>it's part of the build pipeline, but it's nice to have immediate feedback in context</dd>

<dt>stylelint (by Shinnosuke Watanabe)</dt>
<dd>always-running stylelint</dd>
<dd>it's part of the build pipeline, but it's nice to have immediate feedback in context</dd>

<dt>HTMLHint (by Mike Kaufman)</dt>
<dd>always-running htmlhint</dd>
<dd>it's part of the build pipeline, but it's nice to have immediate feedback in context</dd>

<dt>Python (by Microsoft)</td>

<dt>Beautify (by HookyQR)</dt>
<dd>vscode uses js-beautify but doesn't honor a .jsbeautifyrc</dd>
<dd>this plugin overrides vscode so that it <em>does</em> honor .jsbeautifyrc</dd>
<dd>we are using eslint</dd>
<dd>this is just a precaution in case there are issues</dd>

<dt>Java Extension Pack (by Microsoft)</dt>
<dd>more java lanaguage support</dd>
<dd>This includes plugins: Debugger for Java, Java Test Runner, Maven for Java</dd>

<dt>PowerShell (by Microsoft)</dt>

<dt>Tomcat (by Wei Shen)</dt>
<dd>remote debugging for java/tomcat</dd>
</dl>

### IDE Tools

<dl>
<dt>file-icons (by file-icons)</dt>
<dd>more icons for more file types</dd>

<dt>gitignore (by CodeZombie)</dt>
<dd>we can dream</dd>
<dd>our project may use different scm, but side projects and the like may use git</dd>

<dt>Nord (by arcticicestudio)</dt>
<dd>another good ui theme</dd>

<dt>Rainbow Brackets (by 2gua)</dt>
<dd>helps you find errors in brackets</dd>
<dd>adds a splash of color to any theme you use</dd>
<dd>easy to disable if not needed</dd>

<dt>Rainbow CSV (by mechatroner)</dt>
<dd>colors columns for csv files, makes it easier to see like-columns</dd>
<dd>debugging csvs usually require opening in excel, this helps aleviate that need</dd>

<dt>IntelliSense for CSS class names in HTML (by Zignd)</dt>
<dd>intellisense is always good</dd>

<dt>vscode-language-todo (by fireyy)</dt>
<dd>vscode doesn't parse task tags, so we need an extension</dd>
<dd>this is the best one i could find, the UI isn't perfect, but it has the necessary functionality</dd>
<dd>
    <dl>
        <dt>TODO</dt><dd>standard task, something left unfinished or something new</dd>
        <dt>FIXME</dt><dd>high priority task, should be done before commiting, better to have it than to forget it</dd>
        <dt>XXX</dt><dd>low priority task, its better to do things when you think about them, but we always have to prioritize</dd>
        <dt>IDEA</dt><dd>new idea, start a discussion, can turn into a todo if it pans out</dd>
        <dt>HACK</dt><dd>when you do something wrong and aren't afraid to admit your faults, this code needs to be changed... but it does the job... for now; usually it violates some kind of rule, or it wont work in all situations</dd>
        <dt>REVIEW</dt><dd>sometimes you write something but just don't like it; it's not necessarily wrong nor needs to change, but you just want another set of eyes in case it is.</dd>
        <dt>BUG</dt><dd>there's a problem. maybe it's only under some conditions. this probably should be in a bug tracker, if you have one of those</dd>
        <dt>TEST</dt><dd>you found a new situation that needs to be tested, you should probably just stub out a spec instead; same with integration tests or use case tests. but not everyone knows everything, so at least they can write a comment that it needs to be done</dd>
        <dt>QUESTION</dt><dd>when you come across code that doesn't make sense and the comments don't explain it, write a question. hopefully someone will see it, and change the question to a proper comment.</dd>
    </dl>
</dd>
</dl>


External Tools
--------------

<dl>
<dt>FiraCode</dt>
<dd>Programmer Font</dd>

<dt>Node</dt>
<dd>node, npx(, npm)</dd>
<dd>Best not forget that</dd>

<dt>VSCode</dt>
<dd>IDE</dd>
</dl>
