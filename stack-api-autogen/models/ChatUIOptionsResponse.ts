/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatConfigurationResponse } from './ChatConfigurationResponse';
import type { FieldNodeResponse } from './FieldNodeResponse';
import type { UIExportSecurityResponse } from './UIExportSecurityResponse';
import type { UITypeEnum } from './UITypeEnum';
export type ChatUIOptionsResponse = {
    name?: (string | null);
    ui_type?: (UITypeEnum | null);
    description?: (string | null);
    logo_url?: (string | null);
    disclaimer_message?: (string | null);
    custom_domain?: (string | null);
    welcome_message?: (string | null);
    inputs: Array<FieldNodeResponse>;
    outputs: Array<FieldNodeResponse>;
    theme?: string;
    security: (UIExportSecurityResponse | null);
    configuration?: ChatConfigurationResponse;
};

