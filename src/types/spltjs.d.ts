declare module 'spltjs' {
    interface SpltOptions {
        tagName?: string;
        className?: string;
        splitBy?: string;
        splitInto?: string;
    }

    function splt(options?: SpltOptions): void;
    export default splt;
}
