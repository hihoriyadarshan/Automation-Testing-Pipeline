import { ExcelReader } from './ExcelReader';
import { FrameworkPaths } from './FrameworkPaths';

export class TestDataLoader {

  static load(fileName: string, sheetName: string) {

    const filePath =
      FrameworkPaths.testData(fileName);

    const rows: any[] =
      ExcelReader.readSheet(filePath, sheetName);

    return rows.map((row, index) => {

      const testName =
        row.TestName ||
        `${sheetName}_Row_${index + 1}`;

      return {
        name: testName,
        data: row
      };
    });
  }
}