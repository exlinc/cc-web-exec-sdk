import {inIFrame} from "./utils";
import {CCWebExec} from "./cc-web-exec";
import {logger} from "./logger";

export class CCWebExecClient extends CCWebExec {
    constructor() {
        super(window.parent, new URLSearchParams(window.location.search).get('frameId') || 'none');
        if (!inIFrame()) {
            logger.warn('Web exec SDK not in iframe (unsupported, messages may not be sent properly)');
        }
    }
}
