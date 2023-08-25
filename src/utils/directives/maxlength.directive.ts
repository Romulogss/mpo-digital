import {Directive, HostListener, Input, OnInit} from '@angular/core';
import {FormControl, NgControl} from '@angular/forms';

@Directive({
  selector: '[wpe-maxlength]'
})
export class MaxlengthDirective implements OnInit {

  @Input() wpemaxlength: any;

  private formControl: FormControl;

  constructor(private control: NgControl) {
  }

  ngOnInit(): void {
    this.formControl = this.control.control as FormControl;
  }

  @HostListener('focus', ['$event'])
  onFocus($event: any) {
    this.updateInput($event);
  }

  @HostListener('input', ['$event'])
  onInput($event: any) {
    this.updateInput($event);
    this.updateModel($event);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    this.updateInput($event);
    this.updateModel($event);
  }

  updateInput($event: any) {
    $event.target.value = $event.target.value.slice(0, this.wpemaxlength);
  }

  updateModel($event: any) {
    this.formControl.setValue($event.target.value.slice(0, this.wpemaxlength));
  }

}
