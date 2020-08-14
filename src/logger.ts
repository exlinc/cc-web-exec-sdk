class Logger {
    constructor(private appName: string) {
    }

    public log(...args: any) {
        console.log(this.prefix(), ...args)
    }

    public error(...args: any) {
        console.error(this.prefix(), ...args)
    }

    public debug(...args: any) {
        console.debug(this.prefix(), ...args)
    }

    public warn(...args: any) {
        console.warn(this.prefix(), ...args)
    }

    private prefix() {
        return `[${this.appName}] `;
    }
}

export const logger = new Logger('CC-WEB-EXEC-SDK');
