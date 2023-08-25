import {FormControl} from '@angular/forms';
import {MaskUtils} from "../mask.utils";

export class MaskedFormControl extends FormControl {
  private readonly mask: string;

  constructor(maskPattern: any) {
    super('');
    this.mask = maskPattern;
  }

  setValue(value: any, options?: any): void {
    const maskedValue = this.applyMask(value);
    super.setValue(maskedValue, options);
  }

  private applyMask(inputValue: string): string {
    return MaskUtils.format(inputValue, this.mask);
  }
}
