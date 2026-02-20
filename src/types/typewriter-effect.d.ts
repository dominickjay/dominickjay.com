declare module 'typewriter-effect/dist/core' {
    export default class Typewriter {
        constructor(element: HTMLElement, options?: {
            loop?: boolean;
            delay?: string | number;
            devMode?: boolean;
        });
        typeString(text: string): this;
        pauseFor(ms: number): this;
        start(): this;
        deleteAll(): this;
    }
}
