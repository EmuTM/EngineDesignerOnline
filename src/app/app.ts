import { ForwardRefFn, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


// NG_VALUE_ACCESSOR provider (brez tega ne dela ControlValueAccessor); eksportan v funkcijo, da lahko rabijo vsi
export function NgValueAccessorProvider(forwardRefFn: ForwardRefFn): any {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(forwardRefFn),
        multi: true
    };
}
