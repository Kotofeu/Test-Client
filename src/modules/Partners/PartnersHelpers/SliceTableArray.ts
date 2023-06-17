import { IGetAllJSON } from "../../../store";


export function SliceTableArray<T>(table: IGetAllJSON<T>, minArrayLength: number): T[][] {
    const middleArrayIndex = Math.ceil(table.count / 2);
    const slicedTable: T[][] = []

    if (middleArrayIndex >= minArrayLength) {
        const slicedTableLeft = table.rows.slice(0, middleArrayIndex);
        const slicedTableRight = table.rows.slice(middleArrayIndex, table.count);
        slicedTable.push(slicedTableLeft)
        slicedTable.push(slicedTableRight)
        return slicedTable

    }
    else {
        slicedTable.push(table.rows)
    }
    return slicedTable

}
