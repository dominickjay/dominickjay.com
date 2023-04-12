import { EleventyEdge } from "https://cdn.11ty.dev/edge@2.0.1/eleventy-edge.js";

const precompiledAppData = { "eleventy": { "compatibility": ">=2" },
"buildTimeData": {},
"nunjucksPrecompiled": {
  "EleventyEdgeNunjucksPrecompile:e62204627774c95898f94d6020200b336abe835e4cdf9fcf21ad9d6b617fb483": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n            <div class=\"fl-mt-xs\">\n                Latest track from Last.FM: <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedTrack"), env.opts.autoescape);
output += "</span> by <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedArtist"), env.opts.autoescape);
output += "</span>\n            </div>\n            <div class=\"music-grid\">\n                ";
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
output += runtime.suppressValue(runtime.memberLookup((t_4),"url"), env.opts.autoescape);
output += "\">\n                        <img height=\"174\" width=\"174\" src=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"art"), env.opts.autoescape);
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
"EleventyEdgeNunjucksPrecompile:0d8bfb656757995795595f8a4149ebc0126a84ef8bdc1644c6731359549b933d": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n            <div class=\"fl-mt-xs\">\n                Latest track from Last.FM: <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedTrack"), env.opts.autoescape);
output += "</span> by <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedArtist"), env.opts.autoescape);
output += "</span>\n            </div>\n            <div class=\"music-grid\">\n                ";
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
output += runtime.suppressValue(runtime.memberLookup((t_4),"url"), env.opts.autoescape);
output += "\">\n                        <img height=\"174\" width=\"174\" src=\"";
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
"EleventyEdgeNunjucksPrecompile:1b3b0789425ad4e811a1ec7a09c21786ac42b2a0f33874a9c30780ce11a689c6": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n            <div class=\"fl-mt-xs\">\n                Latest track from Last.FM: <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedTrack"), env.opts.autoescape);
output += "</span> by <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedArtist"), env.opts.autoescape);
output += "</span>\n            </div>\n            <div class=\"music-grid\">\n                ";
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
output += "\">\n                        <img height=\"174\" width=\"174\" src=\"";
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
"EleventyEdgeNunjucksPrecompile:7535abb9e6fb75450abbaf77a00099fda5007539b1528dd9528446310063aa0b": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n            <div class=\"fl-mt-xs\">\n                Latest track from Last.FM: <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedTrack"), env.opts.autoescape);
output += "</span> by <span class=\"font-bold\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastPlayedArtist"), env.opts.autoescape);
output += "</span>\n            </div>\n            <div class=\"music-grid\">\n                ";
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
} };

export { EleventyEdge, precompiledAppData }