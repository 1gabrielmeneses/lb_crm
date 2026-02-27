export type Profile = {
  id: string;
  full_name: string;
  role: 'admin' | 'corretor' | 'gestor';
  avatar_url: string | null;
  is_online: boolean;
  created_at: string;
  updated_at: string;
};

export type Company = {
  id: string;
  name: string;
  type: 'imobiliaria' | 'construtora' | 'investidor' | null;
  total_volume: number;
  created_at: string;
  updated_at: string;
};

export type LeadStage = 'lista' | 'lead' | 'mql' | 'sal' | 'sql' | 'ganho' | 'perdido';

export type Lead = {
  id: string;
  name: string;
  company_id: string | null;
  company_name: string | null;
  value: number | null;
  stage: LeadStage;
  stage_order: number;
  assigned_to: string | null;
  starred: boolean;
  tags: string[];
  avatar_bg: string | null;
  initials: string | null;
  created_at: string;
  updated_at: string;
};

export type Conversation = {
  id: string;
  lead_id: string | null;
  channel: 'internal' | 'whatsapp';
  last_message_at: string | null;
  created_at: string;
};

export type ConversationParticipant = {
  id: string;
  conversation_id: string;
  user_id: string;
  unread_count: number;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read_by: string[];
  created_at: string;
};

export type ActivityAction = 'visit_scheduled' | 'stage_changed' | 'contract_signed';

export type Activity = {
  id: string;
  actor_id: string;
  lead_id: string | null;
  action: ActivityAction;
  description: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};
