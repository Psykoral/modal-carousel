FlippyUI - modal-carousel
====
Build Status:
- master: [![Build Status](https://travis-ci.org/Psykoral/modal-carousel.svg?branch=master)](https://travis-ci.org/Psykoral/modal-carousel)

Project template built from FlippyUI. modal-carousel includes:

- A Git Clone from [FlippyUI Grunt starter kit](https://github.com/Psykoral/grunt-starter-kits)
- Project specific Grunt runner.
- bower.json and package.json for common dependencies.
- AMD Javascript sources specific to modal-carousel.
- Reference Design Library: http://flippydisk.com/

## Local Development

### TODO

- JSDoc
- Jasmine tests

### Prerequisites

* Install [Git](https://git-scm.com/)
* Install [NodeJS](https://nodejs.org) >=4
* Install [Grunt](http://gruntjs.com/getting-started) ~1.0.1

		npm install -g grunt-cli

* Install [Bower](http://bower.io/)

		npm install -g bower

* Install [PhantomJS](http://phantomjs.org/download.html)

		npm install -g phantomjs-prebuilt

### Running modal-carousel

* Clone modal-carousel
	<pre>git clone https://github.com/Psykoral/modal-carousel.git</pre>
* Run all NPM and Bower items
	<pre>./update.sh</pre>
	* Windows users run this with GitBash.exe
	* *nix & Mac users you might need to chmod +x this file to allow it to be executable.
* <pre>grunt live</pre>
	* Runs the Example site
* <pre>grunt jsdoc</pre>
	* Runs JSDoc API documentation
	* Run after 'grunt live', keep that server running then go to http://localhost/jsdoc/
* <pre>grunt test</pre>
	* Runs Jasmine tests in the console (also runs on 'grunt live')
* <pre>grunt livetests</pre>
	* Runs Jasmine tests in a browser

Distribution Package
-------
The distribution package is the end result of building this project:

    dist/
    - .htaccess
    - index.html
    - jsdoc.json
    ├── css/
       ├── modal-carousel.css
       ├── modal-carousel.min.css
    ├── js/
       ├── modal-carousel.js
       ├── modal-carousel.min.js
    ├── img/
       ├── favicon.ico
       ├── left.png
       ├── logo.png
       ├── right.png

Community
-------

Want to use FlippyUI? See our [Contributing](https://github.com/Psykoral/modal-carousel/blob/master/CONTRIBUTING.md) documentation.

Developed under the [MIT License](https://github.com/Psykoral/modal-carousel/blob/master/LICENSE.txt).
