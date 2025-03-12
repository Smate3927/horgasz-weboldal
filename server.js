const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // UUID generálás

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const storage = multer.diskStorage({
    destination: './public/kepek/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Adatok betöltése fájlból
let fogasok = [];
try {
    const data = fs.readFileSync('fogasok.json');
    fogasok = JSON.parse(data);
} catch (err) {
    console.log('Nem sikerült betölteni a fogásokat a fájlból.');
}

// ID-k generálása a meglévő fogásokhoz
fogasok = fogasok.map(fogas => {
    if (!fogas.id) {
        fogas.id = uuidv4();
    }
    return fogas;
});

// Adatok mentése fájlba
function saveFogasok() {
    fs.writeFileSync('fogasok.json', JSON.stringify(fogasok));
}

app.post('/feltoltes', upload.array('kepek', 12), (req, res) => {
    const ujFogas = {
        id: uuidv4(), // Egyedi ID generálása
        halfaj: req.body.halfaj,
        suly: req.body.suly,
        hossz: req.body.hossz,
        helyszin: req.body.helyszin,
        datum: req.body.datum,
        csali: req.body.csali,
        kep: req.files && req.files.length > 0 ? '/kepek/' + req.files[0].filename : null
    };
    fogasok.push(ujFogas);
    saveFogasok(); // Adatok mentése
    res.json({ message: 'Fogás sikeresen rögzítve!' });
});

app.get('/fogasok', (req, res) => {
    res.json(fogasok);
});

app.get('/kepek', (req, res) => {
    fs.readdir('./public/kepek/', (err, files) => {
        if (err) {
            res.json([]);
        } else {
            const kepek = files.map(file => '/kepek/' + file);
            res.json(kepek);
        }
    });
});

// Fogás törlése
app.delete('/fogasok/:id', (req, res) => {
    const { id } = req.params;
    fogasok = fogasok.filter(fogas => fogas.id !== id);
    saveFogasok();
    res.json({ message: 'Fogás sikeresen törölve!' });
});

app.listen(port, () => {
    console.log(`A szerver fut a ${port} porton!`);
    saveFogasok(); // Adatok mentése a szerver indításakor
});