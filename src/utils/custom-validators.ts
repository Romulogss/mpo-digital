import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AppUtils} from "./app-utils";
import {MaskUtils} from "./mask.utils";
import {FormMaskControl} from "./form/formMask.control";
import {cpf as cpfValidador, cnpj as cnpjValidador} from "cpf-cnpj-validator";

export class CustomValidators {

  static cpfCnpj(control: AbstractControl): ValidationErrors | null {
    if (control.value == null || control.value.length < 16) {
      return CustomValidators.cpf(control);
    } else {
      return CustomValidators.cnpj(control);
    }
  }

  static email(control: AbstractControl): ValidationErrors | null {
    let re = /^[a-z0-9._]+@[a-z0-9]+\.([a-z]{3})+(\.[a-z]+)?$/i;
    let error = {'email.error': {value: control.value}};
    if (control.value == null || control.value == '') {
      return null;
    }
    if (re.test(String(control.value).toLowerCase())) {
      return null;
    }
    return error;
  }

  /**
   * Verifica se a data do parâmetro é maior que a do controle
   * @param dataMinina pode ser string data BR ou em milisegundos
   */
  static dataMaiorQue(dataMinina: number | string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let error = {'data.error': {value: control.value}};
      if (typeof dataMinina === "string") {
        dataMinina = AppUtils.stringDateBRToDate(dataMinina).getTime()
      }
      let data = null;
      try {
        data = AppUtils.stringDateBRToDate(control.value).getTime()
      } catch (err) {
      }
      if (control.value == null || control.value == '') {
        return null;
      }
      if (control.value.length == 10) {
        if (data < dataMinina) {
          setTimeout(() => {
            MaskUtils.updateFormMaskControl(control, null)
          }, 1000)
        }
        return data < dataMinina ? error : null
      }
      return null
    }
  }

  /**
   * Verifica se a data do parâmetro é menor que a do controle
   * @param dataMaxima em milisegundos
   */
  static dataMenorQue(dataMaxima: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let error = {'data.error': {value: control.value}};
      let data = null;
      try {
        data = AppUtils.stringDateBRToDate(control.value).getTime()
      } catch (err) {
      }
      if (control.value == null || control.value == '') {
        return null;
      }
      if (control.value.length == 10) {
        if (data > dataMaxima) {
          setTimeout(() => {
            MaskUtils.updateFormMaskControl(control, null)
          }, 1000)
        }
        return data > dataMaxima ? error : null
      }
      return null;
    }
  }

  static max(valormaximo: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = {'maximoValor': {value: control.value}};
      if (control.value == '' || control.value == 0) {
        return null;
      }

      if (Number(control.value) <= valormaximo) return null;

      setTimeout(() => {
        control.setValue('')
      }, 1000)
      return error
    }
  }

  static cpf(control: AbstractControl): ValidationErrors | null {
    if (control.value == null || control.value == '') {
      return null;
    }
    let error = {'cpf.error': {value: control.value}};
    let cpf = MaskUtils.parse(control.value, AppUtils.MASKS.cpf);
    cpf = cpf.length > 11 ? cpf.substring(0, 11) : cpf;
    if (cpf.length != 11) {
      return error;
    }
    return cpfValidador.isValid(cpf) ? null : error;
  }

  static cnpj(control: AbstractControl): { [key: string]: any } | null {
    if (control.value == null || control.value == '') {
      return null;
    }
    let error = {'cnpj.error': {value: control.value}};
    let cnpj = MaskUtils.parse(control.value, AppUtils.MASKS.cnpj);
    cnpj = cnpj.length > 14 ? cnpj.substring(0, 14) : cnpj;
    if (cnpj.length != 14)
      return error;
    return cnpjValidador.isValid(cnpj) ? null : error;
  }

  static datetime(control: FormMaskControl): { [key: string]: any } | null {

    return null;
  }

  static date(control: FormMaskControl): { [key: string]: any } | null {

    if (control.value == null || control.value == '') {
      return null;
    }
    let error = {'date.error': {value: control.value}};
    let dt = MaskUtils.format(control.value, control.mask);

    if (dt.length != AppUtils.MASKS.date.len) {
      return error;
    }

    try {

      const arr1 = dt.split('/');
      let year = 0;
      let month = 0;
      let day = 0;
      if (arr1.length == 3) {

        year = parseInt(arr1[2], 10);
        month = parseInt(arr1[1], 10);
        day = parseInt(arr1[0], 10);

        const isLeapYear = year % 4 == 0;

        if (month < 1 || month > 12) {
          return error;
        } else if ((month == 4 || month == 6 || month == 9 || month == 11) && !(day >= 0 && day <= 30)) {
          return error;
        } else if ((month != 2) && !(day >= 0 && day <= 31)) {
          return error;
        } else if (isLeapYear && month == 2 && !(day >= 0 && day <= 29)) {
          return error;
        } else if (!isLeapYear && month == 2 && !(day >= 0 && day <= 28)) {
          return error;
        }

      }

      return null;
    } catch (err) {
      console.log('ValidateDate: ' + err);
    }

    return null;
  }

  static competence(control: FormMaskControl): { [key: string]: any } | null {

    if (control.value == null || control.value == '') {
      return null;
    }
    let error = {'data.error': {value: control.value}};
    let dt = MaskUtils.format(control.value, control.mask);

    if (dt.length != AppUtils.MASKS.competence.len) {
      return error;
    }

    try {

      const arr1 = dt.split('/');
      let month = 0;
      if (arr1.length == 2) {
        month = parseInt(arr1[0], 10);
        if (month > 12) {
          return error;
        }
      }

      return null;
    } catch (err) {
      console.log('ValidateDate: ' + err);
    }

    return null;
  }

  static requiredByCondicao(condicao: boolean): ValidatorFn {
    if (condicao) return Validators.required
    return (control: AbstractControl): ValidationErrors | null => {
      return null;
    }
  }

  static diferenteDe(valor: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = {'diferenteDe': {value: control.value}};
      if (control.value != valor) return null;
      return error
    }
  }
  /**
   * Verifica se o valor do controle está contido na lista
   * @param lista lista para validação
   */
  static contidoEm(lista: any[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = {'naoContem': {value: control.value}};
      if (lista.includes(control.value)) return null;
      return error
    }
  }

}
