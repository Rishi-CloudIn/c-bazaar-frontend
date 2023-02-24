export class Consts {
  static Version = '0.0.1';
  static Production = true;

  static SERVER_URL_TEST = 'https://cbazzar.cloudinlabs.com';
  static SERVER_URL_PROD = 'https://cbazzar.cloudinlabs.com';

  static URL(): string {
    if (this.Production) return this.SERVER_URL_PROD;
    else return this.SERVER_URL_TEST;
  }
}
