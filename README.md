# SimpleLotto

A lottery management system built with Node.js and MySQL.

## Features

- User management
- Game management
- Ticket management
- Transaction processing
- Admin panel

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database connection in `config/database.js`
4. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=your_port
JWT_SECRET=your_secret
```

## License

MIT 