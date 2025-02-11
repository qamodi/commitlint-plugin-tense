"use strict";
const subject_tense_1 = require("./rules/subject-tense");
const plugin = {
    rules: {
        'tense/subject-tense': subject_tense_1.subjectTense
    }
};
module.exports = plugin;
