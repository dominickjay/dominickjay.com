import { EleventyEdge } from "https://cdn.11ty.dev/edge@2.0.1/eleventy-edge.js";

const precompiledAppData = { "eleventy": { "compatibility": ">=2" },
"buildTimeData": {},
"nunjucksPrecompiled": {
  "EleventyEdgeNunjucksPrecompile:f874ac8ca0e60bb1c8b5d692b75533218572a61a5dbc0d6a6aa1c1086f301b1c": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n            <div class=\"fl-mt-xs\">\n                Latest track from Last.FM: <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedTrack"), env.opts.autoescape);
output += "</span> by <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedArtist"), env.opts.autoescape);
output += "</span>\n            </div>\n            <div class=\"music-grid\">\n                this is our music grid\n                ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "tracks");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("album", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                    <a href=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"album")),"url"), env.opts.autoescape);
output += "\">\n                    <img height=\"174\" width=\"174\" src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_4),"album")),"image")),3)),"#text"), env.opts.autoescape);
output += "\" loading=\"lazy\" />\n                    </a>\n                ";
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
"EleventyEdgeNunjucksPrecompile:50b186cc92076e661c221b3d94914104c824c9bfcd562841a26105874f1c2a1b": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n            <div class=\"fl-mt-xs\">\n                Latest track from Last.FM: <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedTrack"), env.opts.autoescape);
output += "</span> by <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedArtist"), env.opts.autoescape);
output += "</span>\n            </div>\n            <div class=\"music-grid\">\n                this is our music grid\n                ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tracks"), env.opts.autoescape);
output += "\n                ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "tracks");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("album", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                    <a href=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"album")),"url"), env.opts.autoescape);
output += "\">\n                    <img height=\"174\" width=\"174\" src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_4),"album")),"image")),3)),"#text"), env.opts.autoescape);
output += "\" loading=\"lazy\" />\n                    </a>\n                ";
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
"EleventyEdgeNunjucksPrecompile:78de6cfd7e5caad0f0179dfc6ef6d2e368eeacd673f7af966fed4a426707e313": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n            <div class=\"fl-mt-xs\">\n                Latest track from Last.FM: <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedTrack"), env.opts.autoescape);
output += "</span> by <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedArtist"), env.opts.autoescape);
output += "</span>\n            </div>\n            <div class=\"music-grid\">\n                this is our music grid\n                ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tracks"), env.opts.autoescape);
output += "\n                ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "tracks");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("album", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                    <a href=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"album")),"url"), env.opts.autoescape);
output += "\">\n                    <img height=\"174\" width=\"174\" src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_4),"album")),"image")),3)),"#text"), env.opts.autoescape);
output += "\" loading=\"lazy\" />\n                    </a>\n                ";
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