export interface UserSettings {
  knowledge_base_id: string;
  connection_id: string;
  created_at: string;
  updated_at: string;
  connection_source_ids: string[];
  website_sources: string[];
  connection_provider_type: string;
  is_empty: boolean;
  total_size: number;
  name: string;
  description: string;
  indexing_params: {
    ocr: boolean;
    unstructured: boolean;
    embedding_params: {
      api: string | null;
      base_url: string | null;
      embedding_model: string;
      batch_size: number;
      track_usage: boolean;
      timeout: number;
    };
    chunker_params: {
      chunk_size: number;
      chunk_overlap: number;
      chunker_type: string;
    };
  };
  cron_job_id: string | null;
  org_id: string;
  org_level_role: string | null;
  user_metadata_schema: unknown | null;
  dataloader_metadata_schema: unknown | null;
}

export const USER_SETTINGS: UserSettings = {
  knowledge_base_id: '9f53171b-d3b1-4156-8c1b-4c2dc65f72f2',
  connection_id: 'eafe2c77-3eb3-4538-8e3c-40a0fd441bc0',
  created_at: '2025-07-27T18:16:32.099948Z',
  updated_at: '2025-07-27T18:16:32.099955Z',
  connection_source_ids: [],
  website_sources: [],
  connection_provider_type: 'gdrive',
  is_empty: true,
  total_size: 0,
  name: 'Test Knowledge Base',
  description: 'This is a test knowledge base',
  indexing_params: {
    ocr: false,
    unstructured: true,
    embedding_params: {
      api: null,
      base_url: null,
      embedding_model: 'text-embedding-ada-002',
      batch_size: 300,
      track_usage: true,
      timeout: 5,
    },
    chunker_params: {
      chunk_size: 1500,
      chunk_overlap: 500,
      chunker_type: 'sentence',
    },
  },
  cron_job_id: null,
  org_id: '0d582f36-52dd-403f-a38a-ccf4dfa06180',
  org_level_role: null,
  user_metadata_schema: null,
  dataloader_metadata_schema: null,
}; 