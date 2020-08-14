import {CCWebExec} from "./cc-web-exec";

export class CCWebExecManager extends CCWebExec {
    constructor(frameId: string, iframeElementId: string = `cc-embed-${frameId}`) {
        // @ts-ignore
        super(document.getElementById(iframeElementId).contentWindow, frameId);
    }
}
