"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
var CHARACTER_VALUES = [
    [200, "🫂"],
    [50, "💖"],
    [10, "✨"],
    [5, "🥺"],
    [1, ","],
    [0, "❤️"],
];
var SECTION_SEPERATOR = "👉👈";
var FINAL_TERMINATOR = new RegExp("(" + SECTION_SEPERATOR + ")?$");
function textEncoder() {
    try {
        return new TextEncoder();
    }
    catch (_a) {
        // more than likely Node.JS
        return new (require("util").TextEncoder)();
    }
}
function textDecoder() {
    try {
        return new TextDecoder();
    }
    catch (_a) {
        // more than likely Node.JS
        return new (require("util").TextDecoder)();
    }
}
function encodeChar(charValue) {
    if (charValue === 0)
        return "";
    var _a = __read(CHARACTER_VALUES.find(function (_a) {
        var _b = __read(_a, 1), val = _b[0];
        return charValue >= val;
    }) || CHARACTER_VALUES[-1], 2), val = _a[0], currentCase = _a[1];
    return "" + currentCase + encodeChar(charValue - val);
}
function encode(value) {
    return Array.from(textEncoder().encode(value))
        .map(function (v) { return encodeChar(v) + SECTION_SEPERATOR; })
        .join("");
}
exports.encode = encode;
function decode(value) {
    return textDecoder().decode(Uint8Array.from(value
        .trim()
        .replace(FINAL_TERMINATOR, "")
        .split(SECTION_SEPERATOR)
        .map(function (letters) {
        return Array.from(letters)
            .map(function (character) {
            var _a = __read(CHARACTER_VALUES.find(function (_a) {
                var _b = __read(_a, 2), _ = _b[0], em = _b[1];
                return em == character;
            }) || [-1, ""], 2), value = _a[0], emoji = _a[1];
            if (!emoji) {
                throw new TypeError("Invalid bottom text: '" + character + "'");
            }
            return value;
        })
            .reduce(function (p, c) { return p + c; });
    })));
}
exports.decode = decode;
