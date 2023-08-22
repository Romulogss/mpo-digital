import {angularMath} from "angular-ts-math/dist/angular-ts-math/angular-ts-math";
import * as moment from "moment";

export class AppUtils {

  static caracteresInvalidos = 'àèìòùâêîôûäëïöüáéíóúãõÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÁÉÍÓÚÃÕ';
  static caracteresValidos = 'aeiouaeiouaeiouaeiouaoAEIOUAEIOUAEIOUAEIOUAO';

  static MASKS = {
    cep: {mask: '99999-999', len: 9, type: 'num'},
    date: {date: true, mask: '99/99/9999', len: 10, type: 'num'},
    competence: {date: true, mask: '99/9999', len: 7, type: 'num'},
    datetime: {date: true, mask: '99/99/9999 99:99:99', len: 20, type: 'num'},
    ddd: {mask: '999', len: 3, type: 'num'},
    telDdd: {mask: '(99)99999-9999', len: 14, type: 'num'},
    tel: {mask: '99999-9999', len: 10, type: 'num'},
    cpf: {mask: '999.999.999-99', len: 14, type: 'num'},
    cnpj: {mask: '99.999.999/9999-99', len: 18, type: 'num'},
    money: {money: true, decimal: 2, len: 14, symbol: 'R$'},
    percent: {percent: true, decimal: 2, len: 5, symbol: '%'},
    email: {mask: '', len: 30, type: 'string'},
    codigoSms: {mask: '999999', len: 6, type: 'num'},
    placa: {mask: 'AAA9#99', len: 8, type: 'alfanum'},
  };

  static HOJE = AppUtils.ignorarHora(new Date());
  static AGORA = new Date().valueOf();
  static DEZOITO_ANOS = moment(AppUtils.HOJE).subtract(18, 'year').toDate()
  static $29_ANOS = moment(AppUtils.HOJE).subtract(29, 'year').toDate()
  static TRINTA_ANOS_FUTURO = moment(AppUtils.HOJE).add(30, 'year').toDate()

  static ultimoItemDaString(str: string): string {
    if (AppUtils.strNotEmptyOrNull(str)) {
      return str.substring(str.length - 1)
    }
    return '';
  }

  static strEmptyOrNull(str: string): boolean {
    return str == null || str.trim() === '';
  }

  static strEmptyOrNullOrNaoConsta(str: string): boolean {
    return this.strEmptyOrNull(str) || this.compararStrings(str, 'Não consta', true);
  }

  static strNotEmptyOrNull(str: string): boolean {
    return !this.strEmptyOrNull(str);
  }

  static listaEmpetyOrNull(lista: any[]): boolean {
    return lista == null || lista.length === 0
  }

  static removerItemDeLista(lista: any[], item: any) {
    if (item != null && !AppUtils.listaEmpetyOrNull(lista)) {
      lista.splice(lista.indexOf(item), 1)
    }
  }

  static ultimoItemDaLista(lista: any[]) {
    return lista[lista.length - 1];
  }

  static itemExisteNaLista(lista: any[], item: any): boolean {
    return !AppUtils.listaEmpetyOrNull(lista) && lista.indexOf(item) > -1;
  }

  static subtrairAnos(anos: number): Date {
    return moment(AppUtils.HOJE).subtract(anos, 'year').toDate()
  }

  static jsonToEntity(data: any, newInstanceFunc: any) {
    let result = newInstanceFunc();
    Object.keys(data).forEach(key => result[key] = data[key]);
    return result;
  }

  static getAtributoDeLista(classe: any, lista: any[], nomeTipo: string, valorTipo: any, nomeLabel?: string, valorLabel?: any): any {
    if (lista == null) {
      lista = [];
    }

    let itens: any;

    if (nomeLabel && valorLabel) {
      itens = lista.filter(it => it[nomeTipo] == valorTipo && it[nomeLabel] == valorLabel);
    } else {
      itens = lista.filter(it => it[nomeTipo] == valorTipo);
    }

    let item = (itens != null && itens.length > 0) ? itens[0] : null;

    if (item == null) {
      item = new classe();
      item[nomeTipo] = valorTipo;
      if (nomeLabel && valorLabel) {
        item[nomeLabel] = valorLabel;
      }
      lista.push(item);
    }
    return item;
  }

