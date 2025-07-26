/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FlowAccessControl } from './FlowAccessControl';
import type { SelectedTool } from './SelectedTool';
import type { SelectionItem } from './SelectionItem';
export type AgentBuilderRequest = {
    name: string;
    description: string;
    instructions: string;
    provider: string;
    llm_model: string;
    tools: Array<SelectedTool>;
    selected_items_by_knowledge_base: Record<string, Array<SelectionItem>>;
    conversation_starters: Array<string>;
    icon: string;
    use_citations: boolean;
    show_steps: boolean;
    enable_followups: boolean;
    log_with_sso: boolean;
    has_password: boolean;
    password: (string | null);
    sso_access: (FlowAccessControl | null);
    input_placeholder_message?: string;
};

