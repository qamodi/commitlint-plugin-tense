export type Tense = 'past-participle' | 'past-tense' | 'present-imperative' | 'present-participle' | 'present-third-person';
export interface TenseOptions {
    allowedTenses: Tense[];
    firstOnly: boolean;
    allowlist: string[];
}
export declare const ensureTense: (input: string, options: TenseOptions) => {
    matches: boolean;
    offending: Array<{
        lemma: string;
        tense: string;
    }>;
};
