import {IMessageWrapper, MessageHandlerFunc} from "./models";
import {MESSAGE_DATA_PREFIX} from "./consts";
import {logger} from "./logger";
import {bindEvent, randomString, unbindEvent} from "./utils";

export class CCWebExec {
    private zombie = false;
    private handlers: { [eventKey: string]: { [handlerId: string]: MessageHandlerFunc} } = {}
    private readonly onMsgFunc;

    constructor(private elementRef: any, public readonly frameId: string) {
        this.onMsgFunc = this.onMessage.bind(this);
        bindEvent(this.elementRef, 'message', this.onMsgFunc);
    }

    public dispose() {
        if (this.zombie) {
            return;
        }
        this.zombie = true;
        this.handlers = {};
        unbindEvent(this.elementRef, 'message', this.onMsgFunc)
    }

    public subscribe(event: string, handler: MessageHandlerFunc): string {
        const hId = randomString(16);
        if (!event || typeof event !== 'string') {
            throw new Error('Invalid/missing event key on subscribe call: ' + event);
        }
        if (!handler || typeof handler !== 'function') {
            throw new Error('Invalid/missing handler function on subscribe call: ' + handler);
        }
        if (!this.handlers[event] || typeof this.handlers[event] !== 'object') {
            this.handlers[event] = {};
        }
        this.handlers[event][hId] = handler;
        return hId
    }

    public unsubscribe(event: string, hId: string) {
        if (!event || typeof event !== 'string') {
            throw new Error('Invalid/missing event key on unsubscribe call: ' + event);
        }
        if (!hId || typeof hId !== 'string') {
            throw new Error('Invalid/missing handler id on unsubscribe call: ' + event);
        }
        if (!this.handlers[event] || typeof this.handlers[event] !== 'object' || !this.handlers[event][hId]) {
            logger.warn(`Already unsubscribed event=${event} handlerId=${hId}`);
            return;
        }
        delete this.handlers[event][hId];
    }

    public sendMessage(event: string, payload: any) {
        this.assertNotZombie();
        if (!window.parent) {
            logger.warn('');
            return;
        }
        window.parent.postMessage(MESSAGE_DATA_PREFIX + JSON.stringify({
            frameId: this.frameId,
            event,
            payload
        } as IMessageWrapper), '*');
    }

    private assertNotZombie() {
        if (this.zombie) {
            logger.error(`Function called on zombie instance; frameId=${this.frameId}`);
            throw new Error('Cannot call this function on a zombie instance');
        }
    }

    private onMessage(event: any) {
        if (this.zombie) {
            logger.warn(`Zombie instance still receiving messages. Dispose likely failed. frameId=${this.frameId}`);
            return;
        }
        if (!event || !event.data || typeof event.data !== 'string' || !event.data.startsWith(MESSAGE_DATA_PREFIX)) {
            return;
        }
        let msg: IMessageWrapper;
        try {
            msg = JSON.parse(event.data.substr(MESSAGE_DATA_PREFIX.length));
            if (!msg.frameId || typeof msg.frameId !== 'string') {
                logger.error('message.frameId is missing/invalid');
                return;
            }
            if (msg.frameId !== this.frameId) {
                logger.debug('message.frameId doesn\'t match, skipping');
                return;
            }
            if (!msg.event || typeof msg.event !== 'string') {
                logger.error('message.event is missing/invalid');
                return;
            }
        } catch (err) {
            logger.error('Exception parsing message data: ', err)
            return;
        }
        this.notifySubscribers(msg.event, msg.payload);
    }

    private notifySubscribers(event: string, payload: any) {
        if (!this.handlers[event] || typeof this.handlers[event] !== 'object') {
            return;
        }
        const handlerIds = Object.keys(this.handlers[event]);
        if (!handlerIds || handlerIds.length < 1) {
            return;
        }
        handlerIds.forEach(id => {
            const func = this.handlers[event][id];
            if (!func || typeof func !== 'function') {
                return;
            }
            try {
                let a = async () => {
                    func(event, payload);
                }
                // Ignore promise -- don't wait for this to terminate, just call the other handlers
                a();
            } catch (err) {
                logger.error(`Error calling handler frameId=${this.frameId} event=${event} handlerId=${id} `, err)
            }
        })
    }
}
