import {inIFrame} from "./utils";
import {CCWebExec} from "./cc-web-exec";

export class CCWebExecManager extends CCWebExec {
    constructor(frameId: string) {
        super(window, frameId);
    }
}
