require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer'); 
const csv = require('csv-parser');
const fs = require('fs');

// Initialize MongoDB Connection
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to Content Service DB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Define MongoDB Schema and Model for Content
const contentSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    interactions: Number
});

const Content = mongoose.model('Content', contentSchema);

// Replace mock db methods with MongoDB Operations
const db = {
    save: async (data) => {
        return await Content.create(data);
    },
    findAll: async () => {
        return await Content.find();
    },
    findById: async (id) => {
        return await Content.findById(id);
    },
    updateById: async (id, data) => {
        return await Content.findByIdAndUpdate(id, data, { new: true });
    },
    deleteById: async (id) => {
        return await Content.findByIdAndDelete(id);
    },
    findNew: async () => {
        return await Content.find().sort({ date: -1 });
    },
    findTop: async () => {
        return await Content.find().sort({ interactions: -1 }).limit(10);
    }
};

// Middleware for CSV upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    const results = [];
    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    bufferStream.pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                await db.save(results);
                res.status(200).json({ message: 'Data ingested successfully', data: results });
            } catch (error) {
                res.status(500).json({ message: 'Error saving data', error });
            }
        });
});

router.get('/', async (req, res) => {
    try {
        const contents = await db.findAll();
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = await db.save(req.body);
        res.status(201).json({ message: 'Content added', data });
    } catch (error) {
        res.status(500).json({ message: 'Error saving content', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const content = await db.findById(req.params.id);
        if (content) {
            res.json(content);
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching content', error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await db.updateById(req.params.id, req.body);
        if (updated) {
            res.json({ message: 'Content updated', data: updated });
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating content', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await db.deleteById(req.params.id);
        if (deleted) {
            res.json({ message: 'Content deleted' });
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting content', error });
    }
});

router.get('/new', async (req, res) => {
    try {
        const contents = await db.findNew();
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching new content', error });
    }
});

router.get('/top', async (req, res) => {
    try {
        const contents = await db.findTop();
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top content', error });
    }
});

module.exports = router;
