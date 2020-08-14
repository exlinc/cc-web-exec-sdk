const randStrCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const randStrCharactersLength = randStrCharacters.length;

export function inIFrame() {
    return window.parent !== window;
}

export function randomString(length: number) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randStrCharacters.charAt(Math.floor(Math.random() * randStrCharactersLength));
    }
    return result;
}

export function bindEvent(element: any, eventName: string, eventHandler: any) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}

export function unbindEvent(element: any, eventName: string, eventHandler: any) {
    if (element.removeEventListener) {
        element.removeEventListener(eventName, eventHandler, false);
    } else if (element.detachEvent) {
        element.detachEvent('on' + eventName, eventHandler);
    }
}

