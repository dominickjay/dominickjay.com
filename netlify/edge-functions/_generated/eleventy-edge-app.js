import { EleventyEdge } from "https://cdn.11ty.dev/edge@2.0.1/eleventy-edge.js";

const precompiledAppData = { "eleventy": { "compatibility": ">=2" },
"buildTimeData": {},
"nunjucksPrecompiled": {
  "EleventyEdgeNunjucksPrecompile:3f5c332c338e267d3d1d644c8b3ad27d9660525e2ceeeb1cb4bef2ccb279ab48": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n            <div class=\"fl-mt-xs\">\n                Latest track from Last.FM: <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastfmTrack"), env.opts.autoescape);
output += "</span> by <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastfmArtist"), env.opts.autoescape);
output += "</span>\n            </div>\n            ";
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