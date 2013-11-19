UI Demo
====================

This project started as a fork of the excellent Backbone Boilerplate project. It inherits many of the same defaults regarding Backbone, Lo-Dash (Underscore compatibility build), jQuery, RequireJS, Bower, Grunt, Karma, and Jasmine.

I've added some additional Grunt tasks and configuration to match my design and prototyping workflow. Less preprocessor, css autoprefixer, file watcher and livereload, image minification, responsive images, git hooks, assett revving, and modernizr.

## Getting started ##

You will need to download and install [Node.js](http://nodejs.org/) if you want
to use the commands in the following sections.

## Updating dependencies ##

Third party packages may update independently from this main repo, so it's a
good idea to update after fetching.

``` bash
# Install global dependencies.  Depending on your user account you may need to
# gain elevated privileges using something like `sudo`.
npm i -gq grunt-cli bower

# Optionally install coveralls (integration is baked in with Travis CI).
npm i -gq coveralls

# Install NPM dependencies.
npm i -q

# Install Bower dependencies.
bower i -s
```

## Build process ##

The build process consists of numerous Grunt plugin tasks that work together
to optimize the build.

``` bash
# To run the build process, run the default Grunt task.
grunt

# Run a build and test the now optimized assets.
grunt default server:release
```

## Running tests ##

To run tests, simply add `.spec.js` files throughout the application and they
will be automatically picked up by the runner.  You can find example test specs
in the `test` directory.

To run Karma as a daemon:
*Which will automatically run your tests after you save.*

``` bash
grunt karma:daemon
```

To run Karma tests once and output the results:

``` bash
grunt karma:run
```

After either above command is run, code coverage reports will be available in
the `test/coverage` folder.

By default, the test runner is Mocha and Chai.  You can easily change this by
editting the commented regions of the karma configuration in `Gruntfile.js`.

## License ##
Copyright © 2013 Noah Collins (@itofin)  
Licensed under the MIT license.
