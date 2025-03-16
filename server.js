const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 4000; // Port beállítása a Render-hez

app.use(express.static('public'));
app.use(express.json());

const storage = multer.diskStorage({
    destination: './public/kepek/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

let fogasok = [];

// Adatok betöltése fájlból (aszinkron)
fs.readFile('fogasok.json', (err, data) => {
    if (err) {
        console.log('Nem sikerült betölteni a fogásokat a fájlból.');
    } else {
        try {
            fogasok = JSON.parse(data);
            // ID-k generálása a meglévő fogásokhoz
            fogasok = fogasok.map(fogas => {
                if (!fogas.id) {
                    fogas.id = uuidv4();
                }
                return fogas;
            });
        } catch (parseErr) {
            console.error('Hiba a fogások JSON parse-olásakor:', parseErr);
        }
    }
});

// Adatok mentése fájlba (aszinkron)
function saveFogasok() {
    fs.writeFile('fogasok.json', JSON.stringify(fogasok), (err) => {
        if (err) {
            console.error('Hiba a fogások mentésekor:', err);
        }
    });
}

app.post('/feltoltes', upload.array('kepek', 12), (req, res) => {
    console.log('Fogás feltöltése...');
    const ujFogas = {
        id: uuidv4(),
        halfaj: req.body.halfaj,
        suly: req.body.suly,
        hossz: req.body.hossz,
        helyszin: req.body.helyszin,
        datum: req.body.datum,
        csali: req.body.csali,
        kep: req.files && req.files.length > 0 ? '/kepek/' + req.files[0].filename : null
    };
    fogasok.push(ujFogas);
    saveFogasok();
    console.log('Fogás sikeresen rögzítve!');
    res.json({ message: 'Fogás sikeresen rögzítve!' });
});

app.get('/fogasok', (req, res) => {
    console.log('Fogások lekérése...');
    res.json(fogasok);
});

app.get('/kepek', (req, res) => {
    console.log('Képek lekérése...');
    fs.readdir('./public/kepek/', (err, files) => {
        if (err) {
            console.error('Hiba a képek olvasásakor:', err);
            res.status(500).json({ error: 'Hiba a képek olvasásakor.' });
        } else {
            const kepek = files.map(file => '/kepek/' + file);
            res.json(kepek);
        }
    });
});

app.delete('/fogasok/:id', (req, res) => {
    console.log('Fogás törlése...');
    const { id } = req.params;
    fogasok = fogasok.filter(fogas => fogas.id !== id);
    saveFogasok();
    console.log('Fogás sikeresen törölve!');
    res.json({ message: 'Fogás sikeresen törölve!' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`A szerver fut a ${port} porton!`);
});
