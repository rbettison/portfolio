import { useCallback, useState } from "react";

export function useAsyncFn(func: ({params}: any) => Promise<Response>, dependencies: any[]) : {loading: boolean, error: string, value: {}, execute: (...params: any[]) => Promise<any>} {
    return useAsyncInternal(func, dependencies, false);
}

function useAsyncInternal(func: ({params}: any) => Promise<Response>, dependencies: any[], initialLoading: boolean) : {loading: boolean, error: string, value: {}, execute: ({...params} : any) => Promise<Response>} {
    const [loading, setLoading] = useState(initialLoading)
    const [error, setError] = useState("")
    const [value, setValue] = useState({})

    const execute = useCallback(async ({...params} : any) => {
        console.log('params: ' + JSON.stringify(params));
        setLoading(true);
        return await func({...params}).then(async data => {
            setValue(data);
            setError("");
            return data;
        }).catch(err => {
            setValue("");
            setError(err);
            return Promise.reject(err);
        }).finally(() => {
            setLoading(false);
        })
    }, dependencies)

    return {loading, error, value, execute};

}