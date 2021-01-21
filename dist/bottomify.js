"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CHARACTER_VALUES = {
    200: "🫂",
    50: "💖",
    10: "✨",
    5: "🥺",
    1: ",",
    0: "❤️",
};
var CHARACTER_VALUES_MAP = Object.entries(CHARACTER_VALUES).reverse();
var VALUES_CHARACTER = CHARACTER_VALUES_MAP.reduce(function (obj, item) { return (obj[item[1]] = item[0]) && obj; }, {});
var SECTION_SEPERATOR = "👉👈";
var FINAL_TERMINATOR = new RegExp("(" + SECTION_SEPERATOR + ")?$");
function encode(value) {
    var e_1, _a, e_2, _b;
    var input = Array.from(value).map(function (v) { return v.codePointAt(0); });
    var output = [];
    try {
        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
            var char = input_1_1.value;
            while (char !== 0) {
                try {
                    for (var CHARACTER_VALUES_MAP_1 = (e_2 = void 0, __values(CHARACTER_VALUES_MAP)), CHARACTER_VALUES_MAP_1_1 = CHARACTER_VALUES_MAP_1.next(); !CHARACTER_VALUES_MAP_1_1.done; CHARACTER_VALUES_MAP_1_1 = CHARACTER_VALUES_MAP_1.next()) {
                        var _c = __read(CHARACTER_VALUES_MAP_1_1.value, 2), value_1 = _c[0], emoji = _c[1];
                        var parsedValue = parseInt(value_1);
                        if (char >= parsedValue) {
                            char -= parsedValue;
                            output.push(emoji);
                            break;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (CHARACTER_VALUES_MAP_1_1 && !CHARACTER_VALUES_MAP_1_1.done && (_b = CHARACTER_VALUES_MAP_1.return)) _b.call(CHARACTER_VALUES_MAP_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            output.push(SECTION_SEPERATOR);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return output.join("");
}
exports.encode = encode;
function decode(value) {
    var input = value
        .trim()
        .replace(FINAL_TERMINATOR, "")
        .split(SECTION_SEPERATOR);
    var output = [];
    if (Array.from(value).some(function (v) {
        return !(Object.keys(VALUES_CHARACTER).includes(v) ||
            SECTION_SEPERATOR.includes(v));
    })) {
        throw TypeError("Invalid bottom text: '" + value + "'");
    }
    input.forEach(function (word) {
        var codepoint = 0;
        Array.from(word).forEach(function (char) {
            codepoint += parseInt(VALUES_CHARACTER[char]);
        });
        output.push(codepoint);
    });
    return String.fromCodePoint.apply(String, __spread(output));
}
exports.decode = decode;
