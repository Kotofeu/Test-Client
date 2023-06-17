export const createQueryParam = (paramName: string, param: any): string | null => {
    if (param !== undefined) {
        return `${paramName}=${param}`;
    }
    return null;
};