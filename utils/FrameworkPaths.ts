import path from 'path';

export class FrameworkPaths {

  static projectRoot = process.cwd();

  static testData(fileName: string) {
    return path.resolve(
      this.projectRoot,
      'test-data',
      fileName
    );
  }
}