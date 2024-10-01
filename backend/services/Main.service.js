const { validationResult } = require('express-validator');
const { v4 } = require('uuid');

class MainService {
    static notes = [];

    getTable(req, res) {
        try {
            res.json({
                success: true,
                notes: MainService.notes,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Try again later!', error });
        }
    }

    addInTable(req, res) {
        try {      
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                return res.status(400).json(errors.array());
            }
            const id = v4();
            MainService.notes.push({
                ...req.body,
                id,
            });
            res.json({
                success: true,
                notes: MainService.notes,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Try again later!', error });
        }
    }

    deleteById(req, res) {
        try {
            const { id } = req.body;
            MainService.notes = MainService.notes.filter(note => note.id !== id);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Try again later!', error });
        }
    }

    updateById(req, res) {
        try {
            const { id } = req.body;
            const noteIndex = MainService.notes.findIndex(note => note.id === id);
            if (noteIndex !== -1) {
                MainService.notes[noteIndex] = { ...MainService.notes[noteIndex], ...req.body };
            }
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Try again later!', error });
        }
    }
}

module.exports = new MainService();