/*
  Vocab Trainer
  ----------------
  Data is stored in localStorage, so the app works without a backend.

  Scheduling:
  - Left / didn't know: card goes back into the current pile randomly.
  - Right / knew it: streak increases by 1 and the next review is
    scheduled after 24h * streak.
    1 = 24h, 2 = 48h, 3 = 72h, etc.
  - A wrong answer resets the streak to 0.
*/

const STORAGE_KEY = "minimal-vocab-trainer-v1";

const STARTER_CARDS = [
["auch", "anche"],
["bitte", "per favore/prego"],
["Deutsch", "tedesco"],
["Deutschland", "Germania"],
["Englisch", "inglese"],
["Französisch", "francese"],
["Frau", "signora"],
["gut", "buono/bene"],
["heißen", "chiamarsi"],
["Herr", "signor(e)"],
["kommen (aus)", "venire (da)"],
["lernen", "imparare"],
["Name", "nome"],
["drucken", "stampare"],
["die Schweiz", "Svizzera"],
["sein", "essere/suo (agg.)"],
["sprechen", "parlare"],
["und", "e"],
["wohnen", "abitare"],
["Wer?", "Chi?"],
["Wie?", "Come?"],
["Wo?", "Dove?"],
["Woher?", "Da dove?"],
["Guten Morgen, Frau Müller!", "Buongiorno, signora Müller!"],
["Guten Tag, Herr Jones!", "Buongiorno, signor Jones!"],
["Hallo!", "Ciao!"],
["Hi!", "Ciao!"],
["Tschüss!", "Ciao! (saluto di congedo)"],
["Bis bald!", "A presto!"],
["Danke!", "Grazie!"],
["Mein Name ist …", "Mi chiamo..."],
["Wie geht es dir/Ihnen?", "Come stai/sta?"],
["Mir geht es (sehr) gut.", "Sto (molto) bene."],
["Welche Sprachen sprechen Sie?", "Quali lingue parla?"],
["Ich spreche ein bisschen Deutsch.", "Parlo un po’ di tedesco."],
["Und wer ist das?", ""],
["hier", "qui"],
["jetzt", "ora"],
["Land", "paese/stato"],
["Nachname", "cognome"],
["Sprache", "lingua"],
["Vorname", "nome"],
["Wohnort", "luogo di residenza"],
["Das ist … / Das sind …", "Questo è... / Questi sono..."],
["Auf Wiedersehen!", "Arrivederci!"],
["Ich lerne Deutsch.", ""],
["aber", "ma"],
["Adresse", "indirizzo"],
["Alter", "età"],
["buchstabieren", "sillabare"],
["Familienname", "nome di famiglia; cognome"],
["Hausnummer", "numero civico"],
["Jahr", "anno"],
["oder", "o"],
["Österreich", "Austria"],
["Postleitzahl (= PLZ)", "codice di avviamento postale (= CAP)"],
["Stadt", "città"],
["Straße", "strada/via"],
["Telefonnummer", "numero telefonico"],
["Muttersprache", "lingua madre"],
["ich bin … Jahre alt.", "ho ... anni."],
["Ich lebe in …", "Vivo a/in..."],
["Auf Wiederhören!", "A risentirci!"],
["Ist das richtig?", "È corretto?"],
["Vielen Dank!", "Grazie mille!"],
["Buch", "libro"],
["Computer", "computer"],
["Dialog", "dialogo"],
["Handy", "telefono cellulare"],
["hören", "ascoltare"],
["Kurs", "corso"],
["Kursleiter", "istruttore/formatore"],
["Kursleiterin", "istruttrice/formatrice"],
["lesen", "leggere"],
["sagen", "dire"],
["schreiben", "scrivere"],
["Text", "testo"],
["verstehen", "capire"],
["wiederholen", "ripetere"],
["Wort", "parola"],
["Frage", "domanda/questione"],
["Antwort", "risposta"],
["fragen", "domandare"],
["antworten", "rispondere"],
["öffnen", "aprire"],
["schließen", "chiudere"],
["ja", "sì"],
["nein", "no"],
["richtig", "corretto"],
["falsch", "errato; falso"],
["Was?", "Cosa?"],
["Entschuldigung!", "Mi scuso!"],
["Alles klar!", "Tutto chiaro!"],
["das ist mein Kursraum.", ""],
["Fenster", "Finestra"],
["finden", "trovare"],
["Flasche", "bottiglia"],
["Heft", "quaderno/manico"],
["Internet", "internet"],
["Kuli", "penna biro"],
["Kursraum", "aula"],
["Kursteilnehmer", "partecipante al corso (m.)"],
["Kursteilnehmerin", "partecipante al corso (f.)"],
["Lampe", "lampada"],
["Laptop", "notebook"],
["Lehrer", "insegnante (m.)"],
["Lehrerin", "insegnante (f.)"],
["Sprachschule", "scuola di lingue"],
["Stift", "matita"],
["Stuhl", "sedia"],
["super", "super"],
["Tablet", "tablet"],
["Tafel", "tavola"],
["Tasse", "tazza"],
["Tisch", "tavolo"],
["Tür", "porta"],
["Vokabelheft", "quaderno dei vocaboli"],
["Whiteboard", "lavagna (bianca)"],
["groß", "grande"],
["klein", "piccolo"],
["Es gibt …", "C’è/ci sono..."],
["Der Kurs macht Spaß!", "Il corso è divertente!"],
["So lerne ich.", ""],
["App", "app"],
["Artikel", "articolo"],
["Beispiel", "esempio"],
["Fehler", "errore"],
["Grammatik", "grammatica"],
["haben", "avere"],
["Karteikarte", "scheda"],
["Lernpartner", "compagno di studi"],
["Lernpartnerin", "compagna di studi"],
["Problem", "problema"],
["Regel", "regola"],
["Satz", "frase"],
["Tipp", "suggerimento"],
["Verb", "verbo"],
["Wortschatz", "vocabolario"],
["einfach", "facile"],
["schwierig", "difficile"],
["Fehler machen", "fare errori"],
["Hausaufgaben machen", "fare i compiti a casa"],
["Das hilft mir!", "Mi è di aiuto!"],
["Viel Spaß!", "Buon divertimento!"],
["fahren", "guidare"],
["Freizeit", "tempo libero"],
["Freund", "amico/fidanzato"],
["Freundin", "amica/fidanzata"],
["gehen", "andare"],
["heute", "oggi"],
["Hobby", "hobby"],
["laufen", "correre/andare a piedi"],
["Leute (Pl.)", "persone (pl.)"],
["manchmal", "a volte"],
["Musik", "musica"],
["neu", "nuovo"],
["oft", "spesso"],
["Radio", "radio"],
["schlafen", "dormire"],
["sehen", "vedere"],
["spielen", "giocare/suonare/recitare"],
["Sport", "sport"],
["tanzen", "ballare"],
["draußen", "fuori"],
["drinnen", "dentro"],
["interessant", "interessante"],
["langweilig", "noioso"],
["immer", "sempre"],
["nie", "mai"],
["Freunde treffen", "incontrare amici"],
["Fußball/Basketball spielen", "giocare a calcio/pallacanestro"],
["Gitarre/Klavier/ein Instrument spielen", "suonare la chitarra/il pianoforte/uno strumento"],
["ins Theater/ins Museum/auf ein Konzert gehen", "andare a teatro/al museo/a un concerto"],
["Motorrad fahren", "guidare la motocicletta"],
["Sport machen", "fare sport"],
["Ich treffe gern neue Leute.", "Mi piace incontrare persone nuove."],
["Abend", "sera"],
["Abendessen", "cena"],
["abends", "di sera"],
["Arbeit", "lavoro"],
["arbeiten", "lavorare"],
["aufstehen", "alzarsi"],
["aufwachen", "svegliarsi"],
["danach", "dopo"],
["dann", "poi"],
["duschen", "fare la doccia"],
["essen", "mangiare"],
["frühstücken", "fare colazione"],
["Universität", "università"],
["wandern", "girovagare"],
["Abend essen", "cenare"],
["schlafen gehen", "andare a dormire"],
["zur Arbeit gehen", "andare al lavoro"],
["Um wie viel Uhr?", "A che ora?"],
["Wann?", "Quando?"],
["Was machen wir am Wochenende?", ""],
["ausgehen", "uscire"],
["Geld", "denaro/soldi"],
["Kind", "bambino/bambina; figlio/figlia"],
["klettern", "arrampicarsi"],
["Mensch", "persona"],
["mitkommen", "accompagnare"],
["Stunde", "ora"],
["wichtig", "importante"],
["Woche", "settimana"],
["Wochenende", "fine settimana"],
["Zeit", "tempo/orario"],
["pro Woche", "a settimana"],
["Ich habe viel/wenig Freizeit.", "Ho molto/poco tempo libero"],
["backen", "cuocer al forno"],
["brauchen", "avere bisogno di qc."],
["Brokkoli", "broccoli"],
["denken", "pensare"],
["Fisch", "pesce"],
["Fleisch", "carne"],
["frisch", "fresco"],
["Gemüse", "verdure"],
["Getränk", "bevanda"],
["Glas", "vetro/bicchiere"],
["heute", "oggi"],
["Honig", "miele"],
["Kaffee", "caffè"],
["Kartoffel", "patata"],
["kochen", "cucinare"],
["lecker", "gustoso"],
["mögen", "potere/volere (v.)"],
["Möhre", "carota"],
["nicht", "non"],
["Nudeln (Pl.)", "pasta"],
["Öl", "olio"],
["Paprika", "peperone"],
["Pfanne", "panna"],
["Pfeffer", "pepe"],
["Pilz", "fungo"],
["Pizza", "pizza"],
["Reis", "viaggio"],
["Saft", "succo"],
["Salat", "insalata"],
["Salz", "sale"],
["schneiden", "tagliare"],
["sehr", "molto"],
["Soße", "salsa"],
["Suppe", "zuppa"],
["süß", "dolce"],
["Tee", "tè"],
["Tomate", "pomodoro"],
["trinken", "bere"],
["Wasser", "acqua"],
["Zwiebel", "cipolla"],
["gesund", "sano/in salute"],
["ungesund", "in cattiva salute"],
["Wir laden alle ein.", ""],
["Ei", "uovo"],
["Einkauf", "acquisto"],
["Einladung", "invito"],
["Joghurt", "yoghurt"],
["Milch", "latte"],
["morgen", "domani"],
["Torte", "torta"],
["vegetarisch", "vegetariano"],
["Wein", "vino"],
["Zucker", "zucchero"],
["mit", "con"],
["ohne", "senza"],
["Liebe Grüße!/Viele Grüße!", "Cari saluti/tanti saluti!"],
["Was brauchen wir?", ""],
["Apfel", "mela"],
["Banane", "banana"],
["bezahlen", "pagare"],
["Brot", "pane"],
["Butter", "burro"],
["Gurke", "cetriolo"],
["Käse", "formaggio"],
["kaufen", "comprare"],
["kosten", "costare"],
["Lebensmittel", "generi alimentari"],
["Mehl", "farina"],
["Obst", "frutta"],
["okay", "ok"],
["Orange", "arancia"],
["Packung", "pacco"],
["Supermarkt", "supermercato"],
["Auto", "automobile"],
["Bus", "autobus"],
["Fahrrad", "bicicletta"],
["Haltestelle", "fermata (di mezzi pubblici)"],
["Kino", "cinema"],
["klicken", "cliccare"],
["Minute", "minuto"],
["nachts", "di notte"],
["nehmen", "prendere"],
["nur", "solo"],
["Motorrad", "motocicletta"],
["Station", "stazione"],
["S-Bahn", "ferrovia urbana"],
["Straßenbahn", "tram"],
["suchen", "cercare"],
["Ticket", "biglietto"],
["U-Bahn", "metropolitana"],
["Verkehrmittel", "mezzo di trasporto"],
["Weg", "via"],
["Zug", "treno"],
["Eingang", "entrata"],
["Ausgang", "uscita"],
["zu Fuß gehen", "andare a piedi"],
["Ich hole dich ab.", "Passo a prenderti."],
["Hast du eine Empfehlung?", ""],
["Ampel", "semaforo"],
["aussteigen", "scendere (da un mezzo di trasporto)"],
["Bahnhof", "stazione ferroviaria"],
["Café", "caffè/bar"],
["dort", "lì"],
["Drogerie", "negozio di articoli per la casa e per la cura personale"],
["Fahrplan", "orario (di mezzi pubblici)"],
["Fluss", "flusso/fiume"],
["geradeaus", "diritto (direzione)"],
["Hauptbahnhof", "stazione (ferroviaria) centrale"],
["Kreuzung", "incrocio"],
["Linie", "linea"],
["Museum", "museo"],
["Park", "parco"],
["Richtung", "direzione"],
["Stadtrundfahrt", "giro turistico della città"],
["abfahren", "partire"],
["ankommen", "arrivare"],
["Abfahrt", "partenza"],
["Ankunft", "arrivo"],
["links", "a sinistra"],
["rechts", "a destra"],
["Kannst du mir etwas empfehlen?", "Puoi consigliarmi qualcosa?"],
["Sieh dir … an.", "Guarda..."],
["Wir treffen uns beim …", ""],
["Apotheke", "farmacia"],
["Bahnsteig", "marciapiede"],
["gleich", "stesso/uguale; immediatamente"],
["Gleis", "binario"],
["stehen", "stare in piedi"],
["einsteigen", "salire (su un mezzo di trasporto)"],
["Bäckerei", "panetteria"],
["Kiosk", "chiosco/edicola"],
["Ticketautomat", "biglietteria automatica"],
["Treffpunkt", "punto d’incontro"],
["umsteigen", "cambiare (tra linee di mezzi pubblici); prendere la coincidenza"],
["das nächste Mal", "la prossima volta"],
["Ich bin gleich da.", "Arrivo subito."],
["allein", "solo"],
["Aufzug", "ascensore"],
["Bad (= das Badezimmer)", "bagno (stanza da bagno)"],
["Badezimmer", "(stanza da) bagno"],
["Balkon", "balcone"],
["Dorf", "paese/villaggio"],
["Erdgeschoss (EG)", "piano terra"],
["Etage", "piano (di edificio)"],
["Flur", "corridoio"],
["Garten", "giardino"],
["Haus", "casa"],
["Keller", "cantina"],
["leider", "purtroppo"],
["Küche", "cucina"],
["Miete", "affitto"],
["Platz", "posto/spazio"],
["Quadratmeter, (m2/qm)", "metri quadrati, (m2/mq)"],
["Schlafzimmer", "stanza da letto"],
["Stock", "piano (di edificio)/bastone"],
["Terrasse", "terrazza"],
["Wohnung", "abitazione"],
["Wohnzimmer", "soggiorno"],
["Zentrum", "centro"],
["Zimmer", "stanza"],
["gemütlich", "accogliente"],
["ungemütlich", "poco accogliente"],
["hell", "luminoso/chiaro"],
["dunkel", "scuro"],
["laut", "rumoroso"],
["ruhig", "tranquillo/silenzioso"],
["modern", "moderno"],
["altmodisch", "fuori moda"],
["schön", "bello"],
["hässlich", "brutto"],
["teuer", "caro"],
["günstig", "economico"],
["warm", "caldo/tiepido"],
["kalt", "freddo"],
["in der Nähe", "nelle vicinanze"],
["zur Miete wohnen", "abitare in affitto"],
["Suche Wohnung", ""],
["Anzeige", "annuncio"],
["frei", "libero"],
["Mieter", "affittuario/inquilino"],
["Mieterin", "affittuaria/inquilina"],
["Nachbar", "vicino (di casa)"],
["Nachbarin", "vicina (di casa)"],
["Nebenkosten (Pl.)", "spese accessorie (pl.)"],
["nett", "netto"],
["Obergeschoss (OG)", "piano superiore (di edificio)"],
["Paar", "paio/coppia"],
["Preis", "prezzo"],
["Vermieter", "locatore"],
["Vermieterin", "locatrice"],
["Wohngemeinschaft (= die WG)", "comunità alloggio/comune"],
["jung", "giovane"],
["alt", "vecchio"],
["Warmmiete", "canone di affitto (comprese le spese di riscaldamento)"],
["Kaltmiete", "canone di affitto (escluse le spese di riscaldamento)"],
["Ich ziehe um.", ""],
["anrufen", "chiamare"],
["Bett", "letto"],
["Kühlschrank", "frigorifero"],
["mieten", "affittare (prendere in affitto)"],
["Möbel (Pl.)", "mobili (pl.)"],
["Prozent (%)", "percentuale (%)"],
["Regal", "scaffale"],
["Schrank", "armadio"],
["Sessel", "poltrona"],
["Sofa", "divano"],
["stellen", "mettere/collocare"],
["Teppich", "tappeto"],
["Treppe", "scala"],
["umziehen", "trasferirsi/traslocare"],
["Umzug", "trasferimento/trasloco"],
["Waschmaschine", "lavatrice"],
["Wohin?", "dove (moto a luogo)?"],
["aufmachen", "aprire"],
["zumachen", "chiudere"],


];

