import * as XLSX from 'xlsx';

export function readExcel(filePath: string, sheetName: string) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}

export function writeExcel(filePath: string, sheetName: string, data: any[]) {
    const workbook = XLSX.readFile(filePath);
    const worksheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets[sheetName] = worksheet;
    XLSX.writeFile(workbook, filePath);
}