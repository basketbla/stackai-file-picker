/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrganizationPlanBillingPeriod } from './OrganizationPlanBillingPeriod';
import type { OrganizationPlanEnum } from './OrganizationPlanEnum';
/**
 * Request to create a Stripe checkout session.
 */
export type CheckoutSessionCreationRequest = {
    plan: OrganizationPlanEnum;
    success_url: string;
    /**
     * Billing period for the plan
     */
    billing_period?: OrganizationPlanBillingPeriod;
};

