import { EleventyEdge } from "https://cdn.11ty.dev/edge@2.0.1/eleventy-edge.js";

const precompiledAppData = { "eleventy": { "compatibility": ">=2" },
"buildTimeData": {},
"nunjucksPrecompiled": {
  "EleventyEdgeNunjucksPrecompile:41f1098a5bf4b4597bfd6e5cd2065c08fbf3f782eb758a3c17d6b52bbc37a010": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n\n                This track is ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastfm"), env.opts.autoescape);
output += "\n            ";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
}()),
"EleventyEdgeNunjucksPrecompile:83bae11e8933cb7b8995de8151ba83de63c76fe3f2c7869bc8d18e5221779f14": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n                This track is ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastfm"), env.opts.autoescape);
output += "\n            ";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
}()),
} };

export { EleventyEdge, precompiledAppData }