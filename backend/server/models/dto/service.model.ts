interface ServiceProcessSuccess<T>{
    message?: string,
    data: T,
    status: 'success'
}

interface ServiceProcessFail {
    message: string,
    errors?: Array<ResponseError>,
    status: 'fail'
}

interface ServiceProcessError {
    message?: string,
    cause?: Error
    status: 'error'
}

type ResponseError ={
    path?: string,
    mesage: string,
    value?: any
}

export type ServiceReturnType<T> =
    | ServiceProcessSuccess<T>
    | ServiceProcessFail
    | ServiceProcessError
