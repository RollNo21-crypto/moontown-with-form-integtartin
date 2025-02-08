export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  date: string;
  time: string;
  package: string;
  occasion: string;
  occasion_details: Record<string, any>;
  cake: string;
  needs_package: string;
  additional_options: {
    decoration: boolean;
    fogEntry: string;
    photography: boolean;
  };
}