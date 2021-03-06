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
  metalsmithPrism = require('metalsmith-prism'),
  path = require('path')
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
Metalsmith(__dirname)
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
  .clean(true)
  .build(function(err) {
    if (err) throw err;

    // copy assets
    Metalsmith(__dirname)
      .source('assets/')
      .use(ignore([
        '**/.DS_Store'
      ]))
      .destination('docs/')
      .clean(false)
      .build(function(err) {
        if (err) throw err;
      })
    ;

    // prismjs copy
    Metalsmith(__dirname)
      .source(path.join(__dirname, '/node_modules/prismjs/themes/'))
      .use(ignore([
        '**/.DS_Store'
      ]))
      .destination('docs/css/highlight/')
      .clean(false)
      .build(function(err) {
        if (err) throw err;
      })
    ;
  })
;

//raml generator
Metalsmith(__dirname)
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
  .clean(false)
  .build(function(err) {
    if (err) throw err;
  })
;
