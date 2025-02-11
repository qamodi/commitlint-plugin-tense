"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureTense = void 0;
const fast_tag_pos_1 = require("fast-tag-pos");
const allowlist_1 = require("./allowlist");
const lexer = new fast_tag_pos_1.Lexer();
const tagger = new fast_tag_pos_1.Tagger();
const tenses = {
    'past-participle': fast_tag_pos_1.TagType.VBN,
    'past-tense': fast_tag_pos_1.TagType.VBD,
    'present-imperative': fast_tag_pos_1.TagType.VBP,
    'present-participle': fast_tag_pos_1.TagType.VBG,
    'present-third-person': fast_tag_pos_1.TagType.VBZ
};
function getLemmata(input) {
    try {
        return lexer.lex(input);
    }
    catch (err) {
        return [];
    }
}
function getTags(lemmata) {
    try {
        return tagger.tag(lemmata);
    }
    catch (err) {
        return [];
    }
}
const ensureTense = (input, options) => {
    const tags = options.allowedTenses.map((tense) => tenses[tense]);
    const allowlist = getAllowList(options.allowlist, options.allowedTenses);
    const lemmata = getLemmata(input);
    const tagged = getTags(lemmata);
    const verbs = getVerbs(tagged, options.firstOnly, allowlist);
    const offending = verbs
        .filter(([, tag]) => !tags.includes(tag))
        .filter(([lemma]) => !allowlist.includes(lemma))
        .map(([lemma, tag]) => {
        const tense = getTenseFromTag(tag);
        return { lemma, tense };
    });
    return {
        matches: offending.length === 0,
        offending
    };
};
exports.ensureTense = ensureTense;
function getAllowList(userAllowlist, allowedTenses) {
    if (allowedTenses.includes('present-imperative')) {
        return [...userAllowlist, ...allowlist_1.allowlist];
    }
    return userAllowlist;
}
function getTenseFromTag(tag) {
    const tense = Object.keys(tenses).find((key) => tenses[key] === tag);
    return tense !== undefined ? tense : '';
}
function getVerbs(tags, firstOnly, allowlist) {
    if (firstOnly === true) {
        const verb = tags.find(([lemma, tag]) => tag[0] === 'V' || allowlist.includes(lemma));
        return verb !== undefined ? [verb] : [];
    }
    return tags.filter(([, tag]) => tag[0] === 'V');
}
