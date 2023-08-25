import {AbstractControl} from "@angular/forms";
import {FormMaskControl} from "./form/formMask.control";

export class MaskUtils {

  static updateFormMaskControl(control: AbstractControl, value: any) {
    let maskControl = control as FormMaskControl;
    try {
      maskControl.setModelValue(value == null ? null : value.toString());
      maskControl.refresh()
    } catch (err) {
      maskControl.setModelValue(value);
      console.log(err);
    }
  }

  static parse(v: string, mask: any): any {
    if (mask.money || mask.percent) {
      return this.parseDecimal(v, mask);
    } else {
      return this.parseNotDecimal(v);
    }
  }

  static format(v: any, mask: any): string {
    if (mask.money || mask.percent) {
      return this.formatDecimal(v, mask);
    } else {
      return this.formatNotDecimal(v, mask);
    }
  }

  static prepareIfDecimalValue(v: any, mask: any): any {
    if (mask.money || mask.percent) {
      if (v == null) {
        return null;
      }

      // v = v == null ? 0 : v;
      let dec = mask.decimal ? mask.decimal : 2;
      if (typeof v === 'string') {
        if (v != "") {
          v = parseFloat(v).toFixed(dec);
        }
      } else {
        v = v.toFixed(dec);
      }
    }
    return v;
  }

  static getDecimal(mask: any): number {
    return mask.decimal ? mask.decimal : 2;
  }

  static getSymbol(mask: any): string {
    return mask.symbol ? mask.symbol + ' ' : '';
  }

  static parseDecimal(v: string, mask: any): number {
    if (v == null || v == '') {
      return null;
    }
    let num = this.parseNotDecimal(v);
    let dec = this.getDecimal(mask);
    if (num.length > dec) {
      let pos = num.length - dec;
      num = num.substring(0, pos) + '.' + num.substring(pos);
    }
    return Number(num);
  }

  static formatDecimal(v: any, mask: any): string {
    if (v == null) {
      return null;
    }

    if (v == 0) {
      return this.getSymbol(mask);
    }

    v = v.toString();
    let s = v.replace(/\D/g, '');
    let r = '';
    let d = 5;
    for (let i = (s.length - 1); i > -1; i--) {
      let c = s[i];
      if (i == (s.length - 3)) {
        r = ',' + r;
      }
      if (d == 0) {
        r = '.' + r;
        d = 3;
      }
      d--;
      r = c + r;
    }
    if (mask.percent) return (v < 0 ? '-' : '') + r + this.getSymbol(mask);
    return this.getSymbol(mask) + (v < 0 ? '-' : '') + r;
  }

  static parseNotDecimal(v: string): string {
    if (v == null || v == '') {
      return v;
    }
    return v.replace(/\D/g, '');
  }

  static formatNotDecimal(v: string, mask: any): string {
    if (v == null || v == '') {
      return v;
    }
    let s: string = '';
    const matches = v.match(/[a-zA-Z0-9]+/g);
    if (matches !== null) {
      let value = matches.join('').split('');
      const chars = mask.mask.split('');
      for (let c of chars) {
        if (value.length === 0) {
          break;
        }
        switch (c) {
          case '#':
            s += value[0];
            value = value.slice(1);
            s = s.toUpperCase();
            break;

          case '9':
            if (value[0].match(/\d/) !== null) {
              s += value[0];
              value = value.slice(1);
            }
            break;

          case 'A':
            if (value[0].match(/[a-zA-Z]/) !== null) {
              s += value[0];
              value = value.slice(1);
              s = s.toUpperCase();
            }
            break;

          default:
            s += c;
        }
      }
    }
    return s;
  }

}
