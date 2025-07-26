/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckoutSessionCreationRequest } from '../models/CheckoutSessionCreationRequest';
import type { CheckoutSessionCreationResponse } from '../models/CheckoutSessionCreationResponse';
import type { CustomerPortalRequest } from '../models/CustomerPortalRequest';
import type { CustomerPortalResponse } from '../models/CustomerPortalResponse';
import type { SubscriptionDeletionRequest } from '../models/SubscriptionDeletionRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StripeService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Stripe Webhook
     * Manage Stripe webhooks.
     * @returns any Successful Response
     * @throws ApiError
     */
    public stripeWebhookStripeWebhookPost(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/stripe/webhook',
        });
    }
    /**
     * Stripe Checkout Session
     * Create a Stripe checkout session.
     * @param requestBody
     * @returns CheckoutSessionCreationResponse Successful Response
     * @throws ApiError
     */
    public stripeCheckoutSessionStripeCheckoutSessionPost(
        requestBody: CheckoutSessionCreationRequest,
    ): CancelablePromise<CheckoutSessionCreationResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/stripe/checkout-session',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Stripe Subscription Delete
     * Manage Stripe subscription delete webhooks.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public stripeSubscriptionDeleteStripeSubscriptionDelete(
        requestBody: SubscriptionDeletionRequest,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/stripe/subscription',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Stripe Customer Portal Session
     * Create a Stripe customer portal session.
     * @param requestBody
     * @returns CustomerPortalResponse Successful Response
     * @throws ApiError
     */
    public stripeCustomerPortalSessionStripeCustomerPortalSessionPost(
        requestBody: CustomerPortalRequest,
    ): CancelablePromise<CustomerPortalResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/stripe/customer-portal-session',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
