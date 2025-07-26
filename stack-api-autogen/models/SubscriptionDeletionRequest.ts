/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Model representing a subscription deletion request.
 */
export type SubscriptionDeletionRequest = {
    /**
     * Email of the customer to delete subscription for
     */
    email: string;
    /**
     * Reason or feedback for the subscription cancellation
     */
    feedback: string;
};

