/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectTriggerStatus } from './ProjectTriggerStatus';
/**
 * A domain model representing the stored metadata of a Trigger.
 *
 * Attributes
 * ----------
 * - project_trigger_id (Mapped[uuid.UUID]): The ID of the instance of this trigger.
 * - project_id (Mapped[str]): The id of the project that should be executed by this trigger.
 * - connection_id (Mapped[ConnectionID | None]): The id of the connection that will be used by the trigger (if any).
 * - provider_id (Mapped[str]): The id of the provider that the trigger belongs to. ie: "stripe"
 * - trigger_id (Mapped[str]): The id of the Trigger class that will be used to execute this trigger
 * instance. ie: "on_customer_created" for the "stripe" provider in StackAI.
 * - webhook_data (Mapped[dict[str, Any] | None]): Used to keep track of the data of the webhook in the provider
 * platform when using webhook based triggers. ie: {"form_id": "43dc2afb", "webhook_tag": "stackai-webhook"}
 * in Typeform. Also used to keep track of the easycron job id for polling / scheduled triggers.
 * - cursor_data (Mapped[dict[str, Any] | None]): Used to keep track of the data of the cursor in the provider
 * platform when using polling based triggers. ie: {"last_processed_event_id": "1234567890"} or
 * {"last_processed_event_timestamp": "2025-03-02 10:30:09"}
 * May be None if the trigger is not a polling trigger. (e.g. webhook, scheduled, etc.)
 * - trigger_config (Mapped[dict[str, Any] | None]): Used to keep track of generic configuration parameters
 * for the trigger. ie: {"inbox_id": "ENTERPRISE_INBOX", "polling_frequency": "10000"}. As opposed to the action
 * nodes, we do not store the trigger config in the nodes themselves, but rather in this column.
 * - status (Mapped[TriggerStatus]): The status of the trigger: enabled/disabled.
 * - created_by (Mapped[uuid.UUID]): The user that created the trigger.
 * - updated_by (Mapped[uuid.UUID]): The user that updated the trigger.
 * - created_at (Mapped[datetime]): The date and time the trigger was created.
 * - updated_at (Mapped[datetime]): The date and time the trigger was updated.
 */
export type ProjectTrigger = {
    project_trigger_id?: string;
    project_id: string;
    connection_id?: (string | null);
    provider_id: string;
    trigger_id: string;
    webhook_data?: (Record<string, any> | null);
    cursor_data?: (Record<string, any> | null);
    trigger_config?: (Record<string, any> | null);
    status?: ProjectTriggerStatus;
    created_at?: string;
    updated_at?: string;
    created_by: string;
    updated_by?: (string | null);
};

