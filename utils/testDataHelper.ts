import { readExcel } from './excelUtil';

export function getTestData(sheet: string) {
    return readExcel('./test-data/Test-Data.xlsx', sheet);
}