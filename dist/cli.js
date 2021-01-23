#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = __importStar(require("yargs"));
yargs
    .scriptName("Bottom translator [JavaScript] 0.3.0")
    .version("0.3.0")
    .usage("$0 <cmd> [args]")
    .command("$0", "Nadir <chowdhurynadir0@outlook.com>\nFantastic (maybe) CLI for translating between bottom and human-readable text", function (yargs) {
    yargs
        .option("bottomify", {
        type: "boolean",
        default: false,
        description: "Translate text to bottom",
        alias: "b",
    })
        .option("regress", {
        type: "boolean",
        default: false,
        description: "Translate bottom to human-readable text (futile)",
        alias: "r",
    })
        .positional("input", {
        type: "string",
        default: "",
        description: "Input file [Default: stdin]",
        alias: "i",
    })
        .positional("output", {
        type: "string",
        default: "",
        description: "Output file [Default: stdout]",
        alias: "o",
    })
        .check(function (argv) {
        if ((!argv._.length && !argv.input) ||
            (argv._.length && argv.input)) {
            throw new Error("Error: Either input text or the --input options must be provided.");
        }
        if (argv.bottomify && argv.regress) {
            throw new Error("Error: must not pass more than one of the following: --bottomify --regress");
        }
        return true;
    });
}, function (argv) {
    var bottomify = require("./bottomify");
    var fs = require("fs");
    function getText() {
        if (argv._.length) {
            return argv._[0].toString();
        }
        if (argv.input) {
            return fs.readFileSync(argv.input, "utf8").toString();
        }
    }
    function write(text) {
        if (argv.output) {
            fs.writeFileSync(argv.output, Buffer.from(text));
        }
        else {
            console.log(text);
        }
    }
    if (argv.bottomify) {
        write(bottomify.encode(getText()));
    }
    else if (argv.regress) {
        try {
            write(bottomify.decode(getText()));
        }
        catch (err) {
            console.error(err.toString());
        }
    }
})
    .help().argv;
