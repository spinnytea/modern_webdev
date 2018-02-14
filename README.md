Modern WebDev
=============

TODO
----

1. document VSCode extensions (why do they do for us)
1. document package.json (what do we do, which packages are involved)
1. write a gulp plugin (like, a styleguide lint, or a bootstrap markup lint)
1. write sample project, document which packages are for which parts
1. test debugger for chrome
1. test debugger for phantomjs


What's in the project
---------------------

### Build Pipeline

<dl>
<dt>gulp, gulp-*</dt>
<dd>we kind of need a gulp plugin for everything, that's probably the biggest drawback</dd>
<dd>need to learn how to write gulp plugins if we are going to do this</dd>
<dt>amd-optimizer</dt>
<dd>we are using requirejs, but requirejs is a ui library</dd>
<dd>requirejs has some build tools, but they don't integrate naturally with gulp</dd>
</dl>

### UI Libraries

<dl>
<dt>jquery</dt>
<dd>jquery is at the heart of everything in the ui</dd>
<dt>boostrap, bootswatch</dt>
<dd>boostrap uses semantic markup and styles it</dd>
<dd>bootswatch is a collection of predefined styles for bootstrap</dd>
<dt>angular, angular-route</dt>
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
<dt>Python</td>
</dl>

### IDE Tools

<dl>
<dt>fire-icons</dt>
<dd>more icons for more file types</dd>
<dt>gitignore</dt>
<dd>we can dream</dd>
<dd>our project may use different scm, but side projects and the like may use git</dd>
<dt>Nord</dt>
<dt>Rainbow CSV</dt>
</dl>
