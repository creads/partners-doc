var Metalsmith = require('metalsmith'),
  metadata = require('metalsmith-metadata'),
  collections = require('metalsmith-collections'),
  markdown = require('metalsmith-markdown'),
  permalinks = require('metalsmith-permalinks'),
  headingsidentifier = require('metalsmith-headings-identifier'),
  layouts = require('metalsmith-layouts'),
  ignore = require('metalsmith-ignore'),
  merge = require('merge'),
  raml = require('./lib/metalsmith-raml.js'),
  metalsmithPrism = require('metalsmith-prism')
;

var metadata = {
  base_dir: '/partners-doc',
  site_title: 'Documentation Creads Partners',
  section_menu: {
    '/': 'API',
    '/references': 'Références API'
  },
  section_title: null,
  current_section : null
};

// markdown generator
var metalsmith = Metalsmith(__dirname)
  .source('src/')
  .use(ignore([
    'references/**',
    '**/.DS_Store'
  ]))
  .metadata(merge(metadata, {
    section_title: 'Documentation API',
    current_section: '/'
  }))
  .use(collections())
  .use(markdown({ langPrefix: 'language-' }))
  .use(metalsmithPrism({
    preLoad: ["markup-templating"]
  }))
  .use(permalinks({
    pattern: ":collection/:title"
  }))
  .use(headingsidentifier())
  .use(layouts({
    "engine": "nunjucks",
    "directory": "./templates",
    "default": "page.nunjucks"
  }))
  .destination('docs/')
  .build(function(err) {
    if (err) throw err;
  })
;

//raml generator
var metalsmith = Metalsmith(__dirname)
  .source('src/references')
  .use(ignore([
    '**/*.json',
    '**/*.pdf',
    '**/*.png',
    '**/.DS_Store'
  ]))
  .metadata(merge(metadata, {
    section_title: 'Références API',
    current_section: '/references'
  }))
  .use(raml({
    templatesPath: 'templates/',
    mainTemplate: 'raml.nunjucks'
  }))
  .use(metalsmithPrism())
  .use(function(files, metalsmith, done) {
    files['index.html'] = files['api.html']
    delete(files['api.html']);
    done();
  })
  .destination('docs/references')
  .build(function(err) {
    if (err) throw err;
  })
;

