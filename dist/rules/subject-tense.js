"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectTense = void 0;
const message_1 = __importDefault(require("@commitlint/message"));
const ensure_tense_1 = require("../library/ensure-tense");
const negated = (when) => when === 'never';
const subjectTense = (parsed, when = 'always', userOptions) => {
    const { subject } = parsed;
    const options = Object.assign({ allowedTenses: ['present-imperative'], firstOnly: true, allowlist: [] }, userOptions);
    if (typeof subject !== 'string' || subject.match(/^[a-z]/i) == null) {
        return [true];
    }
    const { matches, offending } = (0, ensure_tense_1.ensureTense)(subject.toLowerCase(), options);
    const offenders = offending
        .map(({ lemma, tense }) => `${lemma}${tense === '' ? '' : ` - ${tense}`}`)
        .join(',');
    const list = options.allowedTenses.join(', ');
    return [
        negated(when) ? !matches : matches,
        (0, message_1.default)([
            'tense of subject must',
            negated(when) ? 'not' : null,
            `be ${list}. Words in other tenses: ${offenders}`
        ])
    ];
};
exports.subjectTense = subjectTense;
