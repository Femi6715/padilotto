const express = require('express');
const router = express.Router();
const passport = require('passport');
const WinningTicket = require('../models/mysql/winning_ticket');
const User = require('../models/mysql/user');
const Game = require('../models/mysql/game');

// Get all winning tickets
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const winningTickets = await WinningTicket.findAll({
            where: {
                ticket_status: 'won'
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'firstname', 'surname']
                },
                {
                    model: Game,
                    attributes: ['ticket_id', 'stake_amt', 'draw_date']
                }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, winningTickets });
    } catch (error) {
        console.error('Get winning tickets error:', error);
        res.status(500).json({ success: false, msg: 'Failed to get winning tickets' });
    }
});

// Get user's winning tickets
router.get('/user/:userId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const winningTickets = await WinningTicket.findAll({
            where: { 
                user_id: req.params.userId,
                ticket_status: 'won'
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'firstname', 'surname']
                },
                {
                    model: Game,
                    attributes: ['ticket_id', 'stake_amt', 'draw_date']
                }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, winningTickets });
    } catch (error) {
        console.error('Get user winning tickets error:', error);
        res.status(500).json({ success: false, msg: 'Failed to get user winning tickets' });
    }
});

// Add winning ticket
router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { game_id, user_id, amount_won, draw_date } = req.body;

        const winningTicket = await WinningTicket.create({
            game_id,
            user_id,
            amount_won,
            draw_date,
            ticket_status: 'won'  // Ensure new tickets are created with won status
        });

        // Update user balance
        const user = await User.findByPk(user_id);
        if (user) {
            user.main_balance += amount_won;
            await user.save();
        }

        res.json({
            success: true,
            msg: 'Winning ticket added successfully',
            winningTicket
        });
    } catch (error) {
        console.error('Add winning ticket error:', error);
        res.status(500).json({ success: false, msg: 'Failed to add winning ticket' });
    }
});

module.exports = router;