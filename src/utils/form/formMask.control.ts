import {FormControl, ValidatorFn} from "@angular/forms";

export class FormMaskControl extends FormControl {

  refresh: Function;

  constructor(public model?: any, public attrName?: any, private _mask?: any, validator?: ValidatorFn | ValidatorFn[] | null) {
    super();
  }

  get mask(): any {
    if (typeof this._mask === 'function') {
      return this._mask();
    } else {
      return this._mask;
    }
  }

  init(v: string) {
    super.setValue(v);
  }

  setModelValue(v: any) {
    console.log(this.model)
    if (this.model) {
      if (this.attrName == null || this.attrName === '') {
        this.model = v;
      } else if (typeof this.attrName === 'object') {
        this.attrName['set'](v);
      } else {
        this.model[this.attrName] = v;
      }
    }
  }

  getModelValue(): any {
    if (this.model) {
      if (this.attrName == null || this.attrName === '') {
        return this.model;
      } else if (typeof this.attrName === 'object') {
        return this.attrName['get']();
      } else {
        return this.model[this.attrName];
      }
    }
  }

}
