/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export type Database = {
  public: {
    Tables: {
      chat_rooms: {
        Row: {
          created_at: string;
          id: string;
          updated_at: string;
          user_one_id: string;
          user_two_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          updated_at?: string;
          user_one_id: string;
          user_two_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          updated_at?: string;
          user_one_id?: string;
          user_two_id?: string;
        };
        Relationships: [];
      };
      friends_lists: {
        Row: {
          created_at: string;
          id: string;
          status: string;
          updated_at: string;
          user_one_id: string;
          user_two_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          status: string;
          updated_at: string;
          user_one_id: string;
          user_two_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          status?: string;
          updated_at?: string;
          user_one_id?: string;
          user_two_id?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          message_list_id: string;
          status: string;
          type: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          message_list_id: string;
          status: string;
          type: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          message_list_id?: string;
          status?: string;
          type?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_message_list_id_fkey';
            columns: ['message_list_id'];
            isOneToOne: false;
            referencedRelation: 'messages_lists';
            referencedColumns: ['id'];
          },
        ];
      };
      messages_lists: {
        Row: {
          chat_room_id: string;
          created_at: string;
          id: string;
          updated_at: string;
        };
        Insert: {
          chat_room_id: string;
          created_at?: string;
          id?: string;
          updated_at: string;
        };
        Update: {
          chat_room_id?: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_lists_chat_room_id_fkey';
            columns: ['chat_room_id'];
            isOneToOne: false;
            referencedRelation: 'chat_rooms';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
