import { Rule } from '@commitlint/types';
import { Tense } from '../library/ensure-tense';
interface RuleOptions {
    allowedTenses?: Tense[];
    firstOnly?: boolean;
    allowlist?: string[];
}
export declare const subjectTense: Rule<RuleOptions>;
export {};
