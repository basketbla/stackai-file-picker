/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AgentBuilderService } from './services/AgentBuilderService';
import { AnalyticsService } from './services/AnalyticsService';
import { ChatService } from './services/ChatService';
import { ConnectionsService } from './services/ConnectionsService';
import { ConversationsService } from './services/ConversationsService';
import { CustomApiService } from './services/CustomApiService';
import { CustomToolsService } from './services/CustomToolsService';
import { DefaultService } from './services/DefaultService';
import { DocumentsService } from './services/DocumentsService';
import { FoldersService } from './services/FoldersService';
import { FormService } from './services/FormService';
import { GetMetadataFromARunService } from './services/GetMetadataFromARunService';
import { IntegrationsService } from './services/IntegrationsService';
import { InvitationsService } from './services/InvitationsService';
import { KnowledgeBaseService } from './services/KnowledgeBaseService';
import { KnowledgeBasesService } from './services/KnowledgeBasesService';
import { ManagerService } from './services/ManagerService';
import { MessagesService } from './services/MessagesService';
import { NotificationsService } from './services/NotificationsService';
import { OauthService } from './services/OauthService';
import { OrganizationPromptsService } from './services/OrganizationPromptsService';
import { ResourcesService } from './services/ResourcesService';
import { RunFlowService } from './services/RunFlowService';
import { StackaiToolsService } from './services/StackaiToolsService';
import { StorageService } from './services/StorageService';
import { StripeService } from './services/StripeService';
import { TasksService } from './services/TasksService';
import { TokenLimitsService } from './services/TokenLimitsService';
import { ToolsService } from './services/ToolsService';
import { TriggersService } from './services/TriggersService';
import { V2Service } from './services/V2Service';
import { WorkflowService } from './services/WorkflowService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class StackAiClient {
    public readonly agentBuilder: AgentBuilderService;
    public readonly analytics: AnalyticsService;
    public readonly chat: ChatService;
    public readonly connections: ConnectionsService;
    public readonly conversations: ConversationsService;
    public readonly customApi: CustomApiService;
    public readonly customTools: CustomToolsService;
    public readonly default: DefaultService;
    public readonly documents: DocumentsService;
    public readonly folders: FoldersService;
    public readonly form: FormService;
    public readonly getMetadataFromARun: GetMetadataFromARunService;
    public readonly integrations: IntegrationsService;
    public readonly invitations: InvitationsService;
    public readonly knowledgeBase: KnowledgeBaseService;
    public readonly knowledgeBases: KnowledgeBasesService;
    public readonly manager: ManagerService;
    public readonly messages: MessagesService;
    public readonly notifications: NotificationsService;
    public readonly oauth: OauthService;
    public readonly organizationPrompts: OrganizationPromptsService;
    public readonly resources: ResourcesService;
    public readonly runFlow: RunFlowService;
    public readonly stackaiTools: StackaiToolsService;
    public readonly storage: StorageService;
    public readonly stripe: StripeService;
    public readonly tasks: TasksService;
    public readonly tokenLimits: TokenLimitsService;
    public readonly tools: ToolsService;
    public readonly triggers: TriggersService;
    public readonly v2: V2Service;
    public readonly workflow: WorkflowService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '0.1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.agentBuilder = new AgentBuilderService(this.request);
        this.analytics = new AnalyticsService(this.request);
        this.chat = new ChatService(this.request);
        this.connections = new ConnectionsService(this.request);
        this.conversations = new ConversationsService(this.request);
        this.customApi = new CustomApiService(this.request);
        this.customTools = new CustomToolsService(this.request);
        this.default = new DefaultService(this.request);
        this.documents = new DocumentsService(this.request);
        this.folders = new FoldersService(this.request);
        this.form = new FormService(this.request);
        this.getMetadataFromARun = new GetMetadataFromARunService(this.request);
        this.integrations = new IntegrationsService(this.request);
        this.invitations = new InvitationsService(this.request);
        this.knowledgeBase = new KnowledgeBaseService(this.request);
        this.knowledgeBases = new KnowledgeBasesService(this.request);
        this.manager = new ManagerService(this.request);
        this.messages = new MessagesService(this.request);
        this.notifications = new NotificationsService(this.request);
        this.oauth = new OauthService(this.request);
        this.organizationPrompts = new OrganizationPromptsService(this.request);
        this.resources = new ResourcesService(this.request);
        this.runFlow = new RunFlowService(this.request);
        this.stackaiTools = new StackaiToolsService(this.request);
        this.storage = new StorageService(this.request);
        this.stripe = new StripeService(this.request);
        this.tasks = new TasksService(this.request);
        this.tokenLimits = new TokenLimitsService(this.request);
        this.tools = new ToolsService(this.request);
        this.triggers = new TriggersService(this.request);
        this.v2 = new V2Service(this.request);
        this.workflow = new WorkflowService(this.request);
    }
}

