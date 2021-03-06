export interface IMessageWrapper {
    frameId: string;
    event: 'execute_code' | 'execution_result' | 'log_output';
    payload: any;
}

export interface IExecuteCodePayload {
    defaultFileName: string;
    language: string;
    files: { [ key: string ]: string };
    stdin: string;
}

export interface IExecuteResult {
    stdout: string;
    message: ILogOutput;
}

export interface ILogOutput {
    type: string;
    data: string;
}

export type MessageHandlerFunc<T> = (event: string, payload: T) => void;
