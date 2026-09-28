export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      contact_messages: {
        Row: {
          budget: string | null;
          company: string | null;
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
          phone: string | null;
          service: string;
          status: string;
        };
        Insert: {
          budget?: string | null;
          company?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          message: string;
          name: string;
          phone?: string | null;
          service: string;
          status?: string;
        };
        Update: {
          budget?: string | null;
          company?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
          phone?: string | null;
          service?: string;
          status?: string;
        };
        Relationships: [];
      };
      faqs: {
        Row: {
          answer: string;
          category: string;
          created_at: string;
          id: string;
          is_published: boolean;
          question: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          answer: string;
          category?: string;
          created_at?: string;
          id?: string;
          is_published?: boolean;
          question: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          answer?: string;
          category?: string;
          created_at?: string;
          id?: string;
          is_published?: boolean;
          question?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          admin_note: string | null;
          amount: number;
          bkash_sender_number: string;
          created_at: string;
          customer_name: string;
          customer_phone: string;
          id: string;
          note: string | null;
          payment_status: Database["public"]["Enums"]["payment_status"];
          product_id: string;
          status: Database["public"]["Enums"]["order_status"];
          trx_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          admin_note?: string | null;
          amount: number;
          bkash_sender_number: string;
          created_at?: string;
          customer_name: string;
          customer_phone: string;
          id?: string;
          note?: string | null;
          payment_status?: Database["public"]["Enums"]["payment_status"];
          product_id: string;
          status?: Database["public"]["Enums"]["order_status"];
          trx_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          admin_note?: string | null;
          amount?: number;
          bkash_sender_number?: string;
          created_at?: string;
          customer_name?: string;
          customer_phone?: string;
          id?: string;
          note?: string | null;
          payment_status?: Database["public"]["Enums"]["payment_status"];
          product_id?: string;
          status?: Database["public"]["Enums"]["order_status"];
          trx_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          category: string;
          created_at: string;
          delivery_url: string | null;
          description: string;
          features: Json;
          gallery: Json;
          id: string;
          image_url: string | null;
          includes: Json;
          is_published: boolean;
          old_price: number | null;
          price: number;
          rating: number;
          requirements: Json;
          sales_count: number;
          slug: string;
          sort_order: number;
          status: string;
          subtitle: string;
          technologies: Json;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          delivery_url?: string | null;
          description: string;
          features?: Json;
          gallery?: Json;
          id?: string;
          image_url?: string | null;
          includes?: Json;
          is_published?: boolean;
          old_price?: number | null;
          price: number;
          rating?: number;
          requirements?: Json;
          sales_count?: number;
          slug: string;
          sort_order?: number;
          status?: string;
          subtitle: string;
          technologies?: Json;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          delivery_url?: string | null;
          description?: string;
          features?: Json;
          gallery?: Json;
          id?: string;
          image_url?: string | null;
          includes?: Json;
          is_published?: boolean;
          old_price?: number | null;
          price?: number;
          rating?: number;
          requirements?: Json;
          sales_count?: number;
          slug?: string;
          sort_order?: number;
          status?: string;
          subtitle?: string;
          technologies?: Json;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          full_name: string;
          id: string;
          is_blocked: boolean;
          phone: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string;
          id: string;
          is_blocked?: boolean;
          phone?: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string;
          id?: string;
          is_blocked?: boolean;
          phone?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          category: string;
          created_at: string;
          features: Json;
          gallery: Json;
          id: string;
          image_url: string | null;
          is_published: boolean;
          overview: string;
          problem: string;
          results: Json;
          slug: string;
          solution: string;
          sort_order: number;
          subtitle: string;
          technologies: Json;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          features?: Json;
          gallery?: Json;
          id?: string;
          image_url?: string | null;
          is_published?: boolean;
          overview: string;
          problem: string;
          results?: Json;
          slug: string;
          solution: string;
          sort_order?: number;
          subtitle: string;
          technologies?: Json;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          features?: Json;
          gallery?: Json;
          id?: string;
          image_url?: string | null;
          is_published?: boolean;
          overview?: string;
          problem?: string;
          results?: Json;
          slug?: string;
          solution?: string;
          sort_order?: number;
          subtitle?: string;
          technologies?: Json;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          avatar_url: string | null;
          company: string;
          created_at: string;
          id: string;
          is_placeholder: boolean;
          is_published: boolean;
          name: string;
          quote: string;
          rating: number;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          company?: string;
          created_at?: string;
          id?: string;
          is_placeholder?: boolean;
          is_published?: boolean;
          name: string;
          quote: string;
          rating?: number;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          company?: string;
          created_at?: string;
          id?: string;
          is_placeholder?: boolean;
          is_published?: boolean;
          name?: string;
          quote?: string;
          rating?: number;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          benefits: Json;
          created_at: string;
          description: string;
          icon: string;
          id: string;
          includes: Json;
          is_published: boolean;
          short_description: string;
          slug: string;
          sort_order: number;
          title: string;
          updated_at: string;
          use_cases: Json;
        };
        Insert: {
          benefits?: Json;
          created_at?: string;
          description: string;
          icon?: string;
          id?: string;
          includes?: Json;
          is_published?: boolean;
          short_description: string;
          slug: string;
          sort_order?: number;
          title: string;
          updated_at?: string;
          use_cases?: Json;
        };
        Update: {
          benefits?: Json;
          created_at?: string;
          description?: string;
          icon?: string;
          id?: string;
          includes?: Json;
          is_published?: boolean;
          short_description?: string;
          slug?: string;
          sort_order?: number;
          title?: string;
          updated_at?: string;
          use_cases?: Json;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          bkash_number: string;
          contact_email: string;
          id: number;
          is_public: boolean;
          site_texts: Json;
          social_links: Json;
          updated_at: string;
          whatsapp_number: string;
        };
        Insert: {
          bkash_number?: string;
          contact_email?: string;
          id?: number;
          is_public?: boolean;
          site_texts?: Json;
          social_links?: Json;
          updated_at?: string;
          whatsapp_number?: string;
        };
        Update: {
          bkash_number?: string;
          contact_email?: string;
          id?: number;
          is_public?: boolean;
          site_texts?: Json;
          social_links?: Json;
          updated_at?: string;
          whatsapp_number?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      app_role: "admin" | "user";
      order_status: "Pending" | "Confirmed" | "Processing" | "Completed" | "Cancelled";
      payment_status: "Submitted" | "Verified" | "Rejected";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      order_status: ["Pending", "Confirmed", "Processing", "Completed", "Cancelled"],
      payment_status: ["Submitted", "Verified", "Rejected"],
    },
  },
} as const;
