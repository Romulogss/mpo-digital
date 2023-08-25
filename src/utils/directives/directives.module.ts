import {NgModule} from '@angular/core';
import {MaskDirective} from "./mask.directive";
import {MaxlengthDirective} from "./maxlength.directive";
import {MaxPercentDirective} from "./maxpercent.directive";

@NgModule({
	declarations: [MaskDirective,MaxlengthDirective, MaxPercentDirective],
	imports: [],
	exports: [MaskDirective,MaxlengthDirective, MaxPercentDirective]
})
export class DirectivesModule {}
