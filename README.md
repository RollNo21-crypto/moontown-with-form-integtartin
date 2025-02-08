# TheaterBook - Private Theater Booking Platform

A modern, full-stack web application for booking private theater experiences. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Customer Portal
- **Seamless Booking Process**
  - Multi-step booking form
  - Real-time price calculation
  - Instant booking confirmation
  - Downloadable booking receipts

- **Package Customization**
  - Multiple theater packages
  - Add-on services (decoration, photography, fog effects)
  - Special occasion setups
  - Custom cake selections

- **User Experience**
  - Responsive design
  - Interactive UI elements
  - Real-time validation
  - WhatsApp integration for support

### Admin Dashboard
- **Comprehensive Analytics**
  - Revenue tracking
  - Booking trends
  - Peak hours analysis
  - Conversion rates
  - Form completion tracking

- **Booking Management**
  - Real-time booking updates
  - Status management
  - Booking details view
  - Confirmation downloads

- **Activity Monitoring**
  - User engagement tracking
  - Form completion rates
  - Real-time activity feed
  - Advanced filtering

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - React Router

- **Backend**
  - Supabase
  - PostgreSQL
  - Row Level Security
  - Real-time subscriptions

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd theaterbook
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

### Supabase Setup

1. Create a new Supabase project
2. Run the migration files in the `supabase/migrations` directory
3. Set up authentication (email/password)
4. Configure Row Level Security policies

## Project Structure

```
src/
├── components/         # React components
│   ├── admin/         # Admin dashboard components
│   └── booking/       # Booking form components
├── lib/               # Utility libraries
├── pages/             # Page components
├── types/             # TypeScript types
└── utils/             # Helper functions

supabase/
└── migrations/        # Database migrations
```

## Key Features Documentation

### Booking System
- Multi-step form with validation
- Real-time price calculation
- Package customization
- Special occasion handling
- Instant confirmation system

### Admin Dashboard
- Revenue analytics
- Booking management
- User activity tracking
- Performance metrics
- Status management

### Security Features
- Row Level Security
- Admin authentication
- Data validation
- Secure API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@theaterbook.com or connect via WhatsApp at +94 776098948.