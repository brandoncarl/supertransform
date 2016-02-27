/**

  supertransform
  Copyright 2016 Brandon Carl
  MIT Licensed

**/

var path      = require("path"),
    Pipemaker = require("pipemaker"),
    through   = require("through2"),
    Supertransform;


/**

  Universal loader for browserify.

  @param {String} content Content to progress.

**/

Supertransform = module.exports = function(file) {

  var ext = path.parse(file).ext.replace(/^\./, ""),
      chunks = [];

  // Add pipeline if necessary
  if (!Supertransform.pipelines.hasPipeline(ext))
    Supertransform.pipelines.addPipeline(ext);

  function transform(chunk, enc, next) {
    chunks.push(chunk);
    next();
  }

  function flush(next) {
    var stream = this,
        source = Buffer.concat(chunks).toString("utf8");
    Supertransform.pipelines.compile(ext, source, {}, function(err, compiled) {
      if (err) return next(err);
      stream.push(compiled);
      next();
    });
  }

  return through(transform, flush);

};


// Expose pipemaker object. This allows additional/removal of pipemaker, as well
// as querying current configuration.
Supertransform.pipelines = new Pipemaker();
