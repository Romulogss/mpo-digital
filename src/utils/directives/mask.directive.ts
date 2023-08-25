import {Directive, HostListener, Input, OnInit} from "@angular/core";
import {FormMaskControl} from "../form/formMask.control";
import {NgControl} from "@angular/forms";
import {MaskUtils} from "../mask.utils";

@Directive({
  selector: '[wpemask]' // Attribute selector
})
export class MaskDirective implements OnInit {

  private maskControl: FormMaskControl;

  constructor(private control: NgControl) {
  }

  ngOnInit(): void {
    this.maskControl = this.control.control as FormMaskControl;
    this.maskControl.refresh = () => this.refresh();
    this.refresh();
  }

  refresh(): void {
    let v = this.maskControl.getModelValue();
    v = MaskUtils.prepareIfDecimalValue(v, this.maskControl.mask);
    this.maskControl.init(MaskUtils.format(v, this.maskControl.mask));
  }

  @HostListener('focus', ['$event'])
  onFocus($event: any) {
    this.updateMaks($event);
  }

  @HostListener('input', ['$event'])
  onInput($event: any) {
    this.updateMaks($event);
    this.updateModel($event);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    this.updateMaks($event);
    this.updateModel($event);
  }

  updateMaks($event: any) {
    $event.target.value = MaskUtils.format($event.target.value, this.maskControl.mask);
  }

  updateModel($event: any) {
    if (this.maskControl.mask.date) {
      this.maskControl.setModelValue($event.target.value);
    } else {
      this.maskControl.setModelValue(MaskUtils.parse($event.target.value, this.maskControl.mask));
    }

  }

}
