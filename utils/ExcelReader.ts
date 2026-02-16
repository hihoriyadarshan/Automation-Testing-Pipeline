import * as XLSX from 'xlsx';

export class ExcelReader {

  static readSheet(filePath: string, sheetName: string) {

    const workbook = XLSX.readFile(filePath);

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      throw new Error(
        `Sheet "${sheetName}" not found in file: ${filePath}`
      );
    }

    return XLSX.utils.sheet_to_json(worksheet, {
      defval: '',
    });
  }
}