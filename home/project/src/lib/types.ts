export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          location: string;
          date: string;
          time: string;
          package: string;
          occasion: string;
          occasion_details: Record<string, any>;
          cake: string | null;
          needs_package: boolean;
          additional_options: Record<string, any>;
          total_price: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          location: string;
          date: string;
          time: string;
          package: string;
          occasion: string;
          occasion_details?: Record<string, any>;
          cake?: string | null;
          needs_package?: boolean;
          additional_options?: Record<string, any>;
          total_price: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          location?: string;
          date?: string;
          time?: string;
          package?: string;
          occasion?: string;
          occasion_details?: Record<string, any>;
          cake?: string | null;
          needs_package?: boolean;
          additional_options?: Record<string, any>;
          total_price?: number;
          status?: string;
          created_at?: string;
        };
      };
    };
  };
}