import {Directive, HostListener, Input, OnInit} from '@angular/core';
import {FormControl, NgControl} from '@angular/forms';

@Directive({
  selector: '[wpe-maxpercent]'
})
export class MaxPercentDirective implements OnInit {

  @Input() maxpercent: number;

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

    this.getValor($event);

  }

  updateModel($event: any) {
    this.formControl.setValue(this.getValor($event));
  }

  getValor($event: any): number {

    let val = $event.target.value;

    let str: string[] = val.split(' ');

    if (str[1]) {

      let num: number = parseFloat(str[1].replace(',', '.'));

      if (num > this.maxpercent) {

        let pts: string[] = this.maxpercent.toString().split('.');
        let percent = str[0] + ' ' + pts[0];
        //console.log(pts);

        if (pts[1] != null) {
          percent = percent + pts[1].substring(0, 2);
        } else {
          percent = percent + '00';
        }

        $event.target.value = percent;
      }
    }

    return $event.target.value;

  }

}
