/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StringListOption } from './StringListOption';
/**
 * A property that contains a list of strings. Can be used to store tags as well.
 */
export type StringListProperty_Input = {
    type?: string;
    description?: string;
    /**
     * Order of the property in the schema, used for sorting in the frontend
     */
    order?: number;
    options?: Array<StringListOption>;
};

