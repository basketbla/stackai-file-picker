/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FeedbackMessage = {
    type: FeedbackMessage.type;
    comment?: (string | null);
};
export namespace FeedbackMessage {
    export enum type {
        POSITIVE = 'positive',
        NEGATIVE = 'negative',
    }
}

