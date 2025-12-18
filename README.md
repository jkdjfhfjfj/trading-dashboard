# Trading Dashboard

## Features
- Automatic Telegram → AI → cTrader trade execution
- Real-time trade monitoring dashboard
- PostgreSQL database for trade history
- Socket.io for live updates
- React frontend with Tailwind CSS

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- cTrader demo/live account
- Telegram API credentials
- OpenAI API key

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Configure environment variables in `.env` file

3. Run database migrations:
   ```bash
   psql -d tradingdb -f migrations/create_users.sql
   psql -d tradingdb -f migrations/create_trades.sql
   ```

4. Start backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

## Environment Variables

### Required Variables:
- `API_ID`: Telegram API ID
- `API_HASH`: Telegram API Hash
- `INVITE_LINK`: Telegram channel invite link
- `OPENAI_API_KEY`: OpenAI API key for signal parsing
- `CTRADER_CLIENT_ID`: cTrader client ID
- `CTRADER_CLIENT_SECRET`: cTrader client secret
- `CTRADER_USERNAME`: cTrader username
- `CTRADER_PASSWORD`: cTrader password
- `DATABASE_URL`: PostgreSQL connection string

## Usage

1. Start both backend and frontend servers
2. Configure Telegram settings in the dashboard
3. The system will automatically listen for signals in the configured Telegram channel
4. Signals are parsed using AI and executed on cTrader
5. Monitor trades in real-time through the dashboard

## Architecture

- **Backend**: Node.js/Express with Socket.io
- **Frontend**: React with Tailwind CSS
- **Database**: PostgreSQL
- **Trading Platform**: cTrader API
- **Messaging**: Telegram API
- **AI**: OpenAI GPT-4 for signal parsing

## Support

For issues or questions, please contact the development team.
# trading-dashboard
