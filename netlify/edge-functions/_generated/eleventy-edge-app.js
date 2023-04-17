import { EleventyEdge } from "https://cdn.11ty.dev/edge@2.0.2/eleventy-edge.js";

const precompiledAppData = { "eleventy": { "compatibility": ">=2" },
"buildTimeData": {},
"nunjucksPrecompiled": {
  "EleventyEdgeNunjucksPrecompile:61717f6866a4ae95bba846d5d8f32b6c5930c32670888f5c83fed32e9b5e683d": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n            <div class=\"fl-mt-xs\">\n                Latest track from Last.FM: <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedTrack"), env.opts.autoescape);
output += "</span> by <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedArtist"), env.opts.autoescape);
output += "</span>\n            </div>\n            <div class=\"fl-mt-xs\">\n                Over the past 7 days, I've also listened to\n                ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "tracks");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("artist", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") != 1) {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"last")) {
output += " and ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") != 2) {
output += ", ";
;
}
;
}
output += "<span class=\"font-bold\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "</span>";
;
}
;
}
}
frame = frame.pop();
output += "\n            </div>\n            ";
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