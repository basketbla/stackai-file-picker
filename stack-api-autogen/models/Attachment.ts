/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Attachment = {
    id: string;
    type: Attachment.type;
    name: string;
    content_type: string;
    url: string;
};
export namespace Attachment {
    export enum type {
        IMAGE = 'image',
        DOCUMENT = 'document',
        FILE = 'file',
    }
}

