import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';


@Pipe({
    name: 'appCustomizablePipe',
    pure: true
})
export class CustomizablePipe implements PipeTransform {
    // {{ valueA | fn : componentMethodRef : valueB }} --> postane: null.componentMethodRef( valueA, valueB )
    public transform(value: any, functionReference: Function, ...args: any[]): any {
        // Due to the way pipes receive arguments, we may have inputs on both sides of the function reference. As such, let's join the two input sets.
        args.unshift(value);

        // the function reference will NOT BE INVOKED IN THE COMPONENT CONTEXT. As such, a component must bind the reference if it needs to use the "this" scope within the function body.
        return functionReference.apply(null, args);
    }

}
