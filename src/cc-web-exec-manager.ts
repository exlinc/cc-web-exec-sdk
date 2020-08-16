import {CCWebExec} from "./cc-web-exec";

export class CCWebExecManager extends CCWebExec {
    constructor(frameId: string, iframeElementId: string = `cc-embed-${frameId}`) {
        super(() => {
            // @ts-ignore
            return document.getElementById(iframeElementId).contentWindow
        }, frameId);
    }
}