const $ = (id) => document.getElementById(id);
const stack = $("stack");
const controls = $("controls");
const empty = $("empty");
const progress = $("progress");

let cards = loadCards();
let queue = [];
let currentId = null;
let startX = 0;
let startY = 0;
let dragging = false;

function makeCards() {
  return STARTER_CARDS.map(([word, translation], i) => ({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${i}`,
    word,
    translation,
    streak: 0,
    dueAt: 0
  }));
}

function loadCards() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {}
  const fresh = makeCards();
  saveCards(fresh);
  return fresh;
}

function saveCards(data = cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function isDue(card) {
  return card.dueAt <= Date.now();
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQueue() {
  const due = cards.filter(isDue);
  queue = shuffle(due.map(c => c.id));
  currentId = null;
  render();
}

function getCurrent() {
  return cards.find(c => c.id === queue[0]);
}

function render() {
  stack.innerHTML = "";

  if (!queue.length) {
    stack.classList.add("hidden");
    controls.classList.add("hidden");
    empty.classList.remove("hidden");
    const next = cards.filter(c => c.dueAt > Date.now()).sort((a,b) => a.dueAt - b.dueAt)[0];
    progress.textContent = next ? `next review ${formatRelative(next.dueAt)}` : "0 cards";
    return;
  }

  stack.classList.remove("hidden");
  empty.classList.add("hidden");
  controls.classList.remove("hidden");

  const visible = queue.slice(0, 3).map(id => cards.find(c => c.id === id)).filter(Boolean);
  visible.reverse().forEach((card, reverseIndex) => {
    const depth = visible.length - 1 - reverseIndex;
    const el = createCard(card, depth);
    stack.appendChild(el);
  });

  const dueCount = cards.filter(isDue).length;
  progress.textContent = `${dueCount} due · ${cards.length} total`;
}

function createCard(card, depth) {
  const el = document.createElement("article");
  el.className = "card";
  el.dataset.id = card.id;
  el.dataset.depth = depth;

  el.innerHTML = `
    <div class="swipe-label left">Didn't know</div>
    <div class="swipe-label right">Knew it</div>
    <div class="card-shell">
      <div class="face front">
        <div class="word">${escapeHtml(card.word)}</div>
        <div class="hint">tap to reveal</div>
      </div>
      <div class="face back">
        <div class="translation">${escapeHtml(card.translation)}</div>
        <div class="hint">swipe left or right</div>
      </div>
    </div>
  `;

  if (depth === 0) attachInteractions(el);
  return el;
}

function attachInteractions(el) {
  el.addEventListener("click", () => {
    if (!dragging) el.classList.toggle("flipped");
  });

  el.addEventListener("pointerdown", (e) => {
    dragging = false;
    startX = e.clientX;
    startY = e.clientY;
    el.setPointerCapture(e.pointerId);
    el.classList.add("dragging");
  });

  el.addEventListener("pointermove", (e) => {
    if (!el.hasPointerCapture(e.pointerId)) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) dragging = true;
    if (!dragging) return;

    const rotate = dx * 0.06;
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${rotate}deg)`;

    const amount = Math.min(Math.abs(dx) / 110, 1);
    el.querySelector(".left").style.opacity = dx < 0 ? amount : 0;
    el.querySelector(".right").style.opacity = dx > 0 ? amount : 0;
  });

  el.addEventListener("pointerup", (e) => {
    el.releasePointerCapture(e.pointerId);
    el.classList.remove("dragging");

    const dx = e.clientX - startX;
    if (Math.abs(dx) > 110) {
      finishSwipe(dx > 0 ? "right" : "left");
    } else {
      el.style.transform = "";
      el.querySelector(".left").style.opacity = 0;
      el.querySelector(".right").style.opacity = 0;
    }

    setTimeout(() => dragging = false, 0);
  });
}

function finishSwipe(direction) {
  const id = queue.shift();
  const card = cards.find(c => c.id === id);
  if (!card) return;

  const el = [...stack.children].find(node => node.dataset.id === id);
  if (el) {
    el.style.transition = "transform 220ms ease, opacity 220ms ease";
    el.style.transform = `translate3d(${direction === "right" ? 120 : -120}vw, 0, 0) rotate(${direction === "right" ? 24 : -24}deg)`;
    el.style.opacity = "0";
  }

  if (direction === "right") {
    card.streak += 1;
    card.dueAt = Date.now() + card.streak * 24 * 60 * 60 * 1000;
  } else {
    card.streak = 0;
    card.dueAt = 0;
    // Put it back randomly in the current queue.
    const position = Math.floor(Math.random() * (queue.length + 1));
    queue.splice(position, 0, card.id);
  }

  saveCards();

  setTimeout(render, 180);
}

$("noBtn").addEventListener("click", () => finishSwipe("left"));
$("yesBtn").addEventListener("click", () => finishSwipe("right"));

$("againBtn").addEventListener("click", () => {
  // Bring all cards back temporarily without changing their saved streak.
  queue = shuffle(cards.map(c => c.id));
  render();
});

$("resetBtn").addEventListener("click", () => {
  if (!confirm("Reset all progress?")) return;
  cards = makeCards();
  saveCards();
  buildQueue();
});

function formatRelative(timestamp) {
  const hours = Math.max(1, Math.round((timestamp - Date.now()) / 3600000));
  return hours < 24 ? `in ${hours}h` : `in ${Math.ceil(hours / 24)}d`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

buildQueue();
