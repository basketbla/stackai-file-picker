/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanProperty } from './BooleanProperty';
import type { DateProperty } from './DateProperty';
import type { NumberProperty } from './NumberProperty';
import type { StringListOption } from './StringListOption';
import type { StringListProperty_Input } from './StringListProperty_Input';
import type { StringProperty } from './StringProperty';
export type PropertyUpdate = {
    new_name?: (string | null);
    new_type?: (StringProperty | NumberProperty | BooleanProperty | DateProperty | StringListProperty_Input | null);
    new_description?: (string | null);
    new_order?: (number | null);
    new_options?: (Array<StringListOption> | null);
};