  static setAtributoDeLista(classe: any, lista: any[], nomeTipo: string, valorTipo: any, valor: any, nomeLabel?: string, valorLabel?: any) {
    // FIXME - Caso seja necessário utilizar este método, é preciso reimplementá-lo pelas mudanças que ocorreram.
    if (lista == null) {
      lista = [];
    }

    let item: any;

    if (nomeLabel && valorLabel) {
      item = lista.find(it => it[nomeTipo] == valorTipo && it[nomeLabel] == valorLabel);
    } else {
      item = lista.find(it => it[nomeTipo] == valorTipo);
    }

    if (item == null) {
      valor[nomeTipo] = valorTipo;
      if (nomeLabel && valorLabel) {
        valor[nomeLabel] = valorLabel;
      }
      lista.push(valor);
    }
  }

  static compararStrings(str1: string, str2: string, removeAcentos: boolean): boolean {
    if (str1 === null || str2 === null) return false;
    if (removeAcentos) {
      str1 = this.retiraTodosAcento(str1);
      str2 = this.retiraTodosAcento(str2);
    }
    return str1.toUpperCase().trim() === str2.toUpperCase().trim();
  }

  static dateToMilliseconds(date: Date): number | null {
    return date ? date.valueOf() : null;
  }

  static millisecondsToDate(milliseconds: number): Date | null {
    return milliseconds ? new Date(milliseconds) : null;
  }

  static dataParaDDMMAAAA(data: Date) {
    return `${(data.getDate() + 100)}`.substring(1) + '-' + `${(data.getMonth() + 101)}`.substring(1) + '-' + data.getFullYear();
  }

  static stringDateBRToDate(strintDateBR: string): Date | null { // BR dd/mm/yyyy

    if (!strintDateBR || strintDateBR.length < 10) return null;

    let parts: any[] = strintDateBR.split("/");

    if (!parts || parts.length != 3) return null;

    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  }

  static stringDateBRToMilisegundos(strintDateBR: string): number | null { // BR dd/mm/yyyy
    return AppUtils.dateToMilliseconds(AppUtils.stringDateBRToDate(strintDateBR)!);
  }

  static dateToStringDateBR(date: Date, ignorarHora: boolean): string | null {
    if (date == null) return null;
    if (ignorarHora) return AppUtils.ignorarHora(date).toLocaleDateString("pt-BR");
    return date.toLocaleDateString("pt-BR");
  }

  static millisecondsToISO8601(value: number): string | null {
    return value != null ? new Date(value).toISOString() : null;
  }

  static ISO8601ToMilliseconds(value: string): number | null {
    return value != null ? new Date(value).valueOf() : null;
  }

  static strToDate(value: string) {
    if (!value || value.length < 10) return null;
    try {
      return new Date(parseInt(value.substring(6, 10)), parseInt(value.substring(3, 5)) - 1, parseInt(value.substring(0, 2)));
    } catch (e) {
      console.log(`Data inválida ${value}`);
      return null;
    }
  }

  static dateToStr(date: Date) {
    try {
      const yyyy = date.getFullYear();
      const mm = date.getMonth() + 1;
      const dd = date.getDate();
      return (dd > 9 ? '' : '0') + dd + '/' + (mm > 9 ? '' : '0') + mm + '/' + yyyy;
    } catch (e) {
      console.log(`Data inválida ${date}`);
      return null;
    }
  }

  static prepareMaksToNumber(value: string | number, decimal: number): string {
    value = value == null ? 0 : value;
    value = (Number(value) / 100).toFixed(decimal);
    return value.toString().replace(/./g, it => it == '.' ? ',' : '#');
  }

  static millisecondsToStr(value: number) {
    return AppUtils.dateToStr(AppUtils.millisecondsToDate(value)!);
  }

  static strToMilliseconds(value: string): number | null {
    return AppUtils.dateToMilliseconds(AppUtils.strToDate(value)!);
  }

  static maskToNumberOLD(value: string, decimal: number) {
    const pattern = AppUtils.prepareMaksToNumber(value, decimal);
    return AppUtils.mask(value, pattern);
  }

  static maskToNumber(value: number | string, decimal: number): string | null {
    if (value == null) {
      return null;
    }
    value = Number(value).toFixed(decimal).toString().replace('.', ',');
    //value = value.toString();
    // let thousand = '.';
    let decimalCaracter = ',';
    value = value
      .replace(/\D/gi, '')
      .replace(new RegExp("([0-9]{" + decimal + "})$", "g"), decimalCaracter + '$1');
    return value;
  }

