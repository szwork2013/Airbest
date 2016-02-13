

module app.utils{
    export interface IApiResult<T> {
        success: boolean;
        data: T;
    }
}