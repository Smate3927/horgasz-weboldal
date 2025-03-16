const vizteruletSelect = document.getElementById("vizterulet");
const halSelect = document.getElementById("hal");
const eredmenyDiv = document.getElementById("eredmeny");

const adatok = {
    Balaton: {
        csuka: { tilalmi_ido: "02. 03 - 04. 30.", meret: "legalább 45 cm", mennyiseg: "3 db", egyeb: "75 cm felett naponta 1 db tartható meg." },
        balin: { tilalmi_ido: "02. 17 - 04. 30.", meret: "legalább 45 cm", mennyiseg: "1 db", egyeb: "naponta 1 db tartható meg." },
        sügér: { tilalmi_ido: "02. 17 - 04. 30.", meret: "legalább 15 cm", mennyiseg: "2 kg", egyeb: "-" },
        fogassüllő: { tilalmi_ido: "02. 17 - 04. 30.", meret: "legalább 35 cm", mennyiseg: "3 db", egyeb: "70 cm felett naponta 1 db tartható meg." },
        kősüllő: { tilalmi_ido: "02. 17 - 06. 30.", meret: "legalább 25 cm", mennyiseg: "3 db", egyeb: "-" },
        garda: { tilalmi_ido: "04. 15 - 05. 30.", meret: "legalább 20 cm", mennyiseg: "3 kg", egyeb: "-" },
        domolykó: { tilalmi_ido: "04. 15 - 05. 30.", meret: "legalább 25 cm", mennyiseg: "3 kg", egyeb: "-" },
        jászkeszeg: { tilalmi_ido: "04. 15 - 05. 30.", meret: "legalább 20 cm", mennyiseg: "3 kg", egyeb: "-" },
        "szilvaorrú keszeg": { tilalmi_ido: "04. 15 - 05. 30.", meret: "legalább 20 cm", mennyiseg: "3 kg", egyeb: "-" },
        paduc: { tilalmi_ido: "04. 15 - 05. 30.", meret: "legalább 20 cm", mennyiseg: "3 kg", egyeb: "-" },
        márna: { tilalmi_ido: "04. 15 - 05. 30.", meret: "legalább 40 cm", mennyiseg: "3 db", egyeb: "-" },
        ponty: { tilalmi_ido: "05. 05 - 05. 30.", meret: "legalább 35 cm", mennyiseg: "3 db", egyeb: "70 cm felett minden példányt kötelező visszaengedni." },
        compó: { tilalmi_ido: "05. 05 - 06. 13.", meret: "legalább 25 cm", mennyiseg: "3 db", egyeb: "-" },
        harcsa: { tilalmi_ido: "05. 05 - 06. 13.", meret: "legalább 60 cm", mennyiseg: "3 db", egyeb: "A harcsa tilalmi ideje minden méretre vonatkozik." },
        "sebes pisztráng": { tilalmi_ido: "10. 01 - 03. 28.", meret: "legalább 22 cm", mennyiseg: "3 db", egyeb: "-" },
        menyhal: { tilalmi_ido: "Egész évben tilos megtartani!", meret: "-", mennyiseg: "-", egyeb: "-" },
    },
    Tomalom: {
        ponty: { tilalmi_ido: "felmentés alapján, nincs!", meret: "min. 30 cm - max. 55 cm db", mennyiseg: "-", egyeb: "-" },
        compó: { tilalmi_ido: "egész évben tilos megtartani!", meret: "-", mennyiseg: "-", egyeb: "-" },
        amur: { tilalmi_ido: "nincs megállapítva", meret: "min. 40 cm - max. 65 cm db", mennyiseg: "-", egyeb: "-" },
        csuka: { tilalmi_ido: "február 01-től - április 30-ig", meret: "min. 45 cm - max. 65 cm db", mennyiseg: "-", egyeb: "-" },
        fogassüllő: { tilalmi_ido: "február 01-től - április 30-ig", meret: "min. 35 cm - max. 55 cm db", mennyiseg: "-", egyeb: "-" },
        harcsa: { tilalmi_ido: "felmentés alapján, nincs!", meret: "legalább 60 cm db", mennyiseg: "-", egyeb: "-" },
        balin: { tilalmi_ido: "egész évben tilos megtartani!", meret: "-", mennyiseg: "-", egyeb: "-" },
        domolykó: { tilalmi_ido: "egész évben tilos megtartani!", meret: "-", mennyiseg: "-", egyeb: "-" },
        márna: { tilalmi_ido: "április 15-től - május 31-ig", meret: "legalább 40 cm db", mennyiseg: "-", egyeb: "-" },
        kősüllő: { tilalmi_ido: "március 01-től - június 30-ig", meret: "legalább 25 cm db", mennyiseg: "-", egyeb: "-" },
        menyhal: { tilalmi_ido: "nincs megállapítva", meret: "legalább 25 cm db", mennyiseg: "-", egyeb: "-" },
        "sebes pisztráng": { tilalmi_ido: "október 01-től - március 31-ig", meret: "legalább 22 cm db", mennyiseg: "-", egyeb: "-" },
        dévérkeszeg: { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        bagolykeszeg: { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        karikakeszeg: { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        laposkeszeg: { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        bodorka: { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        "vörösszárnyú keszeg": { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        sügér: { tilalmi_ido: "március 01-től - április 30-ig", meret: "legalább 15 cm db", mennyiseg: "-", egyeb: "-" },
    },
    Farkincasto: {
        ponty: { tilalmi_ido: "nincs", meret: "min. 30 cm", mennyiseg: "nincs", egyeb: "-" },
        süllő: { tilalmi_ido: "márc. 1 - ápr. 30.", meret: "min. 35 cm", mennyiseg: "nincs", egyeb: "-" },
        csuka: { tilalmi_ido: "febr. 15 - szept. 1.", meret: "min. 40 cm", mennyiseg: "nincs", egyeb: "-" },
        amur: { tilalmi_ido: "nincs", meret: "min. 40 cm", mennyiseg: "nincs", egyeb: "-" },
        balin: { tilalmi_ido: "márc. 1 - ápr. 30.", meret: "nincs", mennyiseg: "nincs", egyeb: "-" },
    },
    Fertoto: {
        ponty: { tilalmi_ido: "felmentés alapján, nincs!", meret: "min. 30 cm - max. 55 cm db", mennyiseg: "-", egyeb: "-" },
        compó: { tilalmi_ido: "egész évben tilos megtartani!", meret: "-", mennyiseg: "-", egyeb: "-" },
        amur: { tilalmi_ido: "nincs megállapítva", meret: "min. 40 cm - max. 65 cm db", mennyiseg: "-", egyeb: "-" },
        csuka: { tilalmi_ido: "február 01-től - április 30-ig", meret: "min. 45 cm - max. 65 cm db", mennyiseg: "-", egyeb: "-" },
        fogassüllő: { tilalmi_ido: "február 01-től - április 30-ig", meret: "min. 35 cm - max. 55 cm db", mennyiseg: "-", egyeb: "-" },
        harcsa: { tilalmi_ido: "felmentés alapján, nincs!", meret: "legalább 60 cm db", mennyiseg: "-", egyeb: "-" },
        balin: { tilalmi_ido: "egész évben tilos megtartani!", meret: "-", mennyiseg: "-", egyeb: "-" },
        domolykó: { tilalmi_ido: "egész évben tilos megtartani!", meret: "-", mennyiseg: "-", egyeb: "-" },
        márna: { tilalmi_ido: "április 15-től - május 31-ig", meret: "legalább 40 cm db", mennyiseg: "-", egyeb: "-" },
        kősüllő: { tilalmi_ido: "március 01-től - június 30-ig", meret: "legalább 25 cm db", mennyiseg: "-", egyeb: "-" },
        menyhal: { tilalmi_ido: "nincs megállapítva", meret: "legalább 25 cm db", mennyiseg: "-", egyeb: "-" },
        "sebes pisztráng": { tilalmi_ido: "október 01-től - március 31-ig", meret: "legalább 22 cm db", mennyiseg: "-", egyeb: "-" },
        dévérkeszeg: { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        bagolykeszeg: { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        karikakeszeg: { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        laposkeszeg: { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        bodorka: { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        "vörösszárnyú keszeg": { tilalmi_ido: "-", meret: "legfeljebb 25 cm kg", mennyiseg: "-", egyeb: "-" },
        sügér: { tilalmi_ido: "március 01-től - április 30-ig", meret: "legalább 15 cm db", mennyiseg: "-", egyeb: "-" },
    },
};

const linkek = {
    Balaton: "https://balatonihal.hu/balatoni-horgaszrend",
    Tomalom: "https://horgasz-sopron.hu/download/SVHE%20Horg%C3%A1szrend%20%202025.pdf",
    Fertoto: "https://horgasz-sopron.hu/download/SVHE%20Horg%C3%A1szrend%20%202025.pdf",
    Farkincasto: "https://www.farkincasto.hu/horgaszrend",
};

vizteruletSelect.addEventListener("change", function () {
    const vizterulet = vizteruletSelect.value;
    halSelect.innerHTML = '<option value="">Válassz...</option>';
    eredmenyDiv.textContent = "";

    if (adatok[vizterulet]) {
        for (const hal in adatok[vizterulet]) {
            const option = document.createElement("option");
            option.value = hal;
            option.textContent = hal;
            halSelect.appendChild(option);
        }
        if (linkek[vizterulet]) {
            eredmenyDiv.innerHTML = `<a href="${linkek[vizterulet]}" target="_blank">${vizterulet}i horgászrend</a>`;
        }
    }
});
halSelect.addEventListener("change", function () {
    const vizterulet = vizteruletSelect.value;
    const hal = halSelect.value;

    if (adatok[vizterulet] && adatok[vizterulet][hal]) {
        eredmenyDiv.innerHTML = `
            <p><strong>Halfaj neve:</strong> ${hal}</p>
            <p><strong>Fajlagos tilalmi időszak:</strong> ${adatok[vizterulet][hal].tilalmi_ido}</p>
            <p><strong>Kifogható méret:</strong> ${adatok[vizterulet][hal].meret}</p>
            <p><strong>Naponta kifogható mennyiség:</strong> ${adatok[vizterulet][hal].mennyiseg}</p>
            <p><strong>Egyéb korlátozás:</strong> ${adatok[vizterulet][hal].egyeb}</p>
        `;
    } else {
        if (linkek[vizterulet]) {
            eredmenyDiv.innerHTML = `<a href="<span class="math-inline">\{linkek\[vizterulet\]\}" target\="\_blank"\></span>{vizterulet}i horgászrend</a>`;
        } else {
            eredmenyDiv.textContent = "";
        }
    }
});

function szuresFogasok() {
    let szurok = {
        halfaj: document.getElementById('halfajSzuro').value,
        vizterulet: document.getElementById('vizteruletSzuro').value,
        csali: document.getElementById('csaliSzuro').value,
        datum: document.getElementById('datumSzuro').value
    };
    betoltottFogasok(szurok);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('ujFogasForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('/feltoltes', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Visszajelző üzenet megjelenítése
            const visszajelzesDiv = document.createElement('div');
            visszajelzesDiv.textContent = data.message;
            visszajelzesDiv.style.color = 'green';
            visszajelzesDiv.style.padding = '10px';
            visszajelzesDiv.style.background = '#e0f7e0'; // Világoszöld háttér
            document.getElementById('formContainer').prepend(visszajelzesDiv); // Üzenet a form elejére

            // Mezők kiürítése
            document.getElementById('ujFogasForm').reset();

            // Üzenet eltüntetése 3 másodperc után
            setTimeout(function() {
                visszajelzesDiv.remove();
            }, 3000);

            megjelenitGaleria(); // Galéria frissítése új fogás hozzáadása után
        })
        .catch(error => {
            console.error('Hiba történt:', error);

            // Hibaüzenet megjelenítése
            const hibaDiv = document.createElement('div');
            hibaDiv.textContent = 'Hiba történt a mentés során.';
            hibaDiv.style.color = 'red';
            hibaDiv.style.padding = '10px';
            hibaDiv.style.background = '#ffe0e0'; // Világospiros háttér
            document.getElementById('formContainer').prepend(hibaDiv);

            // Hibaüzenet eltüntetése 3 másodperc után
            setTimeout(function() {
                hibaDiv.remove();
            }, 3000);
        });
    });

    betoltottFogasok();
});

function megjelenitGaleria() {
    fetch('/kepek')
        .then(response => response.json())
        .then(kepek => {
            const galeria = document.getElementById('kepGaleria');
            galeria.innerHTML = '';

            kepek.forEach(kep => {
                const img = document.createElement('img');
                img.src = '/kepek/' + kep;
                img.style.maxWidth = '200px';
                img.style.margin = '5px';
                galeria.appendChild(img);
            });
        })
        .catch(error => {
            console.error('Hiba történt a képek lekérésekor:', error);
        });
}

megjelenitGaleria();

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});