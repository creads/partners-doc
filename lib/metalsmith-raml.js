
var path = require('path');
var basename = path.basename;
var debug = require('debug')('metalsmith-raml');
var dirname = path.dirname;
var extname = path.extname;
var async = require('async');
var merge = require('merge');
var raml2obj = require('raml2obj');
var Q = require('q');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to convert raml files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin(options) {
  options = options || {};

  return function(files, metalsmith, done) {

    async.eachSeries(Object.keys(files), function run(file, done) {
      if (!isRaml(file)) {
        done();
        return;
      }
      var data = files[file];
      var dir = dirname(file);
      var html = basename(file, extname(file)) + '.html';
      if ('.' != dir) html = dir + '/' + html;

      var cwd = process.cwd();

      if (options.templatesPath) {
        options.templatesPath = path.relative(metalsmith.source(), path.join(cwd, options.templatesPath));
      }

      process.chdir(metalsmith.source());
      var config = getDefaultConfig(options.mainTemplate?options.mainTemplate:null, options.templatesPath?options.templatesPath:null, metalsmith.metadata());

      render(data.contents.toString(), config).then(
        function(output) {
          data.contents = new Buffer(output);
          files[html] = data;
          process.chdir(cwd);
          done();
        },
        function(error) {
          console.log(error)
          // var simplifyMark = function(mark) {
          //   if (mark) mark.buffer = mark.buffer.split('\n', mark.line + 1)[mark.line].trim();
          // }
          // simplifyMark(error.context_mark);
          // simplifyMark(error.problem_mark);
          // console.log("ERROR:\n"+JSON.stringify(error, null, 2));
          process.chdir(cwd);
          done();
        }
      );

      delete files[file];
      // process.chdir(cwd);

    }, done);
  }
}

/**
 * Render the source RAML object using the config's processOutput function
 *
 * The config object should contain at least the following property:
 * processRamlObj: function that takes the raw RAML object and returns a promise with the rendered HTML
 *
 * @param {(String|Object)} source - The source RAML file. Can be a filename, url, contents of the RAML file,
 * or an already-parsed RAML object.
 * @param {Object} config
 * @param {Function} config.processRamlObj
 * @returns a promise
 */
function render(source, config) {
  config = config || {};

  return raml2obj.parse(source).then(function(ramlObj) {
    ramlObj.config = config;

    if (config.processRamlObj) {
      return config.processRamlObj(ramlObj).then(function(html) {
        if (config.postProcessHtml) {
          return config.postProcessHtml(html);
        }

        return html;
      });
    }

    return ramlObj;
  });
}

/**
 * @param {String} [mainTemplate] - The filename of the main template, leave empty to use default templates
 * @param {String} [templatesPath] - Optional, by default it uses the current working directory
 * @returns {{processRamlObj: Function, postProcessHtml: Function}}
 */
function getDefaultConfig(mainTemplate, templatesPath, metadata) {
  if (!mainTemplate) {
    mainTemplate = './lib/template.nunjucks';

    // When using the default template, make sure that Nunjucks isn't
    // using the working directory since that might be anything
    templatesPath = __dirname;
  }

  if (!metadata) {
    metadata = {};
  }

  return {
    processRamlObj: function(ramlObj) {
      var nunjucks = require('nunjucks');
      var markdown = require('nunjucks-markdown');
      var marked = require('marked');
      var renderer = new marked.Renderer();
      renderer.table = function(thead, tbody) {
        // Render Bootstrap style tables
        return '<table class="table"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table>';
      };

      // Setup the Nunjucks environment with the markdown parser
      var env = nunjucks.configure(templatesPath, {watch: false});
      markdown.register(env, function(md) {
        return marked(md, {renderer: renderer});
      });

      // Add extra function for finding a security scheme by name
      ramlObj.securitySchemeWithName = function(name) {
        return ramlObj.securitySchemes[0][name];
      };

      ramlObj = merge(ramlObj, metadata);

      // Render the main template using the raml object and fix the double quotes
      var html = env.render(mainTemplate, ramlObj);
      html = html.replace(/&quot;/g, '"');

      // Return the promise with the html
      return Q.fcall(function() {
        return html;
      });
    },

    // postProcessHtml: function(html) {
    //   // Minimize the generated html and return the promise with the result
    //   var Minimize = require('minimize');
    //   var minimize = new Minimize({quotes: true});

    //   var deferred = Q.defer();

    //   minimize.parse(html, function(error, result) {
    //     if (error) {
    //       deferred.reject(new Error(error));
    //     } else {
    //       deferred.resolve(result);
    //     }
    //   });

    //   return deferred.promise;
    // }
  };
}


/**
 * Check if a `file` is raml.
 *
 * @param {String} file
 * @return {Boolean}
 */
function isRaml(file){
  return /\.raml|\.rml/.test(extname(file));
}