const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const config = require('../config/database');
const passport = require('passport');

const WinningGameSchema = mongoose.Schema({
    game_id:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    draw_date: {
        type: String,
        required: true
    },
    amount_won:{
        type: Number,
        required: true
    },
    ticket_status:{
        type: String,
        required: true
    }
});

const WinningGames = module.exports = mongoose.model('WinningGames', WinningGameSchema);

module.exports.addWinningTicket = function(newWinningGame, callback){
    newWinningGame.save(callback);
}

module.exports.pastWinningTickets = function(callback){
    WinningGames.find(callback);
}

// Create MySQL connection pool
const pool = mysql.createPool(config.database);

// Get all winning tickets (root route)
router.get('/', async (req, res) => {
    try {
        console.log('==== /winning-tickets endpoint hit - fetching ONLY won tickets ====');
        const connection = await pool.getConnection();
        
        // Get all winning tickets with user details
        const [rows] = await connection.query(`
            SELECT 
                t.*,
                u.username,
                u.firstname,
                u.surname
            FROM tickets t
            LEFT JOIN users u ON t.user_id = u.id
            WHERE t.ticket_status = 'won'
            ORDER BY t.created_at DESC
        `);
        
        connection.release();
        
        console.log(`Found ${rows.length} winning tickets`);
        console.log('First few tickets:', rows.slice(0, 3).map(t => ({ id: t.id, status: t.ticket_status })));
        
        res.json({ 
            success: true, 
            tickets: rows
        });
    } catch (error) {
        console.error('Get winning tickets error:', error);
        res.status(500).json({ success: false, msg: 'Error fetching winning tickets' });
    }
});

// Get user's winning tickets
router.get('/my-winnings', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        console.log('==== /winning-tickets/my-winnings endpoint hit - fetching ONLY won tickets ====');
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            `SELECT t.*, g.game_type, g.draw_date, g.draw_time 
            FROM tickets t 
            JOIN games g ON t.game_id = g.id 
            WHERE t.user_id = ? AND t.ticket_status = 'won' 
            ORDER BY t.created_at DESC`,
            [req.user.id]
        );
        connection.release();
        console.log(`Found ${rows.length} winning tickets for user ${req.user.id}`);
        console.log('First few tickets:', rows.slice(0, 3).map(t => ({ id: t.id, status: t.ticket_status })));
        res.json({ success: true, winningTickets: rows });
    } catch (error) {
        console.error('Get winning tickets error:', error);
        res.status(500).json({ success: false, msg: 'Error fetching winning tickets' });
    }
});

// Get winning ticket details
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        console.log('==== /winning-tickets/:id endpoint hit - fetching specific won ticket ====');
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            `SELECT t.*, g.game_type, g.draw_date, g.draw_time 
            FROM tickets t 
            JOIN games g ON t.game_id = g.id 
            WHERE t.id = ? AND t.user_id = ? AND t.ticket_status = 'won'`,
            [req.params.id, req.user.id]
        );
        connection.release();

        if (rows.length === 0) {
            console.log(`No winning ticket found with id ${req.params.id} for user ${req.user.id}`);
            return res.json({ success: false, msg: 'Winning ticket not found' });
        }

        console.log(`Found winning ticket:`, { id: rows[0].id, status: rows[0].ticket_status });
        res.json({ success: true, winningTicket: rows[0] });
    } catch (error) {
        console.error('Get winning ticket error:', error);
        res.status(500).json({ success: false, msg: 'Error fetching winning ticket' });
    }
});

// Get winning summary
router.get('/summary', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        console.log('==== /winning-tickets/summary endpoint hit - fetching winning summary ====');
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            `SELECT 
                COUNT(*) as total_wins,
                SUM(amount) as total_winnings,
                MAX(amount) as highest_win,
                MIN(amount) as lowest_win
            FROM tickets 
            WHERE user_id = ? AND ticket_status = 'won'`,
            [req.user.id]
        );
        connection.release();

        console.log(`Found winning summary for user ${req.user.id}:`, rows[0]);
        res.json({ success: true, summary: rows[0] });
    } catch (error) {
        console.error('Get winning summary error:', error);
        res.status(500).json({ success: false, msg: 'Error fetching winning summary' });
    }
});

module.exports = router;