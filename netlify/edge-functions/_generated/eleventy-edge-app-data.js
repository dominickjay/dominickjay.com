export default { "eleventy": { "compatibility": ">=2" },
"buildTimeData": {},
"nunjucksPrecompiled": {
  "EleventyEdgeNunjucksPrecompile:a5f97c76a46249adf13ca8fd8180c88e3ad86ddb37fdd80ca9e1617d9a1a6567": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n                <pre>\n                    ";
output += runtime.suppressValue(env.getFilter("json").call(context, runtime.contextOrFrameLookup(context, frame, "lastfm")), env.opts.autoescape);
output += "\n                </pre>\n            ";
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
} }