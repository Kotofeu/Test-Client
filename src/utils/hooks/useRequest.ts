import { useCallback, useState, useEffect, Dispatch } from 'react';

export default function useRequest<T, S = any>
    (request: (params?: S) => Promise<T>, initialParams?: S, instate: boolean = true):
    [T | undefined, boolean, any, () => void, Dispatch<React.SetStateAction<S | undefined>>] {
    const [data, setData] = useState<T>();
    const [reqParams, setReqParams] = useState<S | undefined>(initialParams)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
    const execute = useCallback(async () => {
        setIsLoading(true);
        await request(reqParams)
            .then(response => setData(response))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false));
    }, [request, reqParams, instate])
    useEffect(() => {
        if (instate || reqParams) {
            execute()
        }
    }, [execute, instate])
    return [data, isLoading, error, execute, setReqParams];
}