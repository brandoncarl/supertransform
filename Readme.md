# Supertransform

A universal transform for browserify with hot module loading. Based on
[Pipemaker](http://github.com/brandoncarl/pipemaker) engine.


## Installation

```
$ npm install superloader
```

## Examples

```js
var Supertransform = require("supertransform");

// Add engines
Supertransform.pipelines.addPipeline("ts");
Supertransform.pipelines.addPipeline("coffee");
Supertransform.pipelines.addPipeline("jbs", "jade>handlebars");

// Example browserify transform
var bundle = require("browserify")("sample.coffee");
bundle.transform(Supertransform).bundle().pipe(process.stdout);
```


## License
MIT
