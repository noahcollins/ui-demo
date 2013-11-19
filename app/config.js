// This is the runtime configuration file. It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
  paths: {
    // Map vendor dependencies for easy access.
    "vendor": "../vendor",

    // Almond lightens the output filesize.
    "almond": "../vendor/bower/almond/almond",

    // Lo-Dash Underscore compatibility build instead of underscore.
    "underscore": "../vendor/bower/lodash/dist/lodash.underscore",
    "jquery": "../vendor/bower/jquery/jquery",
    "backbone": "../vendor/bower/backbone/backbone"
  },

  shim: {
    // Ensures Backbone works as expected within the AMD environment.
    "backbone": {
      // The two hard dependencies that will be loaded first.
      deps: ["jquery", "underscore"],

      // Map the global `Backbone` object to `require("backbone")`.
      exports: "Backbone"
    }
  }
});
