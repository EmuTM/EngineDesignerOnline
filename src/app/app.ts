import { ForwardRefFn, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


// NG_VALUE_ACCESSOR provider (brez tega ne dela ControlValueAccessor); eksportan v funkcijo, da lahko rabijo vsi in ni treba vsakič pisat cele kolobocije
export function NgValueAccessorProvider(_class: any): any {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: _class,
        multi: true
    };
}