  static mask(value: string, pattern: string): string | null {
    if (value == null) {
      return null;
    }

    let i = 0;
    return pattern.replace(/./g, (c) => i < value.length ? (c == '0' ? value[i++] : c) : '');
  }

  static unmask(value: string): any {
    if (value == null) {
      return null;
    }
    if (value.match(/\D/g) || value.match(/\D+/g)) {
      return value.replace(/\D+/g, '');
    }
    return value;
  }

  static unmaskToNumber(value: string): any {
    if (value == null) {
      return null;
    }

    value = value.toString().replace(',', '.');
    return +value;
  }

  static somarValores(...valores: number[]): number {
    return Number(angularMath.sum(...valores));
  }

  static subtrairValores(...valores: number[]): number {
    return Number(angularMath.dif(...valores));
  }

  static subtrair(x?: number, y?: number): number {
    if (x != null && y != null) {
      return Number(angularMath.dif(x, y));
    } else {
      return 0;
    }
  }

  static multiplicar(x?: number, y?: number): number {
    if (x != null && y) {
      return Number(angularMath.mul(x, y));
    } else {
      return 0;
    }
  }

  static dividir(x?: number, y?: number): number {
    if (x != null && y) {
      return Number(angularMath.div(x, y));
    } else {
      return 0;
    }
  }

  static valorEntreInvervalo(inicioIntervalo: number, fimIntervalo: number, valor: number) {
    return valor >= inicioIntervalo && valor <= fimIntervalo;
  }

  static ignorarHora(data: Date): Date {
    return new Date(data.getFullYear(), data.getMonth(), data.getDate(), 0, 0, 0, 0);
  }

  static ignorarHoraMilliseconds(millisecons: number): Date {
    const data = AppUtils.millisecondsToDate(millisecons)!;
    return new Date(data.getFullYear(), data.getMonth(), data.getDate(), 0, 0, 0, 0);
  }

  static somarDias(data: Date, dias: number): Date {
    return new Date(data.valueOf() + (dias * 86400000));
  }

  static subtrairDias(data: Date, dias: number): Date {
    return new Date(data.valueOf() - (dias * 86400000));
  }

  static diferencaEntreDias(diaMaior: Date, diaMenor: Date) {
    const diff = moment(AppUtils.ignorarHora(diaMaior), "DD/MM/YYYY").diff(moment(AppUtils.ignorarHora(diaMenor), "DD/MM/YYYY"));
    return moment.duration(diff).asDays();
  }

  static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  static arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  static fileToArrayBuffer(file: File): Promise<any> {
    return new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (reader: any) => {
        resolve(reader.target.result);
      };
      fileReader.readAsArrayBuffer(file);
    });
  }

  static arrayBufferToImageBase64(buffer: ArrayBuffer, fileType: string) {
    return `data:${fileType};base64,${this.arrayBufferToBase64(buffer)}`;
  }

  static fileToBase64(file: File, fileType: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.fileToArrayBuffer(file)
        .then(it => resolve(this.arrayBufferToImageBase64(it, fileType)))
        .catch(erro => reject(erro));
    });
  }

  static naoConsta(valor: string): string {
    if (!valor) {
      return 'Não consta'
    }
    return valor;
  }

  static retiraTodosAcento(obj: string): string {
    let palavra = '';

    let chars = obj.split('');

    for (let c of chars) {
      if (AppUtils.caracteresInvalidos.indexOf(c) == -1) {
        palavra = palavra + c;
      } else {
        let nova = AppUtils.caracteresValidos.charAt(AppUtils.caracteresInvalidos.indexOf(c));
        palavra = palavra + nova;
      }
    }
    return palavra;
  }

  static numberToMoney(valor: number): string {
    if (valor != null) {
      return valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
    }
    return 'R$ 0,00'
  }
}

export class DateSelect {

  value: number;

  constructor(date: Date) {
    this.value = date.valueOf();
  }

  get dtValue(): string {
    return AppUtils.millisecondsToISO8601(this.value)!;
  }

  set dtValue(value: string) {
    this.value = AppUtils.ISO8601ToMilliseconds(value)!;
  }

  inc(days: number): DateSelect {
    let date = AppUtils.somarDias(AppUtils.ignorarHora(new Date(this.value)), days);
    this.value = date.valueOf();
    return this;
  }

}


