const STORAGE_KEYS = {
  rescuers: 'pp_v11_rescuers',
  aeds: 'pp_v11_aeds',
  kits: 'pp_v11_kits',
  topics: 'pp_v11_topics',
  algorithms: 'pp_v11_algorithms',
  theme: 'pp_v11_theme',
  defaultZone: 'pp_v11_default_zone',
  adminUnlocked: 'pp_v11_admin_unlocked',
  adminPassword: 'pp_v11_admin_password',
  masterUnlocked: 'pp_v11_master_unlocked',
  masterPassword: 'pp_v11_master_password',
  masterPin: 'pp_v11_master_pin',
  changeHistory: 'pp_v11_change_history',
  publicIp: 'pp_v11_public_ip',
  adminOperator: 'pp_v11_admin_operator',
  masterOperator: 'pp_v11_master_operator',
  defaultRescuerByZone: 'pp_v11_default_rescuer_by_zone',
  alarmHistory: 'pp_v11_alarm_history',
  offlineAlgorithmIds: 'pp_v11_offline_algorithm_ids',
  appInfo: 'pp_v11_app_info',
  appNotice: 'pp_v11_app_notice',
  eventTypes: 'pp_v11_event_types',
  topicCategoryPriority: 'pp_v11_topic_category_priority',
  appNoticeSeen: 'pp_v11_app_notice_seen',
  remoteTablePresence: 'pp_v11_remote_table_presence',
  notificationInbox: 'pp_v11_notification_inbox'
};
const defaultRescuers = [
  { id:'r1', name:'Jan Kowalski', phone:'600100200', zone:'ZLK Poznań', location:'Posterunek główny', shift:'Dzienna', skills:'KPP, AED', active:true, alarmGroup:true },
  { id:'r2', name:'Anna Nowak', phone:'600100201', zone:'ZLK Poznań', location:'Hala szkoleniowa', shift:'Popołudniowa', skills:'Pierwsza pomoc, AED', active:true, alarmGroup:true },
  { id:'r3', name:'Piotr Wiśniewski', phone:'600100202', zone:'Sekcja Utrzymania', location:'Brygada terenowa', shift:'Całodobowa', skills:'KPP, transport', active:true, alarmGroup:true }
];
const defaultRescuerByZoneSeed = {
  'ZLK Poznań': 'r1',
  'Sekcja Utrzymania': 'r3'
};
const defaultAeds = [
  { id:'a1', name:'AED – wejście główne', location:'Zakład A, budynek administracyjny, parter', lat:52.402, lon:16.949 },
  { id:'a2', name:'AED – hala szkoleniowa', location:'Zakład B, przy recepcji', lat:52.400, lon:16.944 },
  { id:'a3', name:'AED – samochód patrolowy', location:'Zakład terenowy, brygada utrzymania', lat:52.405, lon:16.955 }
];
const defaultKits = [
  { id:'k1', name:'Apteczka – portiernia', type:'zakładowa', location:'Zakład A, portiernia główna', categories:['ochrona osobista','opatrunki','RKO'], items:[{name:'rękawiczki nitrylowe', expiry:'2027-06-30'},{name:'opatrunki jałowe', expiry:'2026-10-01'},{name:'bandaże', expiry:'2026-08-15'},{name:'plaster', expiry:'2027-01-31'},{name:'maseczka CPR', expiry:'2028-01-15'},{name:'koc termiczny', expiry:''}] },
  { id:'k2', name:'Apteczka – hala 2', type:'zakładowa', location:'Zakład A, hala 2 przy wejściu', categories:['ochrona osobista','opatrunki','inne'], items:[{name:'rękawiczki', expiry:'2026-12-31'},{name:'gaziki', expiry:'2025-12-15'},{name:'opaska elastyczna', expiry:'2027-03-01'},{name:'chusta trójkątna', expiry:''},{name:'nożyczki ratownicze', expiry:''}] },
  { id:'k3', name:'Apteczka – samochód służbowy', type:'samochodowa', location:'Zakład B, pojazd techniczny', categories:['opatrunki','RKO','oparzenia'], items:[{name:'rękawiczki', expiry:'2026-11-30'},{name:'opatrunki hydrożelowe', expiry:'2025-05-10'},{name:'plastry', expiry:'2026-07-31'},{name:'bandaże', expiry:'2026-06-01'},{name:'koc termiczny', expiry:''}] }
];
const defaultTopics = [
  {id:'t1', n:1, icon:'🛡️', t:'Sekwencja działań ratowniczych', img:'assets/topics/sec01.jpg', lead:'Ten temat porządkuje pierwsze czynności ratownika od oceny bezpieczeństwa miejsca zdarzenia do wezwania pomocy i zabezpieczenia otoczenia.', s:[['ok','Rozpoznanie miejsca zdarzenia',['Bezpieczeństwo własne i środki ochrony indywidualnej.','Identyfikacja zagrożeń: ruch pojazdów, napięcie, dym, zwisające przewody.','Liczba poszkodowanych oraz mechanizm zdarzenia.','Wezwij pomoc i zabezpiecz miejsce zdarzenia.']]]},
  {id:'t2', n:2, icon:'🧠', t:'Ocena stanu przytomności poszkodowanego', img:'assets/topics/sec02.jpg', lead:'Ocena przytomności pozwala szybko ustalić stan poszkodowanego i podjąć decyzję o dalszym postępowaniu oraz wezwaniu wsparcia.', s:[['ok','Skala AVPU / PGBN',['A (P) – przytomny.','V (G) – reaguje na głos.','P (B) – reaguje na ból.','U (N) – brak reakcji.']],['warn','Ważne',['Po sprawdzeniu natychmiast wezwij pomoc lub wskaż konkretną osobę do wezwania.']]]},
  {id:'t3', n:3, icon:'🫁', t:'Udrażnianie dróg oddechowych', img:'assets/topics/sec03.jpg', lead:'Prawidłowe udrożnienie dróg oddechowych jest jednym z kluczowych etapów oceny i pomocy osobie nieprzytomnej.', s:[['ok','Pacjent nieurazowy',['Odchylenie głowy do tyłu i uniesienie brody.']],['warn','Pacjent urazowy',['Stabilizuj głowę i wykonaj wysunięcie żuchwy.']]]},
  {id:'t4', n:4, icon:'💨', t:'Ocena oddechu', img:'assets/topics/sec04.jpg', lead:'Oddech oceniamy sprawnie i spokojnie, maksymalnie przez 10 sekund. To jeden z najważniejszych momentów decyzyjnych przed rozpoczęciem RKO.', s:[['ok','Jak sprawdzić',['Patrz, słuchaj i czuj przez maksymalnie 10 sekund.','Oceń ruch klatki piersiowej i wysiłek oddechowy.','Prawidłowy oddech u dorosłego zwykle 12–20/min.']]]},
  {id:'t5', n:5, icon:'🫀', t:'Ocena krążenia', img:'assets/topics/sec05.jpg', lead:'Ocena oznak krążenia pomaga rozpoznać wstrząs i pogarszający się stan poszkodowanego jeszcze przed przyjazdem ZRM.', s:[['ok','Jak sprawdzić',['Oceń kolor skóry, temperaturę i czas powrotu kapilarnego.','Sprawdź tętno i szukaj oznak wstrząsu.']]]},
  {id:'t6', n:6, icon:'⚡', t:'RKO i użycie AED', img:'assets/topics/sec06.jpg', lead:'Resuscytację rozpoczynamy natychmiast przy braku prawidłowego oddechu. Szybkie użycie AED zwiększa szanse przeżycia.', relatedAlgorithmIds:['alg1','alg2'], s:[['ok','Dorosły',['30 uciśnięć i 2 oddechy, jeśli je wykonujesz.','Uciskaj 100–120/min na głębokość 5–6 cm.','Użyj AED natychmiast po dostarczeniu.']]]},
  {id:'t7', n:7, icon:'🩸', t:'Silne krwotoki i staza taktyczna', img:'assets/topics/sec07.jpg', lead:'Masywny krwotok to stan bezpośredniego zagrożenia życia. Najważniejsze jest szybkie zatrzymanie utraty krwi.', s:[['ok','Najpierw',['Natychmiastowy bezpośredni ucisk rany.','Przy zagrażającym życiu krwotoku z kończyny rozważ stazę.']]]},
  {id:'t8', n:8, icon:'↩️', t:'Pozycja boczna bezpieczna', img:'assets/topics/sec08.jpg', lead:'Pozycję boczną stosujemy u osoby nieprzytomnej, która oddycha prawidłowo i nie ma podejrzenia urazu uniemożliwiającego takie ułożenie.', s:[['ok','Jak ułożyć',['Najbliższą rękę ułóż pod kątem prostym.','Zegnij dalszą nogę i przetocz na bok.']]]},
  {id:'t9', n:9, icon:'🔥', t:'Oparzenia termiczne', img:'assets/topics/sec09.jpg', lead:'Przy oparzeniach najważniejsze jest przerwanie działania czynnika parzącego i długie chłodzenie uszkodzonej okolicy.', s:[['ok','Pomoc',['Usuń źródło urazu i chłodź wodą przez co najmniej 20 minut.','Po schłodzeniu osłoń miejsce jałowym lub hydrożelowym opatrunkiem.','Nie przebijaj pęcherzy i nie odrywaj przyklejonej odzieży.']]]},
  {id:'t10', n:10, icon:'⚠️', t:'Drgawki', img:'assets/topics/sec10.jpg', lead:'Podczas drgawek kluczowe jest zabezpieczenie poszkodowanego przed urazami i obserwacja czasu trwania napadu.', s:[['ok','Podczas napadu',['Usuń niebezpieczne przedmioty.','Chroń głowę czymś miękkim.','Nie wkładaj niczego do ust.']]]},
  {id:'t11', n:11, icon:'📍', t:'Zdarzenia w terenie', img:'assets/topics/sec11.jpg', lead:'W działaniach terenowych ogromne znaczenie ma dokładne przekazanie lokalizacji, punktów orientacyjnych i warunków dojazdu.', s:[['ok','Lokalizacja',['Podaj GPS z telefonu.','Podaj punkt orientacyjny i realny dojazd.']]]},
  {id:'t12', n:12, icon:'🩹', t:'Tamowanie krwotoków i opatrunek uciskowy', img:'assets/topics/sec07.jpg', lead:'Prawidłowo założony opatrunek uciskowy pozwala opanować wiele krwotoków bez konieczności użycia stazy.', s:[['ok','Postępowanie',['Załóż bezpośredni ucisk na ranę.','Nałóż jałowy opatrunek i dociśnij bandażem.','Jeśli opatrunek przemaka, dołóż kolejną warstwę bez zdejmowania poprzedniej.']]]},
  {id:'t13', n:13, icon:'😮‍💨', t:'Zadławienia', img:'assets/topics/sec03.jpg', lead:'W zadławieniu trzeba szybko ocenić, czy poszkodowany kaszle skutecznie, i wdrożyć odpowiednie czynności udrażniające.', s:[['ok','Postępowanie',['Zapytaj: czy możesz oddychać?','Jeśli kaszle – zachęcaj do kaszlu.','Jeśli nie może oddychać – 5 uderzeń między łopatki.','Następnie 5 uciśnięć nadbrzusza.','Przy utracie przytomności rozpocznij RKO i wezwij pomoc.']]]}
].map(topic => ({ category: inferDefaultTopicCategory(topic), ...topic }));
const defaultAlgorithms = [
  {
    id:'alg1', icon:'🫀', title:'RKO dorosły', category:'RKO', accent:'danger',
    steps:[
      'Sprawdź bezpieczeństwo miejsca zdarzenia i załóż rękawiczki, jeśli są dostępne.',
      'Oceń przytomność: głośno zapytaj i potrząśnij za ramiona.',
      'Brak reakcji → zawołaj o pomoc i wezwij 112/999.',
      'Udrożnij drogi oddechowe i oceniaj oddech maksymalnie 10 sekund.',
      'Brak prawidłowego oddechu → rozpocznij 30 uciśnięć klatki piersiowej.',
      'Wykonaj 2 oddechy ratownicze, jeśli potrafisz i masz warunki.',
      'Kontynuuj cykl 30:2 z częstością 100–120/min i głębokością 5–6 cm.',
      'Podłącz AED natychmiast po dostarczeniu i wykonuj komunikaty urządzenia.'
    ]
  },
  {
    id:'alg2', icon:'👶', title:'RKO dziecko', category:'RKO', accent:'primary',
    steps:[
      'Sprawdź bezpieczeństwo i oceń reakcję dziecka.',
      'Wołaj o pomoc; jeśli jesteś sam, rozpocznij działania od razu.',
      'Udrożnij drogi oddechowe i sprawdzaj oddech do 10 sekund.',
      'Brak prawidłowego oddechu → wykonaj 5 oddechów ratowniczych.',
      'Rozpocznij 30 uciśnięć klatki piersiowej, jeśli jesteś sam; 15 uciśnięć przy dwóch ratownikach.',
      'Uciskaj 1/3 głębokości klatki piersiowej z tempem 100–120/min.',
      'Po około 1 minucie działań wezwij pomoc, jeśli wcześniej było to niemożliwe.',
      'Użyj AED z elektrodami pediatrycznymi, jeśli są dostępne.'
    ]
  },
  {
    id:'alg3', icon:'🫁', title:'Zadławienie', category:'Drogi oddechowe', accent:'amber',
    steps:[
      'Zapytaj poszkodowanego, czy może oddychać i mówić.',
      'Jeśli kaszle skutecznie – zachęcaj do kaszlu i obserwuj.',
      'Jeśli kaszel nieskuteczny – pochyl poszkodowanego do przodu.',
      'Wykonaj 5 energicznych uderzeń między łopatki.',
      'Jeśli brak poprawy – wykonaj 5 uciśnięć nadbrzusza u dorosłego.',
      'Powtarzaj sekwencję 5 uderzeń / 5 uciśnięć do skutku.',
      'Przy utracie przytomności delikatnie ułóż na podłożu i rozpocznij RKO.',
      'Po skutecznym usunięciu ciała obcego zalecana jest dalsza obserwacja medyczna.'
    ]
  },
  {
    id:'alg4', icon:'🩸', title:'Krwotok masywny (staza)', category:'Urazy', accent:'danger',
    steps:[
      'Załóż rękawiczki i oceń, skąd wypływa krew.',
      'Natychmiast zastosuj silny bezpośredni ucisk na ranę.',
      'Jeśli krwotok z kończyny zagraża życiu – załóż stazę wysoko i ciasno.',
      'Zanotuj godzinę założenia stazy.',
      'Jeżeli krew nadal wypływa – dociągnij stazę lub załóż drugą powyżej pierwszej.',
      'Ułóż poszkodowanego, chroń przed wychłodzeniem i kontroluj świadomość.',
      'Wezwij natychmiast ZRM / 112 i przekaż informację o stazie oraz czasie założenia.'
    ]
  },
  {
    id:'alg5', icon:'🔥', title:'Oparzenia', category:'Urazy', accent:'amber',
    steps:[
      'Przerwij działanie czynnika parzącego lub gorącego, dbając o własne bezpieczeństwo.',
      'Chłódź oparzone miejsce chłodną bieżącą wodą przez minimum 20 minut.',
      'Usuń biżuterię i luźną odzież, zanim pojawi się obrzęk.',
      'Nie odrywaj odzieży przyklejonej do skóry.',
      'Po schłodzeniu zabezpiecz miejsce jałowym lub hydrożelowym opatrunkiem.',
      'Nie smaruj tłuszczem, kremem ani spirytusem.',
      'Przy rozległych oparzeniach, oparzeniach dróg oddechowych lub twarzy – pilnie wezwij pomoc.'
    ]
  },
  {
    id:'alg6', icon:'⚡', title:'Porażenie prądem', category:'PKP', accent:'warning',
    steps:[
      'Nie dotykaj poszkodowanego, dopóki źródło prądu nie zostanie odłączone lub potwierdzone jako bezpieczne.',
      'Na terenie kolejowym zachowaj szczególną ostrożność wobec sieci trakcyjnej i przewodów.',
      'Wezwij pomoc i zgłoś zdarzenie zgodnie z procedurą zakładową / dyspozytorską.',
      'Po potwierdzeniu bezpieczeństwa podejdź do poszkodowanego i oceń przytomność.',
      'Sprawdź oddech przez 10 sekund.',
      'Brak oddechu → rozpocznij RKO i użyj AED.',
      'Jeśli oddycha, monitoruj stan, zabezpiecz oparzenia i wyziębienie.',
      'Każde porażenie prądem wymaga oceny medycznej, nawet przy początkowo dobrym stanie.'
    ]
  },
  {
    id:'alg7', icon:'🚆', title:'Wypadek kolejowy', category:'PKP', accent:'primary',
    steps:[
      'Oceń sytuację z bezpiecznej odległości i nie wchodź na tor bez upewnienia się, że jest bezpiecznie.',
      'Zabezpiecz miejsce, ostrzeż inne osoby i natychmiast powiadom odpowiednie służby oraz dyspozytora.',
      'Podaj dokładną lokalizację: linia, tor, km, najbliższy obiekt lub GPS.',
      'Sprawdź, ilu jest poszkodowanych i jakie są główne zagrożenia.',
      'Jeśli istnieje ryzyko porażenia prądem, nie zbliżaj się do sieci trakcyjnej i elementów pod napięciem.',
      'Po potwierdzeniu bezpieczeństwa przystąp do segregacji wstępnej i udzielania pierwszej pomocy.',
      'Priorytet: brak oddechu, masywny krwotok, utrata przytomności, uwięzienie.',
      'Do czasu przyjazdu służb aktualizuj informacje i kieruj ratowników do miejsca zdarzenia.'
    ]
  }
];
function deepClone(value){
  try{
    if (typeof structuredClone === 'function') return structuredClone(value);
  }catch(_){ }
  return JSON.parse(JSON.stringify(value));
}
const DEFAULT_APP_INFO = {
  title: 'O aplikacji Ratownik PLK',
  text: 'Ratownik PLK to aplikacja pomocnicza do szybkiego działania na miejscu zdarzenia.\n\nSłuży do: szybkiego wezwania pomocy, korzystania z tematów pierwszej pomocy, uruchamiania algorytmów krok po kroku, wyszukiwania AED i apteczek, przygotowania zgłoszenia oraz kontaktu z ratownikami zakładowymi.\n\nTryb offline zapewnia dostęp do najważniejszych numerów i wybranych algorytmów bez internetu. Panel administratora służy do zarządzania lokalnymi danymi, a po konfiguracji Supabase również do współdzielonej synchronizacji online pomiędzy urządzeniami.\n\nUkryty panel master umożliwia edycję informacji o aplikacji i komunikatu startowego.'
};
const DEFAULT_NOTIFICATION_INFO_HTML = `<p><strong>Lokalne powiadomienia</strong> to notyfikacje wyświetlane przez tę aplikację na konkretnym telefonie lub komputerze.</p><ul><li>działają tylko na urządzeniu, które wyraziło zgodę,</li><li>wymagają działania aplikacji przez HTTPS lub jako zainstalowane PWA,</li><li>służą do testu, przypomnienia albo lokalnego potwierdzenia zmian,</li><li>ich ostatnia treść jest też widoczna w sekcji <strong>Powiadomienia</strong> wewnątrz aplikacji.</li></ul><p><strong>Jak dodać komunikat dla wszystkich użytkowników?</strong></p><ol><li>wejdź do panelu <strong>MASTER</strong>,</li><li>w sekcji komunikatu dla użytkowników wpisz tytuł i treść,</li><li>zapisz komunikat i wykonaj synchronizację online,</li><li>na wszystkich urządzeniach pojawi się banner startowy, a po wyrażeniu zgody również jednorazowe lokalne powiadomienie o nowym komunikacie.</li></ol><p>To nie jest pełny push z serwera. Do wspólnej komunikacji aplikacja używa <strong>komunikatu startowego + synchronizacji online przez Supabase</strong>.</p>`;
const DEFAULT_EVENT_TYPES = [
  'Brak przytomności',
  'Brak oddechu / RKO',
  'Silny krwotok',
  'Oparzenie termiczne',
  'Drgawki',
  'Uraz w terenie',
  'Zadławienie',
  'Porażenie prądem',
  'Wypadek kolejowy'
];
let rescuers = JSON.parse(localStorage.getItem(STORAGE_KEYS.rescuers) || 'null') || deepClone(defaultRescuers);
let aeds = JSON.parse(localStorage.getItem(STORAGE_KEYS.aeds) || 'null') || deepClone(defaultAeds);
let kits = JSON.parse(localStorage.getItem(STORAGE_KEYS.kits) || 'null') || deepClone(defaultKits);
let topics = JSON.parse(localStorage.getItem(STORAGE_KEYS.topics) || 'null') || deepClone(defaultTopics);
let algorithms = JSON.parse(localStorage.getItem(STORAGE_KEYS.algorithms) || 'null') || deepClone(defaultAlgorithms);
let changeHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.changeHistory) || '[]');
let alarmHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.alarmHistory) || '[]');
let offlineAlgorithmIds = JSON.parse(localStorage.getItem(STORAGE_KEYS.offlineAlgorithmIds) || 'null') || defaultAlgorithms.slice(0,4).map(x => x.id);
let appInfo = JSON.parse(localStorage.getItem(STORAGE_KEYS.appInfo) || 'null') || deepClone(DEFAULT_APP_INFO);
let appNotice = JSON.parse(localStorage.getItem(STORAGE_KEYS.appNotice) || 'null') || { title:'', text:'' };
let eventTypes = JSON.parse(localStorage.getItem(STORAGE_KEYS.eventTypes) || 'null') || deepClone(DEFAULT_EVENT_TYPES);
let topicCategoryPriority = JSON.parse(localStorage.getItem(STORAGE_KEYS.topicCategoryPriority) || 'null');
let notificationInbox = JSON.parse(localStorage.getItem(STORAGE_KEYS.notificationInbox) || '[]');
let eventTypeEditIndex = null;
let currentTopicEditId = null;
let currentAlgorithmId = algorithms[0]?.id || null;
let currentAlgorithmStep = 0;
let rescuerEditId = null, aedEditId = null, kitEditId = null, algorithmEditId = null;
sanitizeState();
normalizeOfflineAlgorithmIds();
normalizeAppInfo();
sanitizeNotificationInbox();
const rawCfg = window.APP_CONFIG || {};
const cfg = { ...rawCfg,
  supabaseUrl: String(rawCfg.supabaseUrl || '').trim(),
  supabaseAnonKey: String(rawCfg.supabaseAnonKey || '').trim()
};
const hasRealSupabaseConfig = cfg.supabaseUrl && cfg.supabaseAnonKey && !/WSTAW_TUTAJ_/i.test(cfg.supabaseUrl + cfg.supabaseAnonKey);
const supabaseClient = (hasRealSupabaseConfig && window.supabase)
  ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    })
  : null;
const ONLINE_TABLES = ['rescuers','aeds','kits','topics','algorithms','app_settings'];
let isApplyingRemoteState = false;
let onlineSyncTimer = null;
let onlineRealtimeChannel = null;
let onlineRefreshTimer = null;
let onlineSessionEmail = '';
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const safeColor = color => /^#[0-9a-fA-F]{6}$/.test(String(color||'')) ? String(color) : '#d92c2c';
const safeFontSize = size => {
  const allowed = ['0.9em','1em','1.1em','1.2em','1.35em','1.5em'];
  return allowed.includes(String(size||'')) ? String(size) : '1.2em';
};

function normalizeOfflineAlgorithmIds(){
  const valid = new Set(algorithms.map((a, idx) => normalizeAlgorithm(a, idx).id));
  offlineAlgorithmIds = (Array.isArray(offlineAlgorithmIds) ? offlineAlgorithmIds : []).filter(id => valid.has(id));
  if(!offlineAlgorithmIds.length) offlineAlgorithmIds = algorithms.slice(0,4).map((a, idx) => normalizeAlgorithm(a, idx).id || normalizeAlgorithm(a, idx).id);
}
function normalizeAppInfo(){
  if(!appInfo || typeof appInfo !== 'object') appInfo = deepClone(DEFAULT_APP_INFO);
  appInfo.title = String(appInfo.title || DEFAULT_APP_INFO.title).trim() || DEFAULT_APP_INFO.title;
  appInfo.text = String(appInfo.text || DEFAULT_APP_INFO.text).trim() || DEFAULT_APP_INFO.text;
  if(!appNotice || typeof appNotice !== 'object') appNotice = { title:'', text:'', updatedAt:'', notify:false };
  appNotice.title = String(appNotice.title || '').trim();
  appNotice.text = String(appNotice.text || '').trim();
  appNotice.updatedAt = String(appNotice.updatedAt || '').trim();
  appNotice.notify = appNotice.notify !== false && !!(appNotice.title || appNotice.text);
  if(!Array.isArray(eventTypes)) eventTypes = deepClone(DEFAULT_EVENT_TYPES);
  eventTypes = eventTypes.map(x => String(x || '').trim()).filter(Boolean);
  eventTypes = [...new Set(eventTypes)];
  if(!eventTypes.length) eventTypes = deepClone(DEFAULT_EVENT_TYPES);
}
function normalizeNotificationEntry(item, idx=0){
  return {
    id: String(item?.id || `notice_${Date.now()}_${idx}`).trim(),
    title: String(item?.title || 'Powiadomienie').trim() || 'Powiadomienie',
    body: String(item?.body ?? item?.text ?? '').trim(),
    source: String(item?.source || 'Aplikacja').trim() || 'Aplikacja',
    level: ['info','notice','alarm'].includes(String(item?.level || '')) ? String(item.level) : 'info',
    createdAt: String(item?.createdAt || new Date().toISOString()).trim() || new Date().toISOString()
  };
}
function sanitizeNotificationInbox(){
  if(!Array.isArray(notificationInbox)) notificationInbox = [];
  notificationInbox = notificationInbox
    .map((item, idx) => normalizeNotificationEntry(item, idx))
    .filter(item => item.title || item.body)
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, 25);
}
function saveNotificationInbox(){
  sanitizeNotificationInbox();
  localStorage.setItem(STORAGE_KEYS.notificationInbox, JSON.stringify(notificationInbox));
}
function pushInAppNotification(payload={}){
  sanitizeNotificationInbox();
  const entry = normalizeNotificationEntry(payload, notificationInbox.length);
  const duplicateIdx = notificationInbox.findIndex(item =>
    item.title === entry.title &&
    item.body === entry.body &&
    item.source === entry.source
  );
  if(duplicateIdx >= 0){
    notificationInbox.splice(duplicateIdx, 1);
  }
  notificationInbox.unshift(entry);
  notificationInbox = notificationInbox.slice(0, 25);
  saveNotificationInbox();
  renderNotificationInbox();
  return entry;
}
function clearInAppNotifications(){
  notificationInbox = [];
  localStorage.removeItem(STORAGE_KEYS.notificationInbox);
  renderNotificationInbox();
}
function formatNotificationTime(value){
  const date = new Date(value);
  if(Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('pl-PL', {
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit'
  });
}

function buildAppSettingsRows(){
  normalizeTopicCategoryPriorityState();
  return [
    { key:'offlineAlgorithmIds', value: deepClone(offlineAlgorithmIds || []) },
    { key:'appInfo', value: deepClone(appInfo || DEFAULT_APP_INFO) },
    { key:'appNotice', value: deepClone(appNotice || { title:'', text:'', updatedAt:'', notify:false }) },
    { key:'eventTypes', value: deepClone(eventTypes || DEFAULT_EVENT_TYPES) },
    { key:'topicCategoryPriority', value: deepClone(topicCategoryPriority || []) },
    { key:'defaultRescuerByZone', value: deepClone(getDefaultRescuerMap()) }
  ];
}
function applyAppSettingsRows(rows){
  const list = Array.isArray(rows) ? rows : [];
  const map = Object.fromEntries(list.filter(x => x && x.key).map(x => [String(x.key), x.value]));
  if(Array.isArray(map.offlineAlgorithmIds)) offlineAlgorithmIds = map.offlineAlgorithmIds;
  if(map.appInfo && typeof map.appInfo === 'object') appInfo = map.appInfo;
  if(map.appNotice && typeof map.appNotice === 'object') appNotice = map.appNotice;
  if(Array.isArray(map.eventTypes)) eventTypes = map.eventTypes;
  if(Array.isArray(map.topicCategoryPriority)) topicCategoryPriority = map.topicCategoryPriority;
  if(map.defaultRescuerByZone && typeof map.defaultRescuerByZone === 'object') saveDefaultRescuerMap(map.defaultRescuerByZone);
  normalizeOfflineAlgorithmIds();
  normalizeAppInfo();
  normalizeTopicCategoryPriorityState();
}

function sanitizeRichText(value){
  let text = String(value ?? '');
  text = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  text = text.replace(/\n/g,'<br>');
  text = text.replace(/\[b\](.*?)\[\/b\]/gis, '<strong>$1</strong>');
  text = text.replace(/\[size=(0\.9em|1em|1\.1em|1\.2em|1\.35em|1\.5em)\](.*?)\[\/size\]/gis, (_,size,content) => `<span style="font-size:${safeFontSize(size)}">${content}</span>`);
  text = text.replace(/\[color=(#[0-9a-fA-F]{6})\](.*?)\[\/color\]/gis, (_,color,content) => `<span style="color:${safeColor(color)}">${content}</span>`);
  return text;
}
function formatRichInline(value){ return `<span class="rich-text">${sanitizeRichText(value)}</span>`; }
function richLinesToHtml(lines){
  const clean = (Array.isArray(lines) ? lines : [lines]).map(x => String(x ?? '').trim()).filter(Boolean);
  return clean.length ? `<ul>${clean.map(x => `<li class="rich-text">${sanitizeRichText(x)}</li>`).join('')}</ul>` : '<p>Brak treści.</p>';
}
function formatButtonWrap(value, mode, extra=''){
  if(mode === 'bold') return `[b]${value}[/b]`;
  if(mode === 'sizeUp') return `[size=1.35em]${value}[/size]`;
  if(mode === 'sizeDown') return `[size=1em]${value}[/size]`;
  if(mode === 'color') return `[color=${safeColor(extra)}]${value}[/color]`;
  return value;
}
function applyFormatToField(fieldId, mode, extra=''){
  const el = $(fieldId); if(!el) return;
  const start = el.selectionStart ?? 0; const end = el.selectionEnd ?? 0;
  const selected = el.value.slice(start,end) || 'tekst';
  const wrapped = formatButtonWrap(selected, mode, extra);
  el.value = el.value.slice(0,start) + wrapped + el.value.slice(end);
  el.focus();
  const pos = start + wrapped.length;
  if(el.setSelectionRange) el.setSelectionRange(pos,pos);
}
function hasOnlineConfig(){
  return !!supabaseClient;
}
function getOnlinePrimaryKey(table){
  return table === 'app_settings' ? 'key' : 'id';
}
function formatOnlineError(error){
  const base = String(error?.message || error?.details || error?.hint || error || 'Nieznany błąd online').trim();
  if(/column .* does not exist/i.test(base) || /Could not find the ['"`].+['"`] column/i.test(base) || /schema cache/i.test(base)){
    return `${base}. Zaktualizuj schemat Supabase, uruchamiając najnowszy plik SUPABASE_SETUP.sql w SQL Editor.`;
  }
  return base;
}
function serializeRowForOnline(table, row, idx=0){
  if(table === 'rescuers'){
    const item = normalizeRescuer(row, idx);
    return {
      id: item.id,
      name: item.name,
      phone: item.phone,
      zone: item.zone,
      location: item.location,
      shift: item.shift,
      skills: item.skills,
      active: item.active,
      alarmGroup: item.alarmGroup
    };
  }
  if(table === 'aeds'){
    return {
      id: String(row?.id || `a${Date.now()}_${idx}`),
      name: String(row?.name || '').trim(),
      location: String(row?.location || '').trim(),
      lat: Number.isFinite(Number(row?.lat)) ? Number(row.lat) : null,
      lon: Number.isFinite(Number(row?.lon)) ? Number(row.lon) : null
    };
  }
  if(table === 'kits'){
    const item = normalizeKit(row, idx);
    return {
      id: item.id,
      name: item.name,
      type: item.type,
      location: item.location,
      categories: Array.isArray(item.categories) ? item.categories : [],
      items: Array.isArray(item.items) ? item.items.map(normalizeKitItem).filter(x => x.name) : []
    };
  }
  if(table === 'topics'){
    const item = normalizeTopic(row, idx);
    return {
      id: item.id,
      n: item.n,
      category: item.category,
      icon: item.icon,
      t: item.t,
      img: item.img,
      images: Array.isArray(item.images) ? item.images.slice(0,4) : [],
      lead: item.lead,
      leadTitle: item.leadTitle,
      leadColor: item.leadColor,
      stepsColor: item.stepsColor,
      warnColor: item.warnColor,
      notesColor: item.notesColor,
      s: Array.isArray(item.s) ? item.s : [],
      relatedAlgorithmIds: Array.isArray(item.relatedAlgorithmIds) ? item.relatedAlgorithmIds : []
    };
  }
  if(table === 'algorithms'){
    const item = normalizeAlgorithm(row, idx);
    return {
      id: item.id,
      icon: item.icon,
      title: item.title,
      category: item.category,
      accent: item.accent,
      steps: Array.isArray(item.steps) ? item.steps : []
    };
  }
  if(table === 'app_settings'){
    return {
      key: String(row?.key || '').trim(),
      value: row?.value ?? {}
    };
  }
  return row;
}
function getOnlinePayloadForTable(table){
  const keyField = getOnlinePrimaryKey(table);
  return (getCollectionByTable(table) || [])
    .map((row, idx) => serializeRowForOnline(table, row, idx))
    .filter(row => row && String(row?.[keyField] || '').trim())
    .map(row => JSON.parse(JSON.stringify(row)));
}
function getRemoteTablePresenceMap(){
  try{
    const raw = localStorage.getItem(STORAGE_KEYS.remoteTablePresence);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? parsed : {};
  }catch(_){
    return {};
  }
}
function saveRemoteTablePresenceMap(map){
  localStorage.setItem(STORAGE_KEYS.remoteTablePresence, JSON.stringify(map || {}));
}
function getCollectionByTable(table){
  if(table === 'rescuers') return rescuers;
  if(table === 'aeds') return aeds;
  if(table === 'kits') return kits;
  if(table === 'topics') return topics;
  if(table === 'algorithms') return algorithms;
  if(table === 'app_settings') return buildAppSettingsRows();
  return [];
}
function assignCollectionByTable(table, rows){
  if(table === 'rescuers') rescuers = (rows || []).map((x, idx) => normalizeRescuer(x, idx));
  if(table === 'aeds') aeds = (rows || []).map((x, idx) => ({ ...x, id: x?.id || `a${Date.now()}_${idx}` }));
  if(table === 'kits') kits = (rows || []).map((x, idx) => normalizeKit(x, idx));
  if(table === 'topics') topics = (rows || []).map((x, idx) => normalizeTopic(x, idx));
  if(table === 'algorithms') algorithms = (rows || []).map((x, idx) => normalizeAlgorithm(x, idx));
  if(table === 'app_settings') applyAppSettingsRows(rows || []);
}
function scheduleOnlineRefresh(){
  if(!hasOnlineConfig()) return;
  clearTimeout(onlineRefreshTimer);
  onlineRefreshTimer = setTimeout(() => { loadOnlineData({ silent:true }); }, 700);
}
async function upsertTableOnline(table){
  if(!hasOnlineConfig()) return;
  const keyField = getOnlinePrimaryKey(table);
  const payload = getOnlinePayloadForTable(table);
  const { data: remoteRows, error: remoteError } = await supabaseClient.from(table).select(keyField);
  if(remoteError) throw new Error(formatOnlineError(remoteError));
  const localKeys = new Set(payload.map(row => String(row?.[keyField] || '').trim()).filter(Boolean));
  const remoteKeys = (remoteRows || []).map(row => String(row?.[keyField] || '').trim()).filter(Boolean);
  const keysToDelete = remoteKeys.filter(key => !localKeys.has(key));
  if(keysToDelete.length){
    const { error: deleteError } = await supabaseClient.from(table).delete().in(keyField, keysToDelete);
    if(deleteError) throw new Error(formatOnlineError(deleteError));
  }
  if(!payload.length) return;
  const { error } = await supabaseClient.from(table).upsert(payload, { onConflict: keyField });
  if(error) throw new Error(formatOnlineError(error));
}
async function syncAllOnline(options={}){
  if(!hasOnlineConfig()) throw new Error('Brak konfiguracji online. Uzupełnij config.js.');
  const sessionResp = await supabaseClient.auth.getSession();
  const session = sessionResp?.data?.session;
  if(!session) throw new Error('Brak zalogowanego administratora online. Zaloguj się w panelu administratora.');
  for (const table of ONLINE_TABLES){
    await upsertTableOnline(table);
  }
  const remotePresence = getRemoteTablePresenceMap();
  ONLINE_TABLES.forEach(table => { remotePresence[table] = true; });
  saveRemoteTablePresenceMap(remotePresence);
  if(!options.skipReload){
    await loadOnlineData({ silent:true, allowEmptyTables:true });
  }
}
function scheduleOnlineSync(){
  if(!hasOnlineConfig() || isApplyingRemoteState) return;
  clearTimeout(onlineSyncTimer);
  onlineSyncTimer = setTimeout(async () => {
    try{
      const sessionResp = await supabaseClient.auth.getSession();
      if(!sessionResp?.data?.session) return;
      await syncAllOnline({ skipReload:true });
      updateOnlineStatus('Zmiany zapisane online.', 'ok');
    }catch(err){
      updateOnlineStatus(`Zmiany zapisano lokalnie. Online: ${err.message}`, 'warn');
    }
  }, Number(cfg.autoSyncDelayMs || 900));
}
async function loadOnlineData(options={}){
  if(!hasOnlineConfig()) return false;
  try{
    const result = {};
    for (const table of ONLINE_TABLES){
      const { data, error } = await supabaseClient.from(table).select('*').order(table === 'app_settings' ? 'key' : 'id', { ascending:true });
      if(error) throw error;
      result[table] = data || [];
    }
    const remotePresence = getRemoteTablePresenceMap();
    const hasRemoteData = ONLINE_TABLES.some(table => (result[table] || []).length > 0);
    const canApplyEmptyTables = options.allowEmptyTables === true || ONLINE_TABLES.some(table => remotePresence[table]);
    if(!hasRemoteData && !canApplyEmptyTables) return false;
    isApplyingRemoteState = true;
    ONLINE_TABLES.forEach(table => {
      const remoteRows = result[table] || [];
      const localRows = getCollectionByTable(table) || [];
      const hasRows = remoteRows.length > 0;
      if(hasRows) remotePresence[table] = true;
      const shouldApply = hasRows || options.allowEmptyTables === true || remotePresence[table] || !localRows.length;
      if(shouldApply) assignCollectionByTable(table, remoteRows);
    });
    saveRemoteTablePresenceMap(remotePresence);
    sanitizeState();
normalizeOfflineAlgorithmIds();
normalizeAppInfo();
    saveLocal();
    renderAll();
    renderMap();
    if(!options.silent) updateOnlineStatus('Pobrano aktualne dane online.', 'ok');
    return true;
  }catch(err){
    const message = formatOnlineError(err);
    if(!options.silent) updateOnlineStatus(`Nie udało się pobrać danych online: ${message}`, 'warn');
    return false;
  }finally{
    isApplyingRemoteState = false;
  }
}
function ensureOnlineAdminBox(){
  const adminCard = $('screen-admin')?.querySelector('.card');
  if(!adminCard || $('onlineAdminBox')) return;
  const note = adminCard.querySelector('.note');
  const box = document.createElement('div');
  box.className = 'admin-password-box';
  box.id = 'onlineAdminBox';
  box.innerHTML = `
    <h3>Połączenie online i administrator Supabase</h3>
    <p class="note">Użytkownicy odczytują wspólne dane online. Administrator po zalogowaniu może zapisywać zmiany do bazy i automatycznie rozsyłać je do wszystkich urządzeń.</p>
    <div class="grid2">
      <label><span>Email administratora online</span><input id="onlineAdminEmail" type="email" autocomplete="username" placeholder="admin@twojadomena.pl"></label>
      <label><span>Hasło administratora online</span><input id="onlineAdminPassword" type="password" autocomplete="current-password" placeholder="Hasło Supabase Auth"></label>
    </div>
    <div class="row wrap-mobile">
      <button class="ghost" id="onlineAdminLoginBtn">Zaloguj online</button>
      <button class="ghost" id="onlineAdminLogoutBtn">Wyloguj online</button>
      <button class="ghost" id="onlineRefreshBtn">Pobierz dane online</button>
    </div>
    <div id="onlineStatusBox" class="note">Tryb online nieaktywny.</div>
  `;
  if(note) note.insertAdjacentElement('afterend', box);
  else adminCard.prepend(box);
}
function updateOnlineStatus(message, mode='info'){
  if (hasOnlineConfig()) ensureOnlineAdminBox();
  const el = $('onlineStatusBox');
  if(!el) return;
  el.textContent = message;
  el.style.color = mode === 'ok' ? 'var(--ok)' : (mode === 'warn' ? 'var(--amber)' : '');
}
async function refreshOnlineSessionInfo(){
  if(!hasOnlineConfig()){
    updateOnlineStatus('Tryb online wyłączony. Uzupełnij config.js.', 'warn');
    return null;
  }
  const { data } = await supabaseClient.auth.getSession();
  const session = data?.session || null;
  onlineSessionEmail = session?.user?.email || '';
  updateOnlineStatus(session ? `Zalogowano online jako: ${onlineSessionEmail}` : 'Połączenie online gotowe. Odczyt działa, zapis wymaga logowania administratora online.', session ? 'ok' : 'info');
  if($('onlineAdminEmail') && onlineSessionEmail && !$('onlineAdminEmail').value) $('onlineAdminEmail').value = onlineSessionEmail;
  return session;
}
async function bindOnlineRealtime(){
  if(!hasOnlineConfig()) return;
  if(onlineRealtimeChannel){
    try{ await supabaseClient.removeChannel(onlineRealtimeChannel); }catch(_){ }
    onlineRealtimeChannel = null;
  }
  onlineRealtimeChannel = supabaseClient.channel('pkp-ratownik-live');
  ONLINE_TABLES.forEach(table => {
    onlineRealtimeChannel.on('postgres_changes', { event:'*', schema:'public', table }, () => {
      scheduleOnlineRefresh();
    });
  });
  await onlineRealtimeChannel.subscribe();
}
async function initOnlineFeatures(){
  if (hasOnlineConfig()) ensureOnlineAdminBox();
  if(!hasOnlineConfig()){
    updateOnlineStatus('Tryb online wyłączony. Uzupełnij config.js wartościami Supabase.', 'warn');
    return;
  }
  await refreshOnlineSessionInfo();
  await loadOnlineData({ silent:false });
  await maybeNotifyAppNotice();
  await bindOnlineRealtime();
  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    onlineSessionEmail = session?.user?.email || '';
    updateOnlineStatus(session ? `Zalogowano online jako: ${onlineSessionEmail}` : 'Połączenie online gotowe. Odczyt działa, zapis wymaga logowania administratora online.', session ? 'ok' : 'info');
  });
}

function normalizeRescuer(item, idx=0){
  return {
    id: item?.id || `r${Date.now()}_${idx}`,
    name: String(item?.name || 'Ratownik').trim(),
    phone: String(item?.phone || '').trim(),
    zone: String(item?.zone || '').trim(),
    location: String(item?.location || item?.base || '').trim(),
    shift: String(item?.shift || '').trim(),
    skills: String(item?.skills || '').trim(),
    active: item?.active !== false,
    alarmGroup: item?.alarmGroup !== false
  };
}
function sanitizeAlarmHistory(){
  if(!Array.isArray(alarmHistory)) alarmHistory = [];
  alarmHistory = alarmHistory.map((entry, idx) => ({
    id: entry?.id || `alarm_${Date.now()}_${idx}`,
    ts: entry?.ts || new Date().toISOString(),
    actorRole: String(entry?.actorRole || 'Administrator'),
    actorName: String(entry?.actorName || 'Administrator lokalny'),
    action: String(entry?.action || 'Alarm'),
    zone: String(entry?.zone || ''),
    targets: Array.isArray(entry?.targets) ? entry.targets : [],
    defaultTarget: String(entry?.defaultTarget || ''),
    details: String(entry?.details || ''),
    report: String(entry?.report || ''),
    publicIp: String(entry?.publicIp || localStorage.getItem(STORAGE_KEYS.publicIp) || 'nieustalono')
  })).slice(0, 1000);
}
sanitizeAlarmHistory();
function saveAlarmHistory(){
  sanitizeAlarmHistory();
  localStorage.setItem(STORAGE_KEYS.alarmHistory, JSON.stringify(alarmHistory));
}
async function logAlarm({ actorRole='Administrator', action='Alarm', zone='', targets=[], defaultTarget='', details='', report='' }={}){
  const publicIp = await fetchPublicIp();
  alarmHistory.unshift({
    id: `alarm_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,
    ts: new Date().toISOString(),
    actorRole,
    actorName: getOperatorName(actorRole),
    action,
    zone,
    targets,
    defaultTarget,
    details,
    report,
    publicIp: publicIp || localStorage.getItem(STORAGE_KEYS.publicIp) || 'nieustalono'
  });
  alarmHistory = alarmHistory.slice(0,1000);
  saveAlarmHistory();
  renderAlarmHistory();
}
function logAlarmSync(payload){ logAlarm(payload); }
function getDefaultZone(){
  return localStorage.getItem(STORAGE_KEYS.defaultZone) || $('rescuerZakladFilter')?.value || $('defaultZakladSelect')?.value || '';
}
function getRescuersForZone(zone, onlyAlarmGroup=true){
  const normalizedZone = String(zone || '').trim();
  return rescuers.filter(r => (!normalizedZone || r.zone === normalizedZone) && r.phone && (!onlyAlarmGroup || r.alarmGroup !== false));
}
function normalizeKitItem(entry){
  if(entry && typeof entry === 'object') return { name: String(entry.name||'').trim(), size: String(entry.size||'').trim(), qty: String(entry.qty||entry.quantity||'').trim(), expiry: String(entry.expiry||'').trim() };
  const txt = String(entry||'').trim();
  if(!txt) return { name:'', size:'', qty:'', expiry:'' };
  const parts = txt.split('|').map(s=>s.trim());
  if(parts.length >= 4) return { name: parts[0] || '', size: parts[1] || '', qty: parts[2] || '', expiry: parts[3] || '' };
  if(parts.length === 3) return { name: parts[0] || '', size: parts[1] || '', qty: '', expiry: parts[2] || '' };
  if(parts.length === 2) return { name: parts[0] || '', size: '', qty: '', expiry: parts[1] || '' };
  return { name: txt, size:'', qty:'', expiry:'' };
}
function normalizeKit(kit, idx=0){
  const rawItems = Array.isArray(kit?.items) ? kit.items : Array.isArray(kit?.contents) ? kit.contents : [];
  const items = rawItems.map(normalizeKitItem).filter(x => x.name);
  return { id: kit?.id || `k${Date.now()}_${idx}`, name: kit?.name || 'Apteczka', type: kit?.type || 'zakładowa', location: kit?.location || '', categories: Array.isArray(kit?.categories) ? kit.categories : [], items: items.length ? items : [{name:'brak opisu zawartości', size:'', qty:'', expiry:''}] };
}
function detectCsvDelimiter(text){
  const sample = String(text || '').replace(/^\uFEFF/, '').split(/\r?\n/, 1)[0] || '';
  const semicolons = (sample.match(/;/g) || []).length;
  const commas = (sample.match(/,/g) || []).length;
  return semicolons >= commas ? ';' : ',';
}
function parseCsvMatrix(text, forcedDelimiter=''){
  const source = String(text || '').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const delimiter = forcedDelimiter || detectCsvDelimiter(source);
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  for(let i = 0; i < source.length; i++){
    const ch = source[i];
    if(inQuotes){
      if(ch === '"'){
        if(source[i + 1] === '"'){
          cell += '"';
          i++;
        }else{
          inQuotes = false;
        }
      }else{
        cell += ch;
      }
      continue;
    }
    if(ch === '"'){
      inQuotes = true;
      continue;
    }
    if(ch === delimiter){
      row.push(cell);
      cell = '';
      continue;
    }
    if(ch === '\n'){
      row.push(cell);
      if(row.some(value => String(value || '').trim() !== '')) rows.push(row);
      row = [];
      cell = '';
      continue;
    }
    cell += ch;
  }
  row.push(cell);
  if(row.some(value => String(value || '').trim() !== '')) rows.push(row);
  if(!rows.length) return { header: [], dataRows: [], delimiter };
  const header = rows[0].map(value => String(value || '').trim());
  const dataRows = rows.slice(1).filter(values => values.some(value => String(value || '').trim() !== ''));
  return { header, dataRows, delimiter };
}
function csvRowsToObjects(header, dataRows){
  const keys = (header || []).map(value => String(value || '').trim().toLowerCase());
  return (dataRows || []).map(values => {
    const row = {};
    keys.forEach((key, idx) => {
      if(key) row[key] = String(values[idx] ?? '').trim();
    });
    return row;
  });
}
function parseCsvBool(value, fallback=true){
  const txt = String(value ?? '').trim().toLowerCase();
  if(!txt) return fallback;
  if(['nie','false','0','no'].includes(txt)) return false;
  if(['tak','true','1','yes'].includes(txt)) return true;
  return fallback;
}
function parseCsvCategories(value){
  const txt = String(value ?? '').trim();
  if(!txt) return [];
  if((txt.startsWith('[') && txt.endsWith(']')) || (txt.startsWith('"[') && txt.endsWith(']"'))){
    try{
      const normalized = txt.startsWith('"[') ? txt.slice(1, -1).replace(/""/g, '"') : txt;
      const parsed = JSON.parse(normalized);
      if(Array.isArray(parsed)) return parsed.map(item => String(item || '').trim()).filter(Boolean);
    }catch(_){ }
  }
  return txt.split(',').map(item => item.trim()).filter(Boolean);
}
function normalizeKitContentsText(value){
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/(\d{4}-\d{2})\s*-\s*\n\s*(\d{2})/g, '$1-$2')
    .trim();
}
function parseKitContentsField(value){
  const txt = normalizeKitContentsText(value);
  if(!txt) return [];
  if((txt.startsWith('[') && txt.endsWith(']')) || (txt.startsWith('"[') && txt.endsWith(']"'))){
    try{
      const normalized = txt.startsWith('"[') ? txt.slice(1, -1).replace(/""/g, '"') : txt;
      const parsed = JSON.parse(normalized);
      if(Array.isArray(parsed)) return parsed.map(normalizeKitItem).filter(item => item.name);
    }catch(_){ }
  }
  const chunks = txt.includes('||')
    ? txt.split(/\s*\|\|\s*/)
    : txt.split(/\n+/);
  return chunks
    .map(chunk => chunk.trim())
    .filter(Boolean)
    .map(normalizeKitItem)
    .filter(item => item.name);
}
function normalizeTopicSectionsText(value){
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}
function parseTopicImagesField(value){
  const txt = String(value ?? '').trim();
  if(!txt) return [];
  if((txt.startsWith('[') && txt.endsWith(']')) || (txt.startsWith('"[') && txt.endsWith(']"'))){
    try{
      const normalized = txt.startsWith('"[') ? txt.slice(1, -1).replace(/""/g, '"') : txt;
      const parsed = JSON.parse(normalized);
      if(Array.isArray(parsed)) return parsed.map(item => String(item || '').trim()).filter(Boolean).slice(0,4);
    }catch(_){ }
  }
  return txt.split(/\r?\n|,/).map(item => item.trim()).filter(Boolean).slice(0,4);
}
function parseTopicSectionsField(value){
  const txt = normalizeTopicSectionsText(value);
  if(!txt) return [];
  if((txt.startsWith('[') && txt.endsWith(']')) || (txt.startsWith('"[') && txt.endsWith(']"'))){
    try{
      const normalized = txt.startsWith('"[') ? txt.slice(1, -1).replace(/""/g, '"') : txt;
      const parsed = JSON.parse(normalized);
      if(Array.isArray(parsed)) return parsed.map((section, idx) => normalizeSection(section, idx === 0 ? 'ok' : 'warn'));
    }catch(_){ }
  }
  const chunks = txt.includes('||')
    ? txt.split(/\s*\|\|\s*/)
    : txt.split(/\n+/);
  return chunks
    .map(chunk => chunk.trim())
    .filter(Boolean)
    .map((chunk, idx) => {
      if(!chunk.includes('::')) return normalizeSection(chunk, idx === 0 ? 'ok' : 'warn');
      const parts = chunk.split(/\s*::\s*/).map(part => part.trim());
      const type = parts[0] || (idx === 0 ? 'ok' : 'warn');
      const title = parts[1] || (type === 'warn' ? 'Ważne' : 'Postępowanie');
      const itemsRaw = parts.slice(2).join(' :: ');
      const items = itemsRaw.split('|').map(part => part.trim()).filter(Boolean);
      return normalizeSection([type, title, items], idx === 0 ? 'ok' : 'warn');
    })
    .filter(Boolean);
}
function getImportTargetInfo(type){
  if(type === 'rescuers') return { list: rescuers, entityType: 'rescuer', label: 'ratowników' };
  if(type === 'aeds') return { list: aeds, entityType: 'aed', label: 'AED' };
  if(type === 'kits') return { list: kits, entityType: 'kit', label: 'apteczek' };
  throw new Error('Nieobsługiwany typ importu.');
}
function mapCsvRowToEntity(type, row, idx){
  if(type === 'rescuers'){
    const item = normalizeRescuer({
      id: row.id || `r${Date.now()}_${idx}`,
      name: row.name || row.imie || row['imię'] || '',
      phone: row.phone || row.telefon || '',
      zone: row.zone || row.zaklad || row['zakład'] || '',
      location: row.location || row.lokalizacja || '',
      shift: row.shift || row.zmiana || '',
      skills: row.skills || row.uprawnienia || '',
      alarmGroup: parseCsvBool(row.alarmgroup, true),
      active: parseCsvBool(row.active, true)
    }, idx);
    if(!item.name || !item.phone) throw new Error(`Wiersz ${idx + 2}: ratownik wymaga pól name i phone.`);
    return item;
  }
  if(type === 'aeds'){
    const lat = Number(String(row.lat || '').replace(',', '.'));
    const lon = Number(String(row.lon || '').replace(',', '.'));
    if(!row.name || !row.location) throw new Error(`Wiersz ${idx + 2}: AED wymaga pól name i location.`);
    if(Number.isNaN(lat) || Number.isNaN(lon)) throw new Error(`Wiersz ${idx + 2}: AED wymaga poprawnych pól lat i lon.`);
    return {
      id: row.id || `a${Date.now()}_${idx}`,
      name: String(row.name || '').trim(),
      location: String(row.location || '').trim(),
      lat,
      lon
    };
  }
  if(type === 'kits'){
    const items = parseKitContentsField(row.contents || row.items || '');
    const item = normalizeKit({
      id: row.id || `k${Date.now()}_${idx}`,
      name: row.name || '',
      type: row.type || 'zakładowa',
      location: row.location || '',
      categories: parseCsvCategories(row.categories || ''),
      items
    }, idx);
    if(!item.name || !item.location) throw new Error(`Wiersz ${idx + 2}: apteczka wymaga pól name i location.`);
    return item;
  }
  throw new Error('Nieobsługiwany typ importu.');
}
function getImportTargetInfo(type){
  if(type === 'rescuers') return { list: rescuers, entityType: 'rescuer', label: 'ratownikow' };
  if(type === 'aeds') return { list: aeds, entityType: 'aed', label: 'AED' };
  if(type === 'kits') return { list: kits, entityType: 'kit', label: 'apteczek' };
  if(type === 'topics') return { list: topics, entityType: 'topic', label: 'tematow' };
  throw new Error('Nieobslugiwany typ importu.');
}
function mapCsvRowToEntity(type, row, idx){
  if(type === 'rescuers'){
    const item = normalizeRescuer({
      id: row.id || `r${Date.now()}_${idx}`,
      name: row.name || row.imie || row['imię'] || '',
      phone: row.phone || row.telefon || '',
      zone: row.zone || row.zaklad || row['zakład'] || '',
      location: row.location || row.lokalizacja || '',
      shift: row.shift || row.zmiana || '',
      skills: row.skills || row.uprawnienia || '',
      alarmGroup: parseCsvBool(row.alarmgroup, true),
      active: parseCsvBool(row.active, true)
    }, idx);
    if(!item.name || !item.phone) throw new Error(`Wiersz ${idx + 2}: ratownik wymaga pol name i phone.`);
    return item;
  }
  if(type === 'aeds'){
    const lat = Number(String(row.lat || '').replace(',', '.'));
    const lon = Number(String(row.lon || '').replace(',', '.'));
    if(!row.name || !row.location) throw new Error(`Wiersz ${idx + 2}: AED wymaga pol name i location.`);
    if(Number.isNaN(lat) || Number.isNaN(lon)) throw new Error(`Wiersz ${idx + 2}: AED wymaga poprawnych pol lat i lon.`);
    return {
      id: row.id || `a${Date.now()}_${idx}`,
      name: String(row.name || '').trim(),
      location: String(row.location || '').trim(),
      lat,
      lon
    };
  }
  if(type === 'kits'){
    const items = parseKitContentsField(row.contents || row.items || '');
    const item = normalizeKit({
      id: row.id || `k${Date.now()}_${idx}`,
      name: row.name || '',
      type: row.type || 'zakładowa',
      location: row.location || '',
      categories: parseCsvCategories(row.categories || ''),
      items
    }, idx);
    if(!item.name || !item.location) throw new Error(`Wiersz ${idx + 2}: apteczka wymaga pol name i location.`);
    return item;
  }
  if(type === 'topics'){
    const item = normalizeTopic({
      id: row.id || `t${Date.now()}_${idx}`,
      n: Number(row.n) || idx + 1,
      category: row.category || row.kategoria || row.group || '',
      icon: row.icon || '🩺',
      title: row.title || row.t || '',
      img: row.img || row.image || '',
      images: parseTopicImagesField(row.images || row.img || row.image || ''),
      lead: row.lead || row.intro || row.description || '',
      leadTitle: row.leadtitle || row.lead_title || 'Wstęp',
      leadColor: row.leadcolor || row.lead_color || defaultTopicColors.lead,
      stepsColor: row.stepscolor || row.steps_color || defaultTopicColors.steps,
      warnColor: row.warncolor || row.warn_color || defaultTopicColors.warn,
      notesColor: row.notescolor || row.notes_color || defaultTopicColors.notes,
      relatedAlgorithmIds: parseCsvCategories(row.relatedalgorithmids || row.related_algorithms || row.algorithms || ''),
      sections: parseTopicSectionsField(row.sections || row.s || '')
    }, idx);
    if(!item.t) throw new Error(`Wiersz ${idx + 2}: temat wymaga pola title.`);
    return item;
  }
  throw new Error('Nieobslugiwany typ importu.');
}
async function handleCsvImport(file, type){
  if(!file) return;
  try{
    const text = await file.text();
    const { header, dataRows } = parseCsvMatrix(text);
    if(!header.length || !dataRows.length) throw new Error('Plik CSV jest pusty albo nie zawiera danych.');
    const rows = csvRowsToObjects(header, dataRows);
    const target = getImportTargetInfo(type);
    const items = rows.map((row, idx) => mapCsvRowToEntity(type, row, idx));
    items.forEach(item => upsertEntity(target.list, item));
    if(type === 'topics'){
      topics = topics
        .map((topic, topicIdx) => normalizeTopic(topic, topicIdx))
        .sort((a, b) => (Number(a.n) || 9999) - (Number(b.n) || 9999) || String(a.t || '').localeCompare(String(b.t || ''), 'pl'));
    }
    saveLocal();
    renderAll();
    if(type === 'aeds') renderMap();
    logChangeSync(makeHistoryPayload({
      actorRole:'Administrator',
      action:'Import CSV',
      entityType: target.entityType,
      label: file.name,
      afterState: `zaimportowano ${items.length} ${target.label}`,
      details: `Zaimportowano plik CSV: ${file.name}.`
    }));
    alert(`Zaimportowano ${items.length} ${target.label} z pliku ${file.name}.`);
  }catch(err){
    alert('Błąd importu CSV: ' + (err?.message || err));
  }
}
function isExpired(dateText){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(String(dateText||''))) return false;
  const today = new Date();
  today.setHours(0,0,0,0);
  const d = new Date(dateText + 'T00:00:00');
  return !Number.isNaN(d.getTime()) && d < today;
}
function formatExpiry(dateText){ return /^\d{4}-\d{2}-\d{2}$/.test(String(dateText||'')) ? dateText : 'brak'; }
function expiredKitRows(){
  return kits.map((k,idx)=>normalizeKit(k,idx)).flatMap(k => (k.items||[]).filter(i => isExpired(i.expiry)).map(i => ({kit:k.name, location:k.location, item:i.name, size:i.size || '', qty:i.qty || '', expiry:i.expiry})));
}
function buildExpiredKitReport(){
  const rows = expiredKitRows();
  if(!rows.length) return 'Brak przeterminowanych artykułów w apteczkach.';
  return ['Raport apteczek – artykuły przeterminowane',''].concat(rows.map((r,i)=>`${i+1}. ${r.kit} | ${r.location} | ${r.item}${r.size ? ' | rozmiar: ' + r.size : ''}${r.qty ? ' | ilość: ' + r.qty : ''} | termin: ${r.expiry}`)).join('\n');
}
const DEFAULT_ADMIN_PASSWORD = 'Ratownik_PLK';
const DEFAULT_MASTER_PASSWORD = 'Lisu87';
const DEFAULT_MASTER_PIN = '8716';
function getAdminPassword(){ return localStorage.getItem(STORAGE_KEYS.adminPassword) || DEFAULT_ADMIN_PASSWORD; }
function getMasterPassword(){ return localStorage.getItem(STORAGE_KEYS.masterPassword) || DEFAULT_MASTER_PASSWORD; }
function getMasterPin(){ return localStorage.getItem(STORAGE_KEYS.masterPin) || DEFAULT_MASTER_PIN; }

function getDefaultRescuerMap(){
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.defaultRescuerByZone);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? parsed : deepClone(defaultRescuerByZoneSeed);
  } catch(err){
    return deepClone(defaultRescuerByZoneSeed);
  }
}
function saveDefaultRescuerMap(map){
  localStorage.setItem(STORAGE_KEYS.defaultRescuerByZone, JSON.stringify(map || {}));
}
function getDefaultRescuerForZone(zone){
  const normalizedZone = String(zone || '').trim();
  if(!normalizedZone) return null;
  const map = getDefaultRescuerMap();
  const mappedId = map[normalizedZone];
  let target = rescuers.find(r => r.id === mappedId && r.zone === normalizedZone && r.phone);
  if(!target) target = rescuers.find(r => r.zone === normalizedZone && r.phone) || null;
  return target;
}
function setDefaultRescuerForZone(zone, rescuerId, actorRole='Administrator'){
  const normalizedZone = String(zone || '').trim();
  if(!normalizedZone) return false;
  const target = rescuers.find(r => r.id === rescuerId && r.zone === normalizedZone);
  if(!target) return false;
  const map = getDefaultRescuerMap();
  const previousId = map[normalizedZone] || '';
  map[normalizedZone] = rescuerId;
  saveDefaultRescuerMap(map);
  logChangeSync(makeHistoryPayload({
    actorRole,
    action:'Ustawienie domyślnego ratownika',
    entityType:'rescuer',
    entityId:target.id,
    label:`${target.name} / ${normalizedZone}`,
    beforeState: previousId ? `poprzedni domyślny ID: ${previousId}` : 'brak domyślnego ratownika',
    afterState: `domyślny ratownik: ${target.name} (${target.phone})`,
    details:`Ustawiono domyślnego ratownika dla zakładu ${normalizedZone}.`
  }));
  return true;
}
function buildAlarmMessageForRescuers(selected){
  const zaklad = getDefaultZone();
  const names = (selected || []).map(r => r.name).join(', ');
  const header = reportFor('ratownicy zakładowi');
  return [header, zaklad ? `Zakład: ${zaklad}` : '', names ? `Adresaci: ${names}` : ''].filter(Boolean).join('\n');
}
function alarmSelectedRescuers(){
  const ids = selectedRescuers();
  const selected = rescuers.filter(r => ids.includes(r.id) && r.phone);
  if(!selected.length) return alert('Zaznacz co najmniej jednego ratownika.');
  const zone = getDefaultZone() || selected[0]?.zone || '';
  if(!confirm(`Czy chcesz alarmować zaznaczonych ratowników?

Liczba osób: ${selected.length}`)) return;
  const message = buildAlarmMessageForRescuers(selected);
  const numbers = openSmsToRecipients(selected, message);
  notifyLocal('Alarm grupowy', `Przygotowano alarm dla ${selected.length} ratowników.`, { source:'Alarmy', level:'alarm' }).catch(()=>{});
  logChangeSync(makeHistoryPayload({
    actorRole:'Administrator',
    action:'Alarm SMS + telefon',
    entityType:'rescuer',
    label:selected.map(r => r.name).join(', '),
    beforeState:'brak aktywnego alarmu',
    afterState:`SMS do: ${numbers}`,
    details:`Uruchomiono alarm grupowy dla ${selected.length} ratowników. Po wysłaniu SMS aplikacja proponuje połączenie do kolejnych osób.`
  }));
  logAlarmSync({ actorRole:'Administrator', action:'Alarm grupowy: SMS + telefon', zone, targets:selected.map(r => ({name:r.name, phone:r.phone})), defaultTarget:'połączenia sekwencyjne', details:`Alarm ręczny dla ${selected.length} zaznaczonych ratowników.`, report: message });
  setTimeout(() => startSequentialCalls(selected), 900);
}
function startSequentialCalls(selected){
  if(!Array.isArray(selected) || !selected.length) return;
  let idx = 0;
  const nextCall = () => {
    const person = selected[idx];
    if(!person) return;
    const ok = confirm(`Czy chcesz teraz zadzwonić do ${person.name} (${person.phone})?\n\n${idx + 1} z ${selected.length}`);
    if(!ok) return;
    logChangeSync(makeHistoryPayload({
      actorRole:'Administrator',
      action:'Połączenie alarmowe',
      entityType:'rescuer',
      entityId:person.id,
      label:person.name,
      beforeState:'oczekiwanie na kontakt',
      afterState:`połączenie tel. ${person.phone}`,
      details:`Wybrano połączenie telefoniczne do ratownika ${person.name}.`
    }));
    window.location.href = 'tel:' + person.phone;
    idx += 1;
    if(idx < selected.length){
      setTimeout(() => {
        const continueCalls = confirm('Czy po zakończeniu połączenia chcesz zadzwonić do kolejnego ratownika?');
        if(continueCalls) nextCall();
      }, 1200);
    }
  };
  nextCall();
}

function confirmAlarmForZone(zone, recipients){
  return confirm(`Czy chcesz alarmować wszystkich ratowników z zakładu ${zone || 'domyślnego'}?

Liczba osób: ${recipients.length}`);
}
function openSmsToRecipients(recipients, message){
  const numbers = recipients.map(r => r.phone).join(',');
  window.location.href = 'sms:' + numbers + '?body=' + encodeURIComponent(message);
  return numbers;
}
function alarmZone(){
  const zone = getDefaultZone();
  if(!zone) return alert('Ustaw najpierw domyślny zakład.');
  const recipients = getRescuersForZone(zone, true);
  if(!recipients.length) return alert('Brak ratowników alarmowych dla wybranego zakładu.');
  if(!confirmAlarmForZone(zone, recipients)) return;
  const defaultTarget = getDefaultRescuerForZone(zone) || recipients[0];
  const message = buildAlarmMessageForRescuers(recipients);
  const numbers = openSmsToRecipients(recipients, message);
  notifyLocal('Alarm zakładu', `Przygotowano alarm dla ${recipients.length} ratowników z ${zone}.`, { source:'Alarmy', level:'alarm' });
  logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action:'Alarm zakładu', entityType:'system', label:zone, beforeState:'brak aktywnego alarmu', afterState:`SMS do: ${numbers}`, details:`Uruchomiono alarm dla zakładu ${zone}. Następnie proponowane jest połączenie do domyślnego ratownika.` }));
  logAlarmSync({ actorRole:'Administrator', action:'Alarm zakładu: SMS + telefon', zone, targets: recipients.map(r => ({name:r.name, phone:r.phone})), defaultTarget: defaultTarget ? `${defaultTarget.name} (${defaultTarget.phone})` : '', details:`SMS do grupy alarmowej (${recipients.length} osób) i propozycja telefonu do domyślnego ratownika.`, report: message });
  setTimeout(() => {
    if(defaultTarget && confirm(`Czy chcesz teraz zadzwonić do domyślnego ratownika ${defaultTarget.name} (${defaultTarget.phone})?`)){
      window.location.href = 'tel:' + defaultTarget.phone;
    }
  }, 900);
}

function renderOfflineSummary(){
  const boxes = [$('offlineSummaryInline'), $('offlineSummaryModal'), $('offlineSummary')].filter(Boolean);
  if(!boxes.length) return;
  normalizeOfflineAlgorithmIds();
  const essentials = offlineAlgorithmIds
    .map(id => getAlgorithmById(id))
    .filter(Boolean)
    .map((algo, idx) => normalizeAlgorithm(algo, idx));
  const html = `<div class="offline-grid"><div class="offline-card"><h3>Numery alarmowe</h3><div class="panic-grid"><button class="hero danger hero-small" onclick="location.href='tel:112'">112</button><button class="hero amber hero-small" onclick="location.href='tel:999'">999</button></div><p class="note">Działa także offline jako skróty telefonu systemowego.</p></div><div class="offline-card"><h3>Najważniejsze algorytmy</h3>${essentials.length ? essentials.map(a => `<details><summary>${esc(a.icon)} ${esc(a.title)}</summary><ol>${a.steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol></details>`).join('') : '<p class="note">Brak wybranych algorytmów offline. Ustaw je w panelu administratora.</p>'}</div></div>`;
  boxes.forEach(box => box.innerHTML = html);
}

function sanitizeHistoryState(){
  if(!Array.isArray(changeHistory)) changeHistory = [];
  changeHistory = changeHistory.map((entry, idx) => ({
    id: entry?.id || `log_${Date.now()}_${idx}`,
    ts: entry?.ts || new Date().toISOString(),
    actorRole: String(entry?.actorRole || 'Administrator'),
    actorName: String(entry?.actorName || 'Administrator lokalny'),
    action: String(entry?.action || 'Zmiana'),
    entityType: String(entry?.entityType || 'system'),
    entityId: String(entry?.entityId || ''),
    label: String(entry?.label || entry?.entityType || 'Pozycja'),
    details: String(entry?.details || ''),
    beforeState: String(entry?.beforeState || ''),
    afterState: String(entry?.afterState || ''),
    publicIp: String(entry?.publicIp || localStorage.getItem(STORAGE_KEYS.publicIp) || 'nieustalono'),
    device: String(entry?.device || navigator.userAgent || '')
  })).slice(0, 1000);
}
sanitizeHistoryState();
function saveHistory(){
  sanitizeHistoryState();
  localStorage.setItem(STORAGE_KEYS.changeHistory, JSON.stringify(changeHistory));
}
function getOperatorName(role='Administrator'){
  const key = role === 'Master' ? STORAGE_KEYS.masterOperator : STORAGE_KEYS.adminOperator;
  return sessionStorage.getItem(key) || `${role} lokalny`;
}
function captureOperatorName(role='Administrator'){
  const key = role === 'Master' ? STORAGE_KEYS.masterOperator : STORAGE_KEYS.adminOperator;
  const existing = sessionStorage.getItem(key);
  if(existing) return existing;
  const proposed = prompt(`Podaj identyfikator operatora (${role}) – imię, nazwisko lub login.`) || '';
  const finalValue = proposed.trim() || `${role} lokalny`;
  sessionStorage.setItem(key, finalValue);
  return finalValue;
}
let publicIpLookupPromise = null;
async function fetchPublicIp(force=false){
  const cached = localStorage.getItem(STORAGE_KEYS.publicIp);
  if(cached && !force) return cached;
  if(publicIpLookupPromise && !force) return publicIpLookupPromise;
  publicIpLookupPromise = (async () => {
    try{
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 2500);
      const res = await fetch('https://api.ipify.org?format=json', { cache:'no-store', signal: ctrl.signal });
      clearTimeout(timer);
      const data = await res.json();
      const ip = String(data?.ip || '').trim();
      if(ip){
        localStorage.setItem(STORAGE_KEYS.publicIp, ip);
        updateCurrentContextInfo();
        return ip;
      }
    }catch(e){}
    const fallback = cached || 'nieustalono';
    if(fallback) localStorage.setItem(STORAGE_KEYS.publicIp, fallback);
    updateCurrentContextInfo();
    return fallback;
  })();
  const result = await publicIpLookupPromise;
  publicIpLookupPromise = null;
  return result;
}
function formatHistoryDate(ts){
  const d = new Date(ts);
  if(Number.isNaN(d.getTime())) return esc(ts);
  return d.toLocaleString('pl-PL');
}
function historyEntityLabel(type){
  return ({
    rescuer:'Ratownik',
    aed:'AED',
    kit:'Apteczka',
    topic:'Temat',
    algorithm:'Algorytm',
    password:'Hasło',
    system:'System'
  })[type] || type;
}
function stringifyState(value){
  if(value == null) return '';
  return String(value).trim();
}
function historyStateText(beforeState='', afterState=''){
  const beforeTxt = stringifyState(beforeState);
  const afterTxt = stringifyState(afterState);
  if(beforeTxt && afterTxt) return `Przed zmianą: ${beforeTxt}\nPo zmianie: ${afterTxt}`;
  if(beforeTxt) return `Przed zmianą: ${beforeTxt}`;
  if(afterTxt) return `Po zmianie: ${afterTxt}`;
  return '';
}
function buildHistoryRows(){
  return changeHistory.map(entry => ({
    data: formatHistoryDate(entry.ts),
    rola: entry.actorRole,
    operator: entry.actorName,
    akcja: entry.action,
    obszar: historyEntityLabel(entry.entityType),
    pozycja: entry.label,
    ip: entry.publicIp,
    przed: entry.beforeState || '',
    po: entry.afterState || '',
    szczegoly: entry.details || ''
  }));
}
function buildHistoryExcelHtml(){
  const rows = buildHistoryRows();
  const tr = rows.map(r => `<tr><td>${esc(r.data)}</td><td>${esc(r.rola)}</td><td>${esc(r.operator)}</td><td>${esc(r.akcja)}</td><td>${esc(r.obszar)}</td><td>${esc(r.pozycja)}</td><td>${esc(r.ip)}</td><td>${esc(r.przed)}</td><td>${esc(r.po)}</td><td>${esc(r.szczegoly)}</td></tr>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>table{border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:12px}th,td{border:1px solid #999;padding:6px;vertical-align:top;text-align:left}th{background:#eaf0ff}</style></head><body><table><thead><tr><th>Data</th><th>Rola</th><th>Operator</th><th>Akcja</th><th>Obszar</th><th>Pozycja</th><th>IP publiczne</th><th>Przed zmianą</th><th>Po zmianie</th><th>Szczegóły</th></tr></thead><tbody>${tr}</tbody></table></body></html>`;
}

function buildAlarmRows(){
  return alarmHistory.map(entry => ({
    data: formatHistoryDate(entry.ts),
    rola: entry.actorRole,
    operator: entry.actorName,
    akcja: entry.action,
    zaklad: entry.zone || '',
    adresaci: (entry.targets || []).map(t => `${t.name} (${t.phone})`).join('; '),
    domyslny: entry.defaultTarget || '',
    ip: entry.publicIp || '',
    szczegoly: entry.details || '',
    raport: entry.report || ''
  }));
}
function xmlCell(value){
  return `<Cell><Data ss:Type="String">${esc(String(value ?? ''))}</Data></Cell>`;
}
function buildWorkbookExcelXml(){
  const historyRows = buildHistoryRows();
  const alarmRows = buildAlarmRows();
  const historyXml = historyRows.map(r => `<Row>${xmlCell(r.data)}${xmlCell(r.rola)}${xmlCell(r.operator)}${xmlCell(r.akcja)}${xmlCell(r.obszar)}${xmlCell(r.pozycja)}${xmlCell(r.ip)}${xmlCell(r.przed)}${xmlCell(r.po)}${xmlCell(r.szczegoly)}</Row>`).join('');
  const alarmXml = alarmRows.map(r => `<Row>${xmlCell(r.data)}${xmlCell(r.rola)}${xmlCell(r.operator)}${xmlCell(r.akcja)}${xmlCell(r.zaklad)}${xmlCell(r.adresaci)}${xmlCell(r.domyslny)}${xmlCell(r.ip)}${xmlCell(r.szczegoly)}${xmlCell(r.raport)}</Row>`).join('');
  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Historia zmian"><Table><Row>${xmlCell('Data')}${xmlCell('Rola')}${xmlCell('Operator')}${xmlCell('Akcja')}${xmlCell('Obszar')}${xmlCell('Pozycja')}${xmlCell('IP publiczne')}${xmlCell('Przed zmianą')}${xmlCell('Po zmianie')}${xmlCell('Szczegóły')}</Row>${historyXml}</Table></Worksheet><Worksheet ss:Name="Historia alarmów"><Table><Row>${xmlCell('Data')}${xmlCell('Rola')}${xmlCell('Operator')}${xmlCell('Akcja')}${xmlCell('Zakład')}${xmlCell('Adresaci')}${xmlCell('Domyślny ratownik')}${xmlCell('IP publiczne')}${xmlCell('Szczegóły')}${xmlCell('Raport')}</Row>${alarmXml}</Table></Worksheet></Workbook>`;
}
function renderAlarmHistory(){
  sanitizeAlarmHistory();
  const listEl = $('alarmHistoryList');
  if(!listEl) return;
  const filter = $('alarmHistoryZoneFilter')?.value || '';
  const search = ($('alarmHistorySearch')?.value || '').trim().toLowerCase();
  const rows = alarmHistory.filter(entry => {
    const hay = [entry.action, entry.zone, entry.details, entry.publicIp, entry.actorName, ...(entry.targets || []).map(t => `${t.name} ${t.phone}`), entry.defaultTarget, entry.report].join(' ').toLowerCase();
    return (!filter || entry.zone === filter) && (!search || hay.includes(search));
  });
  if($('alarmHistoryCountBadge')) $('alarmHistoryCountBadge').textContent = `Alarmy: ${rows.length}`;
  listEl.innerHTML = rows.map(entry => `
    <article class="history-item">
      <div class="history-head"><div><strong>${esc(entry.action)} • ${esc(entry.zone || 'bez zakładu')}</strong><div class="history-meta">${esc(formatHistoryDate(entry.ts))} • ${esc(entry.actorRole)}: ${esc(entry.actorName)}</div></div><span class="badge small">${esc(entry.publicIp || 'nieustalono')}</span></div>
      <div class="history-label">Adresaci alarmu</div>
      <div class="history-details">${esc((entry.targets || []).map(t => `${t.name} (${t.phone})`).join('; ') || 'Brak danych')}</div>
      <div class="history-before-after"><div><strong>Domyślny ratownik:</strong><br>${esc(entry.defaultTarget || '—')}</div><div><strong>Szczegóły:</strong><br>${esc(entry.details || '—')}</div></div>
    </article>`).join('') || '<div class="empty-state">Brak zapisanej historii alarmów.</div>';
}
function makeHistoryPayload({ actorRole='Administrator', action='Zmiana', entityType='system', entityId='', label='', beforeState='', afterState='', details='' } = {}){
  const merged = [details || '', historyStateText(beforeState, afterState)].filter(Boolean).join('\n\n');
  return { actorRole, action, entityType, entityId, label, beforeState: stringifyState(beforeState), afterState: stringifyState(afterState), details: merged };
}
function summarizePasswordSecret(value){
  const txt = String(value || '');
  return txt ? `ukryte (${txt.length} znaków)` : 'brak';
}
function confirmMasterHistoryDelete(){
  const pwd = prompt('Usuń historię zmian: podaj hasło master');
  if(pwd !== getMasterPassword()) return { ok:false, reason:'hasło' };
  const pin = prompt('Podaj PIN potwierdzenia panelu master');
  if(String(pin || '').trim() !== String(getMasterPin())) return { ok:false, reason:'pin' };
  return { ok:true };
}

function buildHistoryCsv(){
  const rows = [['Data','Rola','Operator','Akcja','Obszar','Pozycja','IP publiczne','Szczegóły']];
  changeHistory.forEach(entry => rows.push([
    formatHistoryDate(entry.ts),
    entry.actorRole,
    entry.actorName,
    entry.action,
    historyEntityLabel(entry.entityType),
    entry.label,
    entry.publicIp,
    entry.details
  ]));
  return rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g,'""')}"`).join(';')).join('\n');
}
function renderChangeHistory(){
  sanitizeHistoryState();
  const listEl = $('changeHistoryList');
  if(!listEl) return;
  const filter = $('changeHistoryFilter')?.value || '';
  const search = ($('changeHistorySearch')?.value || '').trim().toLowerCase();
  const rows = changeHistory.filter(entry => {
    const hay = [entry.actorRole, entry.actorName, entry.action, entry.entityType, entry.label, entry.details, entry.publicIp].join(' ').toLowerCase();
    return (!filter || entry.entityType === filter) && (!search || hay.includes(search));
  });
  listEl.innerHTML = rows.map(entry => `
    <article class="history-item">
      <div class="history-head">
        <div>
          <strong>${esc(entry.action)} • ${esc(historyEntityLabel(entry.entityType))}</strong>
          <div class="history-meta">${esc(formatHistoryDate(entry.ts))} • ${esc(entry.actorRole)}: ${esc(entry.actorName)}</div>
        </div>
        <span class="badge small">${esc(entry.publicIp || 'nieustalono')}</span>
      </div>
      <div class="history-label">${esc(entry.label || '')}${entry.entityId ? ` <span class="history-id">(${esc(entry.entityId)})</span>` : ''}</div>
      <div class="history-details">${esc(entry.details || 'Brak szczegółów.')}</div>
      ${(entry.beforeState || entry.afterState) ? `<div class="history-before-after"><div><strong>Przed zmianą:</strong><br>${esc(entry.beforeState || '—')}</div><div><strong>Po zmianie:</strong><br>${esc(entry.afterState || '—')}</div></div>` : ''}
    </article>
  `).join('') || '<div class="empty-state">Brak zapisanej historii zmian.</div>';
  if($('historyCountBadge')) $('historyCountBadge').textContent = `Wpisy: ${rows.length}`;
}
function updateCurrentContextInfo(){
  if($('currentPublicIpValue')) $('currentPublicIpValue').value = localStorage.getItem(STORAGE_KEYS.publicIp) || 'nieustalono';
  if($('currentAdminOperatorValue')) $('currentAdminOperatorValue').value = getOperatorName('Administrator');
  if($('currentMasterOperatorValue')) $('currentMasterOperatorValue').value = getOperatorName('Master');
}
async function logChange({ actorRole='Administrator', action='Zmiana', entityType='system', entityId='', label='', details='', beforeState='', afterState='' } = {}){
  const publicIp = await fetchPublicIp();
  changeHistory.unshift({
    id: `log_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,
    ts: new Date().toISOString(),
    actorRole,
    actorName: getOperatorName(actorRole),
    action,
    entityType,
    entityId,
    label,
    details,
    beforeState: stringifyState(beforeState),
    afterState: stringifyState(afterState),
    publicIp: publicIp || localStorage.getItem(STORAGE_KEYS.publicIp) || 'nieustalono',
    device: navigator.userAgent || ''
  });
  changeHistory = changeHistory.slice(0, 1000);
  saveHistory();
  renderChangeHistory();
  renderAlarmHistory();
  populateEventTypeSelect();
  autoGrowTextarea($('description'));
  updateCurrentContextInfo();
  renderOfflineSummary();
  renderAppNotice();
}
function logChangeSync(payload){ logChange(payload); }
function summarizeRescuer(item){
  return `${item?.name || 'Ratownik'} • tel. ${item?.phone || 'brak'} • ${item?.zone || 'brak zakładu'} • ${item?.location || 'brak lokalizacji'} • zmiana: ${item?.shift || 'brak'} • ${item?.skills || 'brak uprawnień'} • grupa alarmowa: ${item?.alarmGroup === false ? 'nie' : 'tak'}`;
}
function summarizeAed(item){
  return `${item?.name || 'AED'} • ${item?.location || 'brak lokalizacji'} • ${item?.lat ?? '?'} / ${item?.lon ?? '?'}`;
}
function summarizeKit(item){
  const kit = normalizeKit(item || {});
  return `${kit.name} • ${kit.location || 'brak lokalizacji'} • ${kit.type || 'apteczka'} • elementów: ${(kit.items || []).length}`;
}
function summarizeAlgorithm(item){
  const algo = normalizeAlgorithm(item || {});
  return `${algo.icon || '🧭'} ${algo.title} • ${algo.category || 'Algorytm'} • kroków: ${(algo.steps || []).length}`;
}
function summarizeTopic(item){
  const topic = normalizeTopic(item || {});
  return `${topic.icon || '🩺'} ${topic.t || 'Temat'} • kategoria: ${topic.category} • sekcji: ${(topic.s || []).length} • obrazów: ${(topic.images || []).length}`;
}
const DEFAULT_TOPIC_CATEGORY_PRIORITY = ['Pierwsza pomoc','Kolej','Aplikacja'];
const defaultTopicColors = { lead:'#2a6dd9', steps:'#1f8f4d', warn:'#c63b3b', notes:'#0b4fa2' };
function inferDefaultTopicCategory(topic){
  const id = String(topic?.id || '').trim().toLowerCase();
  const text = String(topic?.category || topic?.t || topic?.title || '').trim().toLowerCase();
  if(id === 't11' || /kolej|tor|teren/.test(text)) return 'Kolej';
  if(/aplikacj|panel|offline/.test(text)) return 'Aplikacja';
  return 'Pierwsza pomoc';
}
function normalizeTopicCategory(value, topic){
  const txt = String(value ?? '').trim();
  return txt || inferDefaultTopicCategory(topic);
}
function normalizeTopicCategoryPriorityList(list, items=topics){
  const result = [];
  const seen = new Set();
  const add = value => {
    const label = String(value || '').trim();
    const key = label.toLowerCase();
    if(!label || seen.has(key)) return;
    seen.add(key);
    result.push(label);
  };
  const seed = Array.isArray(list) && list.length ? list : DEFAULT_TOPIC_CATEGORY_PRIORITY;
  seed.forEach(add);
  DEFAULT_TOPIC_CATEGORY_PRIORITY.forEach(add);
  (Array.isArray(items) ? items : []).forEach(topic => add(normalizeTopicCategory(topic?.category, topic)));
  return result;
}
function normalizeTopicCategoryPriorityState(items=topics){
  topicCategoryPriority = normalizeTopicCategoryPriorityList(topicCategoryPriority, items);
}
function getDefaultTopicCategorySelection(items=topics){
  const priority = normalizeTopicCategoryPriorityList(topicCategoryPriority, items);
  return priority[0] || DEFAULT_TOPIC_CATEGORY_PRIORITY[0] || 'Pierwsza pomoc';
}
function getTopicCategoryPriority(category, items=topics){
  const normalized = normalizeTopicCategory(category).toLowerCase();
  const priority = normalizeTopicCategoryPriorityList(topicCategoryPriority, items);
  const idx = priority.findIndex(item => item.toLowerCase() === normalized);
  return idx === -1 ? priority.length : idx;
}
function groupTopicsByCategory(items){
  const map = new Map();
  (Array.isArray(items) ? items : []).forEach((topic, idx) => {
    const normalized = normalizeTopic(topic, idx);
    const category = normalized.category;
    if(!map.has(category)) map.set(category, []);
    map.get(category).push(normalized);
  });
  return [...map.entries()]
    .sort((a, b) => {
      const order = getTopicCategoryPriority(a[0], items) - getTopicCategoryPriority(b[0], items);
      if(order) return order;
      const aFirst = Number(a[1]?.[0]?.n) || 9999;
      const bFirst = Number(b[1]?.[0]?.n) || 9999;
      if(aFirst !== bFirst) return aFirst - bFirst;
      return String(a[0] || '').localeCompare(String(b[0] || ''), 'pl');
    })
    .map(([category, topics]) => ({ category, topics }));
}
function buildTopicCategoryIndexMap(items){
  const map = new Map();
  groupTopicsByCategory(items).forEach(group => {
    group.topics.forEach((topic, idx) => {
      map.set(topic.id, idx + 1);
    });
  });
  return map;
}
function hexToRgb(hex){
  const clean = String(hex || '').replace('#','').trim();
  if(!/^[0-9a-fA-F]{6}$/.test(clean)) return {r:42,g:109,b:217};
  return { r: parseInt(clean.slice(0,2),16), g: parseInt(clean.slice(2,4),16), b: parseInt(clean.slice(4,6),16) };
}
function panelStyle(color, alpha=0.12){
  const {r,g,b} = hexToRgb(color);
  return `style="background:rgba(${r},${g},${b},${alpha});border-color:rgba(${r},${g},${b},0.45);border-left:5px solid ${color};"`;
}
function applyDefaultZoneSelection(){
  const defaultZone = localStorage.getItem(STORAGE_KEYS.defaultZone) || '';
  const filter = $('rescuerZakladFilter');
  const def = $('defaultZakladSelect');
  if (def) def.value = defaultZone;
  if (filter) filter.value = defaultZone && [...filter.options].some(o => o.value === defaultZone) ? defaultZone : '';
  document.querySelectorAll('.rescuer-check').forEach(ch => {
    const resc = rescuers.find(r => r.id === ch.value);
    ch.checked = !!defaultZone && resc?.zone === defaultZone;
  });
}
function ensureAdminAccess(){
  const unlocked = sessionStorage.getItem(STORAGE_KEYS.adminUnlocked) === '1';
  if (unlocked){
    captureOperatorName('Administrator');
    updateCurrentContextInfo();
    return true;
  }
  const pwd = prompt('Podaj hasło administratora');
  if (pwd === getAdminPassword()){ 
    sessionStorage.setItem(STORAGE_KEYS.adminUnlocked, '1');
    captureOperatorName('Administrator');
    updateCurrentContextInfo();
    logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action:'Logowanie', entityType:'system', label:'Panel administratora', afterState:'sesja aktywna', details:'Odblokowano panel administratora.' }));
    return true;
  }
  alert('Nieprawidłowe hasło.');
  return false;
}
function ensureMasterAccess(){
  const unlocked = sessionStorage.getItem(STORAGE_KEYS.masterUnlocked) === '1';
  if (unlocked){
    captureOperatorName('Master');
    updateCurrentContextInfo();
    return true;
  }
  const pwd = prompt('Ukryty panel master – podaj hasło');
  if (pwd === getMasterPassword()){
    sessionStorage.setItem(STORAGE_KEYS.masterUnlocked, '1');
    captureOperatorName('Master');
    updateCurrentContextInfo();
    logChangeSync(makeHistoryPayload({ actorRole:'Master', action:'Logowanie', entityType:'system', label:'Ukryty panel master', afterState:'sesja aktywna', details:'Odblokowano panel master.' }));
    return true;
  }
  alert('Nieprawidłowe hasło master.');
  return false;
}
function openMasterPanel(){
  if(!ensureMasterAccess()) return;
  if($('masterAdminPasswordValue')) $('masterAdminPasswordValue').value = getAdminPassword();
  if($('masterPinMaskedValue')) $('masterPinMaskedValue').value = `ukryte (${String(getMasterPin()).length} cyfr)`;
  if($('masterPasswordCurrent')) $('masterPasswordCurrent').value = '';
  if($('masterPasswordNew')) $('masterPasswordNew').value = '';
  if($('masterPinCurrent')) $('masterPinCurrent').value = '';
  if($('masterPinNew')) $('masterPinNew').value = '';
  if($('masterAdminPasswordNew')) $('masterAdminPasswordNew').value = '';
  updateCurrentContextInfo();
  renderChangeHistory();
  if($('masterModal')) $('masterModal').hidden = false;
  fillMasterAppSettings();
}
function closeMasterPanel(){ if($('masterModal')) $('masterModal').hidden = true; }
function isAutoTopicPlaceholderText(value=''){
  const normalized = String(value || '').trim().toLowerCase();
  return [
    'uzupełnij kroki postępowania.',
    'uzupełnij treść tematu.',
    'uzupełnij informację ostrzegawczą.'
  ].includes(normalized);
}
function isAutoTopicPlaceholderSection(section){
  const type = String(section?.[0] || '').trim().toLowerCase();
  const title = String(section?.[1] || '').trim().toLowerCase();
  const items = Array.isArray(section?.[2]) ? section[2].map(item => String(item || '').trim()).filter(Boolean) : [];
  if(items.length !== 1 || !isAutoTopicPlaceholderText(items[0])) return false;
  if(type === 'ok') return !title || title === 'postępowanie';
  if(type === 'warn') return !title || title === 'ważne';
  return false;
}
function normalizeSection(sec, fallbackType='ok'){
  if(sec == null) return null;
  if (Array.isArray(sec)) {
    const type = sec[0] || fallbackType;
    const title = sec[1] || 'Postępowanie';
    const raw = sec[2];
    const items = Array.isArray(raw) ? raw.map(x => String(x ?? '').trim()).filter(Boolean) : (String(raw ?? '').trim() ? [String(raw).trim()] : []);
    return items.length ? [type, title, items] : null;
  }
  if (sec && typeof sec === 'object') {
    const type = sec.type || sec.kind || fallbackType;
    const title = sec.title || sec.header || 'Postępowanie';
    const raw = sec.content ?? sec.items ?? sec.text;
    const items = Array.isArray(raw) ? raw.map(x => String(x ?? '').trim()).filter(Boolean) : (String(raw ?? '').trim() ? [String(raw).trim()] : []);
    return items.length ? [type, title, items] : null;
  }
  const text = String(sec ?? '').trim();
  return text ? [fallbackType, fallbackType === 'warn' ? 'Ważne' : 'Postępowanie', [text]] : null;
}
function normalizeTopic(topic, idx=0){
  const sectionsRaw = Array.isArray(topic?.s) ? topic.s : (Array.isArray(topic?.sections) ? topic.sections : []);
  const sections = sectionsRaw
    .map((sec, i) => normalizeSection(sec, i === 0 ? 'ok' : 'warn'))
    .filter(sec => Array.isArray(sec?.[2]) && sec[2].length)
    .filter(sec => !isAutoTopicPlaceholderSection(sec));
  const imageCandidates = Array.isArray(topic?.images) ? topic.images : [topic?.img || topic?.image].filter(Boolean);
  const images = imageCandidates.map(x => String(x||'').trim()).filter(Boolean).slice(0,4);
  return {
    id: topic?.id || `t${Date.now()}_${idx}`,
    n: Number(topic?.n) || idx + 1,
    category: normalizeTopicCategory(topic?.category ?? topic?.group ?? topic?.sectionCategory, topic),
    icon: topic?.icon || '🩺',
    t: topic?.t || topic?.title || 'Nowy temat',
    img: images[0] || 'assets/topics/sec01.jpg',
    images,
    lead: String(topic?.lead ?? topic?.intro ?? topic?.desc ?? '').trim(),
    leadTitle: String(topic?.leadTitle ?? topic?.leadHeader ?? topic?.lead_heading ?? 'Wstęp').trim() || 'Wstęp',
    leadColor: topic?.leadColor || '#2a6dd9',
    stepsColor: topic?.stepsColor || '#1f8f4d',
    warnColor: topic?.warnColor || '#c63b3b',
    notesColor: topic?.notesColor || '#0b4fa2',
    relatedAlgorithmIds: Array.isArray(topic?.relatedAlgorithmIds) ? topic.relatedAlgorithmIds.filter(Boolean) : [],
    s: sections
  };
}
function normalizeAlgorithm(algo, idx=0){
  const stepsRaw = Array.isArray(algo?.steps) ? algo.steps : Array.isArray(algo?.items) ? algo.items : [];
  const steps = stepsRaw.map(x => String(x ?? '').trim()).filter(Boolean);
  return {
    id: algo?.id || `alg${Date.now()}_${idx}`,
    icon: algo?.icon || '🧭',
    title: algo?.title || `Algorytm ${idx + 1}`,
    category: algo?.category || 'Algorytm',
    accent: algo?.accent || 'primary',
    steps: steps.length ? steps : ['Uzupełnij kroki algorytmu.']
  };
}
function topicSummarySections(topic){
  return normalizeTopic(topic).s;
}
function renderSectionContent(items){
  return richLinesToHtml(items);
}
function exportBlob(filename, content, mime){
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1200);
}
function exportExpiredKitExcel(){
  const rows = expiredKitRows();
  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body><table border="1"><tr><th>Lp.</th><th>Apteczka</th><th>Lokalizacja</th><th>Element</th><th>Rozmiar</th><th>Ilość</th><th>Termin ważności</th></tr>${rows.map((r,i)=>`<tr><td>${i+1}</td><td>${esc(r.kit)}</td><td>${esc(r.location)}</td><td>${esc(r.item)}</td><td>${esc(r.size || '')}</td><td>${esc(r.qty || '')}</td><td>${esc(r.expiry)}</td></tr>`).join('')}</table></body></html>`;
  exportBlob('raport_przeterminowanych_apteczek.xls', html, 'application/vnd.ms-excel');
}
function algorithmExportHtml(){
  const blocks = algorithms.map(algo => `
    <section style="margin:0 0 24px;padding:16px;border:1px solid #d9e5f2;border-radius:16px;">
      <h2 style="margin:0 0 8px;font-family:Arial,sans-serif;">${esc(algo.icon)} ${esc(algo.title)}</h2>
      <div style="margin:0 0 10px;color:#456;">${esc(algo.category || 'Algorytm')}</div>
      <ol style="margin:0;padding-left:22px;line-height:1.6;">${(algo.steps || []).map(step => `<li>${esc(step)}</li>`).join('')}</ol>
    </section>`).join('');
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>Algorytmy ratunkowe PKP PLK</title></head><body style="font-family:Arial,sans-serif;padding:24px;max-width:900px;margin:auto;"><h1>PKP PLK Ratownik – Algorytmy ratunkowe</h1>${blocks}</body></html>`;
}
function openPrintWindow(html){
  const w = window.open('', '_blank');
  if(!w){
    alert('Przeglądarka zablokowała okno wydruku. Zezwól na wyskakujące okna i spróbuj ponownie.');
    return;
  }
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 400);
}
function printAlgorithms(){
  openPrintWindow(algorithmExportHtml());
}
function sanitizeState(){
  rescuers = (rescuers || []).map((r, idx) => normalizeRescuer(r, idx));
  kits = (kits || []).map((k, idx) => normalizeKit(k, idx));
  topics = (topics || []).map((t, idx) => normalizeTopic(t, idx));
  algorithms = (algorithms || []).map((a, idx) => normalizeAlgorithm(a, idx));
  if (!algorithms.find(a => a.id === currentAlgorithmId)) currentAlgorithmId = algorithms[0]?.id || null;
  sanitizeAlarmHistory();
}
function renumberTopics(){ topics = topics.map((t, idx) => ({ ...t, n: idx + 1 })); }
function saveLocal(){
  sanitizeState();
normalizeOfflineAlgorithmIds();
normalizeAppInfo();
  normalizeTopicCategoryPriorityState();
  renumberTopics();
  localStorage.setItem(STORAGE_KEYS.rescuers, JSON.stringify(rescuers));
  localStorage.setItem(STORAGE_KEYS.aeds, JSON.stringify(aeds));
  localStorage.setItem(STORAGE_KEYS.kits, JSON.stringify(kits));
  localStorage.setItem(STORAGE_KEYS.topics, JSON.stringify(topics));
  localStorage.setItem(STORAGE_KEYS.algorithms, JSON.stringify(algorithms));
  localStorage.setItem(STORAGE_KEYS.offlineAlgorithmIds, JSON.stringify(offlineAlgorithmIds));
  localStorage.setItem(STORAGE_KEYS.appInfo, JSON.stringify(appInfo));
  localStorage.setItem(STORAGE_KEYS.appNotice, JSON.stringify(appNotice));
  localStorage.setItem(STORAGE_KEYS.eventTypes, JSON.stringify(eventTypes));
  localStorage.setItem(STORAGE_KEYS.topicCategoryPriority, JSON.stringify(topicCategoryPriority));
  if(!isApplyingRemoteState) scheduleOnlineSync();
}
function uniqueValues(arr){ return [...new Set(arr.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pl')); }
function populateSelect(selectId, values, placeholder){
  const el = $(selectId); if(!el) return;
  const current = el.value;
  el.innerHTML = `<option value="">${placeholder}</option>` + values.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join('');
  if ([...el.options].some(o => o.value === current)) el.value = current;
}
function selectedRescuers(){ return [...document.querySelectorAll('.rescuer-check:checked')].map(x => x.value); }
function canUseNotifications(){
  return ('Notification' in window) && window.isSecureContext;
}
function getNotificationPermissionState(){
  if(!('Notification' in window)) return 'unsupported';
  const runtime = String(Notification.permission || 'default');
  const stored = localStorage.getItem('ratownik_notification_enabled') === '1';
  if(runtime === 'granted' || stored) return 'granted';
  if(runtime === 'denied') return 'denied';
  return 'default';
}
function refreshNotificationButtons(){
  const state = getNotificationPermissionState();
  const enableBtn = $('enableNotificationsBtn');
  const testBtn = $('testNotificationBtn');
  if(enableBtn){
    enableBtn.textContent = state === 'granted' ? 'Powiadomienia włączone' : 'Włącz powiadomienia';
  }
  if(testBtn){
    testBtn.disabled = state !== 'granted';
    testBtn.title = state === 'granted' ? '' : 'Najpierw włącz powiadomienia';
  }
}
async function ensureNotificationPermission(forceAsk=false){
  if(!('Notification' in window)) return 'unsupported';
  if(!window.isSecureContext) return 'insecure';
  let state = String(Notification.permission || 'default');
  const stored = localStorage.getItem('ratownik_notification_enabled') === '1';
  if(state === 'granted' || stored){
    localStorage.setItem('ratownik_notification_enabled', '1');
    refreshNotificationButtons();
    return 'granted';
  }
  if(state === 'denied'){
    refreshNotificationButtons();
    return 'denied';
  }
  if(forceAsk){
    try{
      state = await Notification.requestPermission();
      if(state === 'granted'){
        localStorage.setItem('ratownik_notification_enabled', '1');
      }
    }catch(_){}
  }
  refreshNotificationButtons();
  return getNotificationPermissionState();
}
async function ensureNotificationRegistration(){
  if(!('serviceWorker' in navigator)) return null;
  try{
    let reg = await navigator.serviceWorker.getRegistration('./');
    if(!reg){
      reg = await navigator.serviceWorker.register('./sw.js');
    }
    await navigator.serviceWorker.ready;
    return reg || await navigator.serviceWorker.getRegistration('./') || await navigator.serviceWorker.ready;
  }catch(_){
    return null;
  }
}
async function notifyLocal(title, body, options={}){
  if(!options.skipInApp){
    pushInAppNotification({
      title,
      body,
      source: options.source || 'Powiadomienie lokalne',
      level: options.level || 'info',
      createdAt: options.createdAt || new Date().toISOString()
    });
  }
  if(!canUseNotifications()) return { ok:false, reason:'insecure_or_unsupported' };
  const state = await ensureNotificationPermission(false);
  if(state !== 'granted') return { ok:false, reason:state };
  let lastError = '';
  try{
    const reg = await ensureNotificationRegistration();
    if(reg && typeof reg.showNotification === 'function'){
      await reg.showNotification(title, {
        body,
        icon:'./assets/icon.png',
        badge:'./assets/icon.png',
        tag:'ratownik-plk-notice',
        renotify:true,
        data:{ ts: Date.now(), source:'Ratownik PLK' }
      });
      return { ok:true, via:'service-worker' };
    }
  }catch(err){
    lastError = err?.message || String(err || '');
  }
  try{
    new Notification(title, { body, icon:'./assets/icon.png', tag:'ratownik-plk-notice' });
    return { ok:true, via:'page' };
  }catch(err){
    return { ok:false, reason: err?.message || lastError || 'notification_failed' };
  }
}
function getAppNoticeFingerprint(){
  return [String(appNotice?.title || '').trim(), String(appNotice?.text || '').trim(), String(appNotice?.updatedAt || '').trim()].join('|');
}
async function maybeNotifyAppNotice(){
  normalizeAppInfo();
  const title = String(appNotice?.title || '').trim();
  const text = String(appNotice?.text || '').trim();
  if(!title && !text) return;
  const fingerprint = getAppNoticeFingerprint();
  const seen = localStorage.getItem(STORAGE_KEYS.appNoticeSeen) || '';
  if(fingerprint && fingerprint == seen) return;
  if(!appNotice?.notify){
    if(fingerprint) localStorage.setItem(STORAGE_KEYS.appNoticeSeen, fingerprint);
    return;
  }
  pushInAppNotification({
    title: title || 'Ratownik PLK',
    body: text || 'Dodano nowy komunikat dla użytkowników.',
    source: 'Komunikat dla użytkowników',
    level: 'notice',
    createdAt: appNotice?.updatedAt || new Date().toISOString()
  });
  if(fingerprint) localStorage.setItem(STORAGE_KEYS.appNoticeSeen, fingerprint);
  if(canUseNotifications() && Notification.permission === 'granted'){
    await notifyLocal(title || 'Ratownik PLK', text || 'Dodano nowy komunikat dla użytkowników.', {
      skipInApp: true,
      source: 'Komunikat dla użytkowników',
      level: 'notice',
      createdAt: appNotice?.updatedAt || new Date().toISOString()
    });
  }
}
function setTheme(mode){
  const dark = mode === 'dark';
  document.body.classList.toggle('night-mode', dark);
  localStorage.setItem(STORAGE_KEYS.theme, dark ? 'dark' : 'light');
  const btn = $('nightModeBtn');
  if (btn){
    btn.textContent = dark ? '☀️' : '🌙';
    btn.title = dark ? 'Tryb dzienny' : 'Tryb nocny';
    btn.setAttribute('aria-label', dark ? 'Tryb dzienny' : 'Tryb nocny');
  }
}
function locationText(){
  return [
    $('manualLocation').value.trim(),
    $('gpsLocation').value.trim() ? `GPS: ${$('gpsLocation').value.trim()}` : '',
    $('landmark').value.trim() ? `Punkt orientacyjny: ${$('landmark').value.trim()}` : '',
    $('accessRoute').value.trim() ? `Dojazd: ${$('accessRoute').value.trim()}` : ''
  ].filter(Boolean).join(' | ') || 'Lokalizacja nieuzupełniona';
}

function populateEventTypeSelect(){
  const sel = $('eventType');
  if(!sel) return;
  const current = sel.value;
  sel.innerHTML = (eventTypes || []).map(v => `<option>${esc(v)}</option>`).join('');
  if(current && eventTypes.includes(current)) sel.value = current;
  else if(eventTypes.length) sel.value = eventTypes[0];
}
function renderAdminEventTypes(){
  const box = $('adminEventTypeTable');
  if(!box) return;
  box.innerHTML = (eventTypes || []).map((name, idx) => `
    <div class="admin-list-item">
      <div><strong>${idx + 1}. ${esc(name)}</strong></div>
      <div class="row wrap-mobile">
        <button class="ghost" data-edit-event-type="${idx}">Edytuj</button>
        <button class="ghost danger-lite" data-delete-event-type="${idx}">Usuń</button>
      </div>
    </div>
  `).join('') || '<div class="empty-state">Brak typów zdarzeń.</div>';
}
function autoGrowTextarea(el){
  if(!el) return;
  const minHeight = Number(el.dataset.autogrowMin || 46);
  const maxHeight = Number(el.dataset.autogrowMax || 360);
  el.style.height = 'auto';
  const nextHeight = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);
  el.style.height = nextHeight + 'px';
  el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
}
function reportFor(target){
  return `Adresat: ${target}\nTyp zdarzenia: ${$('eventType').value}\nLiczba poszkodowanych: ${$('casualties').value}\nLokalizacja: ${locationText()}\nOpis: ${$('description').value.trim() || 'Brak dodatkowego opisu.'}`;
}
function normalizeTopicSectionsFromForm(){
  const intro = $('topicIntro').value.trim();
  const lines = $('topicSteps').value.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  const warnTitle = $('topicWarnTitle')?.value.trim();
  const warnLines = ($('topicWarnSteps')?.value || '').split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  const notesLines = ($('topicNotes')?.value || '').split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  const sections = [];
  if (lines.length) sections.push(['ok', intro || 'Postępowanie', lines]);
  if (warnLines.length) sections.push(['warn', warnTitle || 'Ważne', warnLines]);
  if (notesLines.length) sections.push(['notes', 'Dodatkowe notatki', notesLines]);
  return sections;
}
function fillTopicForm(topic){
  const normalized = topic ? normalizeTopic(topic) : null;
  currentTopicEditId = normalized?.id || null;
  $('topicFormTitle').textContent = normalized ? 'Edytuj temat' : 'Dodaj temat';
  $('topicTitle').value = normalized?.t || '';
  if ($('topicCategory')) $('topicCategory').value = normalized?.category || getDefaultTopicCategorySelection();
  $('topicIcon').value = normalized?.icon || '🩺';
  $('topicImage').value = Array.isArray(normalized?.images) && normalized.images.length ? normalized.images.join('\n') : (normalized?.img || '');
  if ($('topicLeadTitle')) $('topicLeadTitle').value = normalized?.leadTitle || 'Wstęp';
  if ($('topicLead')) $('topicLead').value = normalized?.lead || '';
  if ($('topicLeadColor')) $('topicLeadColor').value = normalized?.leadColor || defaultTopicColors.lead;
  if ($('topicStepsColor')) $('topicStepsColor').value = normalized?.stepsColor || defaultTopicColors.steps;
  if ($('topicWarnColor')) $('topicWarnColor').value = normalized?.warnColor || defaultTopicColors.warn;
  if ($('topicNotesColor')) $('topicNotesColor').value = normalized?.notesColor || defaultTopicColors.notes;
  const main = normalized?.s?.find(sec => sec[0] !== 'warn' && sec[0] !== 'notes') || normalized?.s?.[0];
  const warn = normalized?.s?.find(sec => sec[0] === 'warn');
  $('topicIntro').value = main?.[1] || '';
  $('topicSteps').value = Array.isArray(main?.[2]) ? main[2].join('\n') : (main?.[2] || '');
  if ($('topicWarnTitle')) $('topicWarnTitle').value = warn?.[1] || '';
  if ($('topicWarnSteps')) $('topicWarnSteps').value = Array.isArray(warn?.[2]) ? warn[2].join('\n') : (warn?.[2] || '');
  const notes = normalized?.s?.find(sec => sec[0] === 'notes');
  if ($('topicNotes')) $('topicNotes').value = Array.isArray(notes?.[2]) ? notes[2].join('\n') : (notes?.[2] || '');
  renderTopicAlgorithmPicker(normalized?.relatedAlgorithmIds || []);
  $('saveTopicBtn').textContent = normalized ? 'Zapisz zmiany tematu' : 'Dodaj temat';
  $('cancelTopicEditBtn').hidden = !normalized;
}
function fillAlgorithmForm(algo){
  const normalized = algo ? normalizeAlgorithm(algo) : null;
  algorithmEditId = normalized?.id || null;
  $('algorithmFormTitle').textContent = normalized ? 'Edytuj algorytm' : 'Dodaj algorytm';
  $('algorithmTitle').value = normalized?.title || '';
  $('algorithmIcon').value = normalized?.icon || '🧭';
  $('algorithmCategory').value = normalized?.category || 'Algorytm';
  $('algorithmAccent').value = normalized?.accent || 'primary';
  $('algorithmSteps').value = Array.isArray(normalized?.steps) ? normalized.steps.join('\n') : '';
  $('saveAlgorithmBtn').textContent = normalized ? 'Zapisz zmiany algorytmu' : 'Dodaj algorytm';
  $('cancelAlgorithmEditBtn').hidden = !normalized;
}
function renderTopicCard(topic, displayNumber=null){
  const t = normalizeTopic(topic);
  const sectionHtml = (t.s || []).map(sec => {
    const color = sec[0] === 'warn'
      ? (t.warnColor || defaultTopicColors.warn)
      : sec[0] === 'notes'
        ? (t.notesColor || defaultTopicColors.notes)
        : (t.stepsColor || defaultTopicColors.steps);
    return `<section class="block ${esc(sec[0] || 'ok')}" ${panelStyle(color, sec[0] === 'warn' ? 0.14 : 0.11)}><h4 class="rich-text">${sanitizeRichText(sec[1] || 'Postępowanie')}</h4>${renderSectionContent(sec[2])}</section>`;
  }).join('');
  const relatedHtml = Array.isArray(t.relatedAlgorithmIds) && t.relatedAlgorithmIds.length
    ? `<div class="related-algos">${t.relatedAlgorithmIds.map(id => { const algo = getAlgorithmById(id); return algo ? `<button class="ghost" data-open-related-algo="${esc(id)}">${esc(algo.icon || '🧭')} ${esc(algo.title)}</button>` : ''; }).join('')}</div>`
    : '';
  return `
    <details class="topic">
      <summary>
        <span class="topic-title"><span class="topic-icon">${esc(t.icon || '🩺')}</span><span>${esc(displayNumber ?? t.n)}. ${esc(t.t)}</span></span>
        <span class="topic-toggle">+</span>
      </summary>
      <div class="topic-body topic-body-wide">
        <div class="topic-main" style="grid-column:1 / -1;">
          ${t.lead ? `<section class="topic-lead-card" ${panelStyle(t.leadColor || defaultTopicColors.lead, 0.12)}><h4>${sanitizeRichText(t.leadTitle || 'Wstęp')}</h4><div class="rich-text">${sanitizeRichText(t.lead)}</div></section>` : `<section class="topic-lead-card empty" ${panelStyle(t.leadColor || defaultTopicColors.lead, 0.08)}><h4>${sanitizeRichText(t.leadTitle || 'Wstęp')}</h4><p>Brak opisu wstępnego dla tego tematu.</p></section>`}
        </div>
        ${(t.images || [t.img]).length ? `<div class="topic-gallery cols-${Math.min(Math.max((t.images || [t.img]).length,1),4)}">${(t.images || [t.img]).slice(0,4).map(src => `<img src="${esc(src || 'assets/topics/sec01.jpg')}" alt="${esc(t.t)}">`).join('')}</div>` : ''}
        ${sectionHtml || relatedHtml ? `<div class="blocks topic-wide-blocks">${sectionHtml}${relatedHtml}</div>` : ''}
      </div>
    </details>
  `;
}
function renderTopics(query=''){
  const q = query.trim().toLowerCase();
  renumberTopics();
  const normalizedTopics = topics.map((t, idx) => normalizeTopic(t, idx));
  const topicCategoryIndexMap = buildTopicCategoryIndexMap(normalizedTopics);
  const filtered = normalizedTopics.filter(t => !q || [t.category, t.t, t.icon, t.leadTitle, t.lead, ...(t.s||[]).flatMap(sec => [sec[1], ...(Array.isArray(sec[2]) ? sec[2] : [sec[2]])])].join(' ').toLowerCase().includes(q));
  const grouped = groupTopicsByCategory(filtered);
  $('topics').innerHTML = grouped.map(group => `
    <details class="topic-category" ${q ? 'open' : ''}>
      <summary>
        <span class="topic-category-title">
          <span class="topic-category-badge">${esc(group.category)}</span>
          <small>${group.topics.length} ${group.topics.length === 1 ? 'temat' : 'tematów'}</small>
        </span>
        <span class="topic-toggle">+</span>
      </summary>
      <div class="topic-category-body">
        ${group.topics.map(topic => renderTopicCard(topic, topicCategoryIndexMap.get(topic.id) || topic.n)).join('')}
      </div>
    </details>
  `).join('') || '<div class="empty-state">Brak tematów pasujących do wyszukiwania.</div>';
  const updateTopicToggle = (d) => {
    const toggle = d.querySelector('summary .topic-toggle');
    if (toggle) toggle.textContent = d.open ? '–' : '+';
  };
  document.querySelectorAll('.topic, .topic-category').forEach(d => {
    updateTopicToggle(d);
    d.addEventListener('toggle', () => updateTopicToggle(d));
  });
}
function getAlgorithmById(id){
  return algorithms.map((a, idx) => normalizeAlgorithm(a, idx)).find(a => a.id === id) || algorithms.map((a, idx) => normalizeAlgorithm(a, idx))[0] || null;
}
function renderAlgorithms(query=''){
  const q = query.trim().toLowerCase();
  const filtered = algorithms.map((a, idx) => normalizeAlgorithm(a, idx)).filter(a => !q || [a.title, a.category, a.icon, ...(a.steps || [])].join(' ').toLowerCase().includes(q));
  $('algorithmList').innerHTML = filtered.map(a => `
    <button class="algo-card ${a.id === currentAlgorithmId ? 'active' : ''}" data-select-algo="${esc(a.id)}">
      <span class="algo-card-icon">${esc(a.icon || '🧭')}</span>
      <span class="algo-card-body">
        <strong>${esc(a.title)}</strong>
        <small>${esc(a.category || 'Algorytm')} • ${a.steps.length} kroków</small>
      </span>
      <span class="algo-card-action">Uruchom</span>
    </button>
  `).join('') || '<div class="empty-state">Brak algorytmów pasujących do wyszukiwania.</div>';
}
function renderAlgorithmStepper(){
  const algo = normalizeAlgorithm(getAlgorithmById(currentAlgorithmId) || {}, 0);
  if(!algo){
    $('algorithmStepper').className = 'algorithm-stepper empty-state';
    $('algorithmStepper').innerHTML = 'Brak algorytmów.';
    $('algoCountBadge').textContent = 'Algorytm 0 z 0';
    $('algoProgressBadge').textContent = 'Brak algorytmu';
    return;
  }
  if(currentAlgorithmStep < 0) currentAlgorithmStep = 0;
  if(currentAlgorithmStep > algo.steps.length - 1) currentAlgorithmStep = algo.steps.length - 1;
  const step = algo.steps[currentAlgorithmStep];
  $('algoCountBadge').textContent = `Algorytm ${algorithms.findIndex(a => normalizeAlgorithm(a).id === algo.id) + 1} z ${algorithms.length}`;
  $('algoProgressBadge').textContent = `Krok ${currentAlgorithmStep + 1} / ${algo.steps.length}`;
  $('algorithmStepper').className = `algorithm-stepper accent-${esc(algo.accent || 'primary')}`;
  $('algorithmStepper').innerHTML = `
    <div class="stepper-head">
      <div class="stepper-title"><span class="algo-card-icon">${esc(algo.icon || '🧭')}</span><div><strong>${esc(algo.title)}</strong><small>${esc(algo.category || 'Algorytm')}</small></div></div>
    </div>
    <div class="stepper-step-no">${currentAlgorithmStep + 1}</div>
    <div class="stepper-step-text">${esc(step)}</div>
    <div class="stepper-dots">${algo.steps.map((_, idx) => `<span class="dot ${idx === currentAlgorithmStep ? 'active' : ''}"></span>`).join('')}</div>
    <div class="stepper-all-steps">
      <h3>Pełna checklista</h3>
      <ol>${algo.steps.map((item, idx) => `<li class="${idx === currentAlgorithmStep ? 'current' : ''}">${esc(item)}</li>`).join('')}</ol>
    </div>
  `;
}
function renderRescuers(){
  const zones = uniqueValues(rescuers.map(r => r.zone));
  populateSelect('rescuerZakladFilter', zones, 'Wszystkie zakłady');
  populateSelect('defaultZakladSelect', zones, 'Domyślny zakład');
  const q = ($('rescuerSearch')?.value || '').trim().toLowerCase();
  const zaklad = $('rescuerZakladFilter')?.value || '';
  const filtered = rescuers.filter(r => (!zaklad || r.zone === zaklad) && (!q || [r.name, r.zone, r.location, r.shift, r.skills, r.phone].join(' ').toLowerCase().includes(q)));
  $('rescuerList').innerHTML = filtered.map(r => {
    const defaultForZone = getDefaultRescuerForZone(r.zone);
    const isDefault = defaultForZone?.id === r.id;
    return `
    <div class="person selectable-person ${isDefault ? 'is-default-rescuer' : ''}">
      <label class="selectable-head"><input type="checkbox" class="rescuer-check" value="${esc(r.id)}"> <strong>${esc(r.name)}</strong>${isDefault ? ' <span class="badge small">domyślny</span>' : ''}</label><br>
      <small>${esc(r.zone)} • ${esc(r.location || 'brak lokalizacji')} • zmiana: ${esc(r.shift || 'brak')} • ${esc(r.skills)} • tel. ${esc(r.phone)}${r.alarmGroup === false ? ' • poza grupą alarmową' : ''}</small>
      <div class="row admin-actions" style="margin-top:10px">
        <button class="ghost" onclick="location.href='tel:${esc(r.phone)}'">📞 Zadzwoń</button>
        <button class="ghost" onclick="location.href='sms:${esc(r.phone)}?body='+encodeURIComponent(reportFor('ratownik zakładowy – ${esc(r.name)}'))">✉️ SMS</button>
      </div>
    </div>`;
  }).join('') || '<div class="empty-state">Brak ratowników dla wybranego filtra.</div>';
  $('adminRescuerTable').innerHTML = rescuers.map(r => {
    const defaultForZone = getDefaultRescuerForZone(r.zone);
    const isDefault = defaultForZone?.id === r.id;
    return `
    <div class="admin-row">
      <div><strong>${esc(r.name)}</strong>${isDefault ? ' <span class="badge small">domyślny dla zakładu</span>' : ''}<br><small>${esc(r.phone)} • ${esc(r.zone)} • ${esc(r.location || 'brak lokalizacji')} • zmiana: ${esc(r.shift || 'brak')} • ${esc(r.skills)} • ${r.alarmGroup === false ? 'poza grupą alarmową' : 'grupa alarmowa'}</small></div>
      <div class="row admin-actions">
        <button class="ghost" data-default-rescuer="${r.id}">Domyślny</button>
        <button class="ghost" data-edit-rescuer="${r.id}">Edytuj</button>
        <button class="ghost danger-lite" data-delete-rescuer="${r.id}">Usuń</button>
      </div>
    </div>`;
  }).join('') || '<div class="empty-state">Brak ratowników.</div>';
  applyDefaultZoneSelection();
  populateSelect('alarmHistoryZoneFilter', zones, 'Wszystkie zakłady');
}

function haversineKm(lat1, lon1, lat2, lon2){
  const R = 6371, toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2-lat1), dLon = toRad(lon2-lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
function renderAeds(user=null, query=''){
  const q = query.trim().toLowerCase();
  const list = aeds
    .filter(a => !q || [a.name, a.location].join(' ').toLowerCase().includes(q))
    .map(a => ({...a, dist: user ? haversineKm(user.lat,user.lon,a.lat,a.lon) : null}))
    .sort((a,b) => (a.dist ?? 1e9) - (b.dist ?? 1e9));
  $('aedList').innerHTML = list.map(a => `
    <div class="aed">
      <strong>${esc(a.name)}</strong><br>
      <small>${esc(a.location)}${a.dist != null ? ` • ok. ${a.dist.toFixed(2)} km` : ''}</small>
      <div class="row admin-actions" style="margin-top:10px">
        <button class="ghost" onclick="window.open('https://www.google.com/maps?q=${a.lat},${a.lon}','_blank')">🧭 Nawiguj</button>
      </div>
    </div>`).join('') || '<div class="empty-state">Brak AED.</div>';
  $('adminAedTable').innerHTML = aeds.map(a => `
    <div class="admin-row">
      <div><strong>${esc(a.name)}</strong><br><small>${esc(a.location)} • ${esc(a.lat)}, ${esc(a.lon)}</small></div>
      <div class="row admin-actions">
        <button class="ghost" data-edit-aed="${a.id}">Edytuj</button>
        <button class="ghost danger-lite" data-delete-aed="${a.id}">Usuń</button>
      </div>
    </div>`).join('') || '<div class="empty-state">Brak AED.</div>';
}
function renderKits(query=''){
  kits = kits.map((k, idx) => normalizeKit(k, idx));
  populateSelect('kitTypeFilter', uniqueValues(kits.map(k => k.type || 'inne')), 'Wszystkie rodzaje');
  populateSelect('kitCategoryFilter', uniqueValues(kits.flatMap(k => k.categories || [])), 'Wszystkie kategorie');
  const q = query.trim().toLowerCase();
  const typeFilter = $('kitTypeFilter')?.value || '';
  const catFilter = $('kitCategoryFilter')?.value || '';
  const list = kits.filter(k => {
    const hay = [k.name, k.location, k.type || '', ...(k.categories || []), ...(k.items || []).flatMap(i => [i.name, i.size || '', i.qty || '', i.expiry])].join(' ').toLowerCase();
    return (!q || hay.includes(q)) && (!typeFilter || (k.type || '') === typeFilter) && (!catFilter || (k.categories || []).includes(catFilter));
  });
  $('kitList').innerHTML = list.map(k => `
    <div class="aed">
      <strong>${esc(k.name)}</strong><br>
      <small>${esc(k.location)} • ${esc(k.type || 'apteczka')}</small>
      <div class="kit-tags">${(k.categories || []).map(c => `<span class="badge small">${esc(c)}</span>`).join('')}</div>
      <ul class="contents-list">${(k.items || []).map(i => `<li>${esc(i.name)}${i.size ? ' • rozmiar: ' + esc(i.size) : ''}${i.qty ? ' • ilość: ' + esc(i.qty) : ''}</li>`).join('')}</ul>
    </div>`).join('') || '<div class="empty-state">Brak apteczek pasujących do wyszukiwania.</div>';
  $('adminKitTable').innerHTML = kits.map(k => `
    <div class="admin-row">
      <div><strong>${esc(k.name)}</strong><br><small>${esc(k.location)} • ${esc(k.type || 'apteczka')}</small><div class="kit-tags">${(k.categories || []).map(c => `<span class="badge small">${esc(c)}</span>`).join('')}</div><ul class="contents-list">${(k.items || []).map(i => `<li>${esc(i.name)}${i.size ? ' • rozmiar: <strong>' + esc(i.size) + '</strong>' : ''}${i.qty ? ' • ilość: <strong>' + esc(i.qty) + '</strong>' : ''} <span class="kit-admin-meta">(termin: <strong>${esc(formatExpiry(i.expiry))}</strong>${isExpired(i.expiry) ? ' • PRZETERMINOWANE' : ''})</span></li>`).join('')}</ul></div>
      <div class="row admin-actions">
        <button class="ghost" data-edit-kit="${k.id}">Edytuj</button>
        <button class="ghost danger-lite" data-delete-kit="${k.id}">Usuń</button>
      </div>
    </div>`).join('') || '<div class="empty-state">Brak apteczek.</div>';
  if($('expiredKitReportOutput')) $('expiredKitReportOutput').value = buildExpiredKitReport();
}
function renderTopicCategoryPriorityEditor(){
  const box = $('topicCategoryPriorityTable');
  if(!box) return;
  normalizeTopicCategoryPriorityState();
  const categories = normalizeTopicCategoryPriorityList(topicCategoryPriority, topics);
  const counts = new Map();
  topics.map((topic, idx) => normalizeTopic(topic, idx)).forEach(topic => {
    counts.set(topic.category, (counts.get(topic.category) || 0) + 1);
  });
  box.innerHTML = categories.map((category, idx) => {
    const count = counts.get(category) || 0;
    const topicLabel = count === 1 ? 'temat' : 'tematów';
    const disableUp = idx === 0;
    const disableDown = idx === categories.length - 1;
    return `
      <div class="admin-row topic-category-priority-row">
        <div class="topic-category-priority-meta">
          <strong>${idx + 1}. ${esc(category)}</strong>
          <small>${count} ${topicLabel}</small>
        </div>
        <div class="row admin-actions">
          <button class="ghost" type="button" data-move-topic-category="up" data-topic-category-name="${esc(category)}" ${disableUp ? 'disabled' : ''}>↑</button>
          <button class="ghost" type="button" data-move-topic-category="down" data-topic-category-name="${esc(category)}" ${disableDown ? 'disabled' : ''}>↓</button>
        </div>
      </div>
    `;
  }).join('') || '<div class="empty-state">Najpierw dodaj tematy, aby ustawić kolejność kategorii.</div>';
}
function renderAdminTopics(){
  const topicCategoryIndexMap = buildTopicCategoryIndexMap(topics);
  $('adminTopicTable').innerHTML = topics.map((topic, idx) => {
    const t = normalizeTopic(topic, idx);
    const main = t.s.find(sec => sec[0] !== 'warn') || t.s[0];
    const warn = t.s.find(sec => sec[0] === 'warn');
    const displayNumber = topicCategoryIndexMap.get(t.id) || t.n;
    const summaryText = main
      ? `${esc(String(main?.[1] || 'Postępowanie').replace(/\[[^\]]+\]/g,''))} • ${Array.isArray(main?.[2]) ? main[2].length : 1} kroków`
      : 'opis ogólny • bez sekcji kroków';
    return `
    <div class="admin-row topic-admin-row">
      <div>
        <strong>${esc(displayNumber)}. ${esc(t.icon || '🩺')} ${esc(t.t)}</strong>
        <small>${esc(t.category || 'Pierwsza pomoc')} • ${summaryText}${warn ? ' • pole ostrzegawcze' : ''}${t.relatedAlgorithmIds?.length ? ' • powiązane algorytmy: ' + t.relatedAlgorithmIds.length : ''}</small>
      </div>
      <div class="row admin-actions">
        <button class="ghost" data-move-topic="up:${t.id}" ${idx === 0 ? 'disabled' : ''}>↑</button>
        <button class="ghost" data-move-topic="down:${t.id}" ${idx === topics.length - 1 ? 'disabled' : ''}>↓</button>
        <button class="ghost" data-edit-topic="${t.id}">Edytuj</button>
        <button class="ghost danger-lite" data-delete-topic="${t.id}">Usuń</button>
      </div>
    </div>`;
  }).join('') || '<div class="empty-state">Brak tematów.</div>';
}
function renderOfflineAlgorithmPriorityEditor(){
  const box = $('offlineAlgorithmPriorityTable');
  if(!box) return;
  normalizeOfflineAlgorithmIds();
  const list = offlineAlgorithmIds
    .map(id => algorithms.find((algo, idx) => normalizeAlgorithm(algo, idx).id === id))
    .filter(Boolean)
    .map((algo, idx) => normalizeAlgorithm(algo, idx));
  box.innerHTML = list.map((algo, idx) => `
    <div class="admin-row topic-category-priority-row">
      <div class="topic-category-priority-meta">
        <strong>${idx + 1}. ${esc(algo.icon)} ${esc(algo.title)}</strong>
        <small>${esc(algo.category)} • ${algo.steps.length} kroków</small>
      </div>
      <div class="row admin-actions">
        <button class="ghost" type="button" data-move-offline-algo="up" data-offline-algo-id="${esc(algo.id)}" ${idx === 0 ? 'disabled' : ''}>↑</button>
        <button class="ghost" type="button" data-move-offline-algo="down" data-offline-algo-id="${esc(algo.id)}" ${idx === list.length - 1 ? 'disabled' : ''}>↓</button>
      </div>
    </div>
  `).join('') || '<div class="empty-state">Zaznacz algorytmy na liście poniżej, aby ustawić ich kolejność offline.</div>';
}
function renderAdminAlgorithms(){
  $('adminAlgorithmTable').innerHTML = algorithms.map((algo, idx) => {
    const a = normalizeAlgorithm(algo, idx);
    return `
    <div class="admin-row topic-admin-row">
      <div>
        <strong>${esc(a.icon)} ${esc(a.title)}</strong>
        <small>${esc(a.category)} • ${a.steps.length} kroków • styl: ${esc(a.accent)}</small><br><label class="inline-check"><input type="checkbox" data-toggle-offline-algo="${a.id}" ${offlineAlgorithmIds.includes(a.id) ? 'checked' : ''}> Pokaż w trybie offline</label>
      </div>
      <div class="row admin-actions">
        <button class="ghost" data-edit-algorithm="${a.id}">Edytuj</button>
        <button class="ghost danger-lite" data-delete-algorithm="${a.id}">Usuń</button>
      </div>
    </div>`;
  }).join('') || '<div class="empty-state">Brak algorytmów.</div>';
}
function renderTopicAlgorithmPicker(selectedIds=[]){
  const box = $('topicAlgorithmLinks'); if(!box) return;
  const active = new Set(selectedIds.length ? selectedIds : ([...box.querySelectorAll('input:checked')].map(i => i.value)));
  box.innerHTML = algorithms.map((algo, idx) => {
    const a = normalizeAlgorithm(algo, idx);
    return `<label class="algo-link-item"><input type="checkbox" value="${esc(a.id)}" ${active.has(a.id) ? 'checked' : ''}><div><strong>${esc(a.icon)} ${esc(a.title)}</strong><small>${esc(a.category)}</small></div></label>`;
  }).join('') || '<div class="empty-state">Najpierw dodaj algorytmy.</div>';
}
function renderAll(){
  sanitizeState();
normalizeOfflineAlgorithmIds();
normalizeAppInfo();
  normalizeTopicCategoryPriorityState();
  sanitizeNotificationInbox();
  sanitizeHistoryState();
  renderTopics($('topicSearch')?.value || '');
  renderAlgorithms($('algorithmSearch')?.value || '');
  renderAlgorithmStepper();
  renderRescuers();
  renderAeds(null, $('aedSearch')?.value || '');
  renderKits($('kitSearch')?.value || '');
  renderTopicCategoryPriorityEditor();
  renderAdminTopics();
  renderOfflineAlgorithmPriorityEditor();
  renderAdminAlgorithms();
  renderAdminEventTypes();
  renderTopicAlgorithmPicker();
  renderChangeHistory();
  renderAlarmHistory();
  populateEventTypeSelect();
  autoGrowTextarea($('description'));
  autoGrowTextarea($('reportOutput'));
  updateCurrentContextInfo();
  renderOfflineSummary();
  renderNotificationInbox();
  renderAppNotice();
}
function renderNotificationInbox(){
  sanitizeNotificationInbox();
  const box = $('notificationInbox');
  const badge = $('notificationInboxBadge');
  if(badge) badge.textContent = `W aplikacji: ${notificationInbox.length}`;
  if(!box) return;
  if(!notificationInbox.length){
    box.innerHTML = '<div class="empty-state">Nowe powiadomienia będą widoczne tutaj także w aplikacji.</div>';
    return;
  }
  box.innerHTML = notificationInbox.slice(0, 8).map(item => `
    <article class="notification-card ${esc(item.level || 'info')}">
      <div class="notification-card-head">
        <strong>${sanitizeRichText(item.title || 'Powiadomienie')}</strong>
        <span>${esc(formatNotificationTime(item.createdAt) || '')}</span>
      </div>
      ${item.body ? `<div class="rich-text notification-card-body">${sanitizeRichText(item.body)}</div>` : ''}
      <small>${esc(item.source || 'Aplikacja')}</small>
    </article>
  `).join('');
}
function renderAppNotice(){
  normalizeAppInfo();
  const box = $('appNoticeBanner');
  if(!box) return;
  const title = String(appNotice?.title || '').trim();
  const text = String(appNotice?.text || '').trim();
  if(!title && !text){ box.hidden = true; box.innerHTML = ''; return; }
  box.hidden = false;
  box.innerHTML = `${title ? `<strong>${sanitizeRichText(title)}</strong>` : ''}${text ? `<div class="rich-text">${sanitizeRichText(text)}</div>` : ''}`;
  setTimeout(() => { maybeNotifyAppNotice(); }, 50);
}
function openModalById(id){ const el = $(id); if(el){ el.hidden = false; el.setAttribute('aria-hidden','false'); } }
function closeModalById(id){ const el = $(id); if(el){ el.hidden = true; el.setAttribute('aria-hidden','true'); } }
window.openAppInfoModal = function(){ renderAppInfoModal(); openModalById('appInfoModal'); };
window.openNotificationInfoModal = function(){ renderNotificationInfoModal(); openModalById('notificationInfoModal'); };
function renderAppInfoModal(){
  normalizeAppInfo();
  if($('appInfoModalTitle')) $('appInfoModalTitle').textContent = appInfo.title || DEFAULT_APP_INFO.title;
  const body = $('appInfoModalBody');
  if(body){
    const paragraphs = String(appInfo.text || '').split(/\n{2,}/).map(x => x.trim()).filter(Boolean);
    body.innerHTML = paragraphs.length ? paragraphs.map(p => `<p>${sanitizeRichText(p)}</p>`).join('') : `<p>${sanitizeRichText(DEFAULT_APP_INFO.text)}</p>`;
  }
}
function renderNotificationInfoModal(){
  const body = $('notificationInfoBody');
  if(body) body.innerHTML = DEFAULT_NOTIFICATION_INFO_HTML;
}
function fillMasterAppSettings(){
  normalizeAppInfo();
  if($('masterAppInfoTitle')) $('masterAppInfoTitle').value = appInfo.title || DEFAULT_APP_INFO.title;
  if($('masterAppInfoText')) $('masterAppInfoText').value = appInfo.text || DEFAULT_APP_INFO.text;
  if($('masterNoticeTitle')) $('masterNoticeTitle').value = appNotice.title || '';
  if($('masterNoticeText')) $('masterNoticeText').value = appNotice.text || '';
}

function upsertEntity(arr, item){
  const idx = arr.findIndex(x => x.id === item.id);
  if(idx >= 0) arr[idx] = item; else arr.push(item);
}
function resetEntityForms(){
  ['adminRescuerName','adminRescuerPhone','adminRescuerZone','adminRescuerLocation','adminRescuerShift','adminRescuerSkills','adminRescuerAlarmGroup','adminAedName','adminAedLocation','adminAedLat','adminAedLon','adminKitName','adminKitLocation','adminKitType','adminKitCategories','adminKitContents','algorithmTitle','algorithmIcon','algorithmCategory','algorithmAccent','algorithmSteps','topicTitle','topicCategory','topicIcon','topicImage','topicLead','topicIntro','topicSteps','topicWarnTitle','topicWarnSteps','topicNotes'].forEach(id => { if($(id)) $(id).value = ''; });
  $('addRescuerBtn').textContent = 'Dodaj / zapisz ratownika';
  $('addAedBtn').textContent = 'Dodaj / zapisz AED';
  $('addKitBtn').textContent = 'Dodaj / zapisz apteczkę';
  rescuerEditId = aedEditId = kitEditId = algorithmEditId = null;
  fillTopicForm(null);
  fillAlgorithmForm(null);
  if ($('topicLeadColor')) $('topicLeadColor').value = defaultTopicColors.lead;
  if ($('topicStepsColor')) $('topicStepsColor').value = defaultTopicColors.steps;
  if ($('topicWarnColor')) $('topicWarnColor').value = defaultTopicColors.warn;
  if ($('topicNotesColor')) $('topicNotesColor').value = defaultTopicColors.notes;
  if($('adminRescuerAlarmGroup')) $('adminRescuerAlarmGroup').value = 'tak';
  renderTopicAlgorithmPicker([]);
}
// Reporting & utility buttons
$('copyLocBtn').onclick = async () => navigator.clipboard.writeText(locationText());
$('copyReportBtn').onclick = async () => navigator.clipboard.writeText($('reportOutput').value);
if ($('prep112Btn')) $('prep112Btn').onclick = () => { $('reportOutput').value = reportFor('112'); autoGrowTextarea($('description')); autoGrowTextarea($('reportOutput')); };
if ($('prep999Btn')) $('prep999Btn').onclick = () => { $('reportOutput').value = reportFor('999'); autoGrowTextarea($('description')); autoGrowTextarea($('reportOutput')); };
if ($('prepRatBtn')) $('prepRatBtn').onclick = () => { $('reportOutput').value = reportFor('ratownik zakładowy'); autoGrowTextarea($('description')); autoGrowTextarea($('reportOutput')); };
if ($('description')) $('description').addEventListener('input', () => autoGrowTextarea($('description')));
$('call112Btn').onclick = () => location.href = 'tel:112';
$('call999Btn').onclick = () => location.href = 'tel:999';
if ($('callRescuerBtn')) $(`callRescuerBtn`).onclick = () => { const dz = getDefaultZone(); const target = getDefaultRescuerForZone(dz) || rescuers[0]; if(!target?.phone) return location.href='tel:112'; logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action:'Połączenie alarmowe', entityType:'rescuer', entityId:target.id, label:target.name, beforeState:'oczekiwanie na kontakt', afterState:`połączenie tel. ${target.phone}`, details:`Połączono z domyślnym ratownikiem dla zakładu ${dz || target.zone}.` })); logAlarmSync({ actorRole:'Administrator', action:'Telefon do domyślnego ratownika', zone: dz || target.zone, targets:[{name:target.name, phone:target.phone}], defaultTarget:`${target.name} (${target.phone})`, details:`Połączono z domyślnym ratownikiem dla zakładu ${dz || target.zone}.`, report: reportFor('ratownik zakładowy') }); location.href = 'tel:' + target.phone; };
function updateOfflineExperience(){
  const offline = navigator.onLine === false;
  if($('offlineInlineCard')) $('offlineInlineCard').hidden = !offline;
  renderOfflineSummary();
updateOfflineExperience();
  if(offline){
    updateOnlineStatus('Brak internetu — uruchomiono tryb offline. Najważniejsze algorytmy są dostępne lokalnie.', 'warn');
  }
}
window.addEventListener('online', () => { updateOfflineExperience(); renderMap(); });
window.addEventListener('offline', () => { updateOfflineExperience(); });
if ($('alarmZoneBtn')) $('alarmZoneBtn').onclick = () => alarmZone();
if ($('topOfflineBtn')) $('topOfflineBtn').onclick = () => { if($('offlineModal')) $('offlineModal').hidden = false; renderOfflineSummary(); };
if ($('appInfoBtn')) $('appInfoBtn').addEventListener('click', window.openAppInfoModal);
if ($('closeAppInfoBtn')) $('closeAppInfoBtn').onclick = () => closeModalById('appInfoModal');
if ($('notificationInfoBtn')) $('notificationInfoBtn').addEventListener('click', window.openNotificationInfoModal);
if ($('closeNotificationInfoBtn')) $('closeNotificationInfoBtn').onclick = () => closeModalById('notificationInfoModal');
if ($('clearInAppNotificationsBtn')) $('clearInAppNotificationsBtn').onclick = () => clearInAppNotifications();
if ($('openOfflineBtn')) $('openOfflineBtn').onclick = () => { if($('offlineModal')) $('offlineModal').hidden = false; renderOfflineSummary(); };
if ($('openOfflineInlineBtn')) $('openOfflineInlineBtn').onclick = () => { if($('offlineModal')) $('offlineModal').hidden = false; renderOfflineSummary(); };
if ($('openOfflineBtnInline')) $('openOfflineBtnInline').onclick = () => { if($('offlineModal')) $('offlineModal').hidden = false; renderOfflineSummary(); };
if ($('closeOfflineBtn')) $('closeOfflineBtn').onclick = () => { if($('offlineModal')) $('offlineModal').hidden = true; };
$('topicSearch').addEventListener('input', e => renderTopics(e.target.value));
$('clearTopicSearchBtn').onclick = () => { $('topicSearch').value = ''; renderTopics(''); };
$('algorithmSearch').addEventListener('input', e => renderAlgorithms(e.target.value));
$('clearAlgorithmSearchBtn').onclick = () => { $('algorithmSearch').value = ''; renderAlgorithms(''); };
$('algoPrevBtn').onclick = () => { currentAlgorithmStep = Math.max(0, currentAlgorithmStep - 1); renderAlgorithmStepper(); };
$('algoNextBtn').onclick = () => { const algo = normalizeAlgorithm(getAlgorithmById(currentAlgorithmId) || {}, 0); if(algo) currentAlgorithmStep = Math.min(algo.steps.length - 1, currentAlgorithmStep + 1); renderAlgorithmStepper(); };
$('algoResetBtn').onclick = () => { currentAlgorithmStep = 0; renderAlgorithmStepper(); };
if ($('algoBackToListBtn')) $('algoBackToListBtn').onclick = () => { setAlgorithmView('list'); const listCard = $('algorithmListCard'); if(listCard) listCard.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
$('algoPrevAllBtn').onclick = () => { const idx = algorithms.findIndex(a => normalizeAlgorithm(a).id === currentAlgorithmId); if(idx > 0){ currentAlgorithmId = normalizeAlgorithm(algorithms[idx-1]).id; currentAlgorithmStep = 0; renderAlgorithms($('algorithmSearch').value || ''); renderAlgorithmStepper(); } };
$('algoNextAllBtn').onclick = () => { const idx = algorithms.findIndex(a => normalizeAlgorithm(a).id === currentAlgorithmId); if(idx < algorithms.length - 1){ currentAlgorithmId = normalizeAlgorithm(algorithms[idx+1]).id; currentAlgorithmStep = 0; renderAlgorithms($('algorithmSearch').value || ''); renderAlgorithmStepper(); } };
$('nightModeBtn').onclick = () => setTheme(document.body.classList.contains('night-mode') ? 'light' : 'dark');
// GPS + map
const hasLeaflet = typeof window !== 'undefined' && typeof window.L !== 'undefined';
let map = null;
let userMarker = null;
let markers = [];
function initMap(){
  if(!hasLeaflet || !$('map')) {
    const info = $('aedInfo');
    if(info) info.textContent = 'Mapa AED wymaga połączenia z internetem przy pierwszym uruchomieniu. Lista AED i tryb offline działają nadal.';
    if($('map')) $('map').innerHTML = '<div class="empty-state">Mapa AED jest niedostępna offline, ale lista AED i najważniejsze algorytmy działają.</div>';
    return false;
  }
  if(map) return true;
  map = L.map('map').setView([52.402, 16.949], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19, attribution:'&copy; OpenStreetMap' }).addTo(map);
  return true;
}
function renderMap(user=null){
  if(!initMap() || !map) return;
  markers.forEach(m => map.removeLayer(m)); markers = [];
  aeds.forEach(a => {
    const m = L.marker([a.lat,a.lon]).addTo(map).bindPopup(`<strong>${esc(a.name)}</strong><br>${esc(a.location)}`);
    markers.push(m);
  });
  if(user){
    if(userMarker) map.removeLayer(userMarker);
    userMarker = L.marker([user.lat,user.lon]).addTo(map).bindPopup('Twoja lokalizacja');
    map.setView([user.lat,user.lon], 15);
  }
}
renderMap();
$('gpsBtn').onclick = () => {
  if(!navigator.geolocation) return alert('Ta przeglądarka nie obsługuje geolokalizacji.');
  navigator.geolocation.getCurrentPosition(pos => {
    const user = { lat: pos.coords.latitude, lon: pos.coords.longitude };
    $('gpsLocation').value = `${user.lat.toFixed(6)}, ${user.lon.toFixed(6)}`;
    renderAeds(user, $('aedSearch').value || '');
    renderMap(user);
  }, err => alert('Nie udało się pobrać GPS: ' + err.message), { enableHighAccuracy:true, timeout:10000, maximumAge:0 });
};
$('findNearestAedBtn').onclick = () => $('gpsBtn').click();
$('openExternalAedMapBtn').onclick = () => window.open('https://openaedmap.org/', '_blank');
$('aedSearch').addEventListener('input', e => renderAeds(null, e.target.value));
$('kitSearch').addEventListener('input', e => renderKits(e.target.value));
if ($('kitTypeFilter')) $('kitTypeFilter').addEventListener('change', () => renderKits($('kitSearch').value || ''));
if ($('kitCategoryFilter')) $('kitCategoryFilter').addEventListener('change', () => renderKits($('kitSearch').value || ''));
if ($('rescuerZakladFilter')) $('rescuerZakladFilter').addEventListener('change', () => { renderRescuers(); });
if ($('defaultZakladSelect')) $('defaultZakladSelect').addEventListener('change', () => { const val = $('defaultZakladSelect').value || ''; localStorage.setItem(STORAGE_KEYS.defaultZone, val); renderRescuers(); });
if ($('saveDefaultZakladBtn')) $('saveDefaultZakladBtn').onclick = () => { const val = $('defaultZakladSelect').value || ''; localStorage.setItem(STORAGE_KEYS.defaultZone, val); renderRescuers(); const target = getDefaultRescuerForZone(val); alert(val ? `Ustawiono domyślny zakład: ${val}${target ? `\nDomyślny ratownik: ${target.name}` : ''}` : 'Wyczyszczono domyślny zakład.'); }; 
if ($('clearDefaultZakladBtn')) $('clearDefaultZakladBtn').onclick = () => { localStorage.removeItem(STORAGE_KEYS.defaultZone); if($('defaultZakladSelect')) $('defaultZakladSelect').value=''; renderRescuers(); alert('Wyczyszczono domyślny zakład.'); };
if ($('rescuerSearch')) $('rescuerSearch').addEventListener('input', renderRescuers);
document.querySelectorAll('.rich-toolbar').forEach(toolbar => {
  const target = toolbar.dataset.target;
  toolbar.querySelectorAll('button[data-format]').forEach(btn => btn.addEventListener('click', () => applyFormatToField(target, btn.dataset.format)));
  const color = toolbar.querySelector('input[data-format-color]');
  if(color) color.addEventListener('input', () => applyFormatToField(target, 'color', color.value));
});
if ($('expiredKitReportBtn')) $('expiredKitReportBtn').onclick = () => { $('expiredKitReportOutput').value = buildExpiredKitReport(); };
if ($('expiredKitExcelBtn')) $('expiredKitExcelBtn').onclick = () => exportExpiredKitExcel();
if ($('changeAdminPasswordBtn')) $('changeAdminPasswordBtn').onclick = () => {
  const current = $('adminPasswordCurrent')?.value || '';
  const next = $('adminPasswordNew')?.value || '';
  if(current !== getAdminPassword()) return alert('Aktualne hasło jest nieprawidłowe.');
  if(String(next).trim().length < 6) return alert('Nowe hasło musi mieć co najmniej 6 znaków.');
  localStorage.setItem(STORAGE_KEYS.adminPassword, next.trim());
  if ($('adminPasswordCurrent')) $('adminPasswordCurrent').value = '';
  if ($('adminPasswordNew')) $('adminPasswordNew').value = '';
  if ($('masterAdminPasswordValue')) $('masterAdminPasswordValue').value = next.trim();
  logChangeSync({ actorRole:'Administrator', action:'Zmiana hasła', entityType:'password', label:'Hasło administratora', details:'Administrator zmienił własne hasło.' });
  alert('Hasło administratora zostało zmienione.');
};
if ($('masterCloseBtn')) $('masterCloseBtn').onclick = () => closeMasterPanel();
if ($('masterRevealBtn')) $('masterRevealBtn').onclick = () => openMasterPanel();
if ($('masterCopyAdminPasswordBtn')) $('masterCopyAdminPasswordBtn').onclick = async () => {
  const value = getAdminPassword();
  if($('masterAdminPasswordValue')) $('masterAdminPasswordValue').value = value;
  try { await navigator.clipboard.writeText(value); alert('Hasło administratora skopiowano.'); } catch { alert('Nie udało się skopiować hasła.'); }
};
if ($('saveAppInfoBtn')) $('saveAppInfoBtn').onclick = () => {
  appInfo = {
    title: $('masterAppInfoTitle')?.value.trim() || DEFAULT_APP_INFO.title,
    text: $('masterAppInfoText')?.value.trim() || DEFAULT_APP_INFO.text
  };
  saveLocal();
  renderAppInfoModal();
  alert('Zapisano informacje o aplikacji.');
};
if ($('saveAppNoticeBtn')) $('saveAppNoticeBtn').onclick = () => {
  appNotice = {
    title: $('masterNoticeTitle')?.value.trim() || '',
    text: $('masterNoticeText')?.value.trim() || '',
    updatedAt: new Date().toISOString(),
    notify: true
  };
  localStorage.removeItem(STORAGE_KEYS.appNoticeSeen);
  saveLocal();
  renderAppNotice();
  alert('Zapisano komunikat dla użytkowników. Po synchronizacji online będzie widoczny na wszystkich urządzeniach, a przy zgodzie na lokalne powiadomienia pojawi się także notyfikacja.');
};
if ($('clearAppNoticeBtn')) $('clearAppNoticeBtn').onclick = () => {
  appNotice = { title:'', text:'', updatedAt:'', notify:false };
  localStorage.removeItem(STORAGE_KEYS.appNoticeSeen);
  saveLocal();
  fillMasterAppSettings();
  renderAppNotice();
  alert('Usunięto komunikat dla użytkowników.');
};
if ($('masterResetAdminPasswordBtn')) $('masterResetAdminPasswordBtn').onclick = () => {
  const next = $('masterAdminPasswordNew')?.value || '';
  const previousAdminPassword = getAdminPassword();
  if(String(next).trim().length < 6) return alert('Nowe hasło administratora musi mieć co najmniej 6 znaków.');
  localStorage.setItem(STORAGE_KEYS.adminPassword, next.trim());
  sessionStorage.setItem(STORAGE_KEYS.adminUnlocked, '1');
  if ($('masterAdminPasswordValue')) $('masterAdminPasswordValue').value = next.trim();
  if ($('masterAdminPasswordNew')) $('masterAdminPasswordNew').value = '';
  logChangeSync(makeHistoryPayload({ actorRole:'Master', action:'Reset hasła', entityType:'password', label:'Hasło administratora', beforeState:summarizePasswordSecret(previousAdminPassword), afterState:summarizePasswordSecret(next.trim()), details:'Panel master zresetował hasło administratora.' }));
  alert('Hasło administratora zostało zresetowane przez panel master.');
};
if ($('changeMasterPasswordBtn')) $('changeMasterPasswordBtn').onclick = () => {
  const current = $('masterPasswordCurrent')?.value || '';
  const next = $('masterPasswordNew')?.value || '';
  if(current !== getMasterPassword()) return alert('Aktualne hasło master jest nieprawidłowe.');
  if(String(next).trim().length < 6) return alert('Nowe hasło master musi mieć co najmniej 6 znaków.');
  localStorage.setItem(STORAGE_KEYS.masterPassword, next.trim());
  if ($('masterPasswordCurrent')) $('masterPasswordCurrent').value = '';
  if ($('masterPasswordNew')) $('masterPasswordNew').value = '';
  sessionStorage.setItem(STORAGE_KEYS.masterUnlocked, '1');
  logChangeSync(makeHistoryPayload({ actorRole:'Master', action:'Zmiana hasła', entityType:'password', label:'Hasło panelu master', beforeState:summarizePasswordSecret(current), afterState:summarizePasswordSecret(next.trim()), details:'Zmieniono hasło panelu master.' }));
  alert('Hasło panelu master zostało zmienione.');
};
if ($('refreshPublicIpBtn')) $('refreshPublicIpBtn').onclick = async () => {
  const ip = await fetchPublicIp(true);
  updateCurrentContextInfo();
  alert(`Aktualny zapisany publiczny IP: ${ip || 'nieustalono'}`);
};
if ($('exportHistoryCsvBtn')) $('exportHistoryCsvBtn').onclick = () => exportBlob('historia_zmian_panel_master.csv', buildHistoryCsv(), 'text/csv;charset=utf-8');
if ($('changeMasterPinBtn')) $('changeMasterPinBtn').onclick = () => {
  const current = $('masterPinCurrent')?.value || '';
  const next = $('masterPinNew')?.value || '';
  if(String(current).trim() !== String(getMasterPin())) return alert('Aktualny PIN master jest nieprawidłowy.');
  if(!/^\d{4,8}$/.test(String(next).trim())) return alert('Nowy PIN master musi mieć od 4 do 8 cyfr.');
  localStorage.setItem(STORAGE_KEYS.masterPin, String(next).trim());
  if ($('masterPinCurrent')) $('masterPinCurrent').value = '';
  if ($('masterPinNew')) $('masterPinNew').value = '';
  if ($('masterPinMaskedValue')) $('masterPinMaskedValue').value = `ukryte (${String(next).trim().length} cyfr)`;
  logChangeSync(makeHistoryPayload({ actorRole:'Master', action:'Zmiana PIN', entityType:'password', label:'PIN potwierdzenia master', beforeState:`ukryte (${String(current).trim().length} cyfr)`, afterState:`ukryte (${String(next).trim().length} cyfr)`, details:'Zmieniono PIN potwierdzenia usunięcia historii.' }));
  alert('PIN potwierdzenia master został zmieniony.');
  updateCurrentContextInfo();
};
if ($('clearHistoryBtn')) $('clearHistoryBtn').onclick = () => {
  if(!confirm('Czy na pewno chcesz usunąć całą historię zmian?')) return;
  const result = confirmMasterHistoryDelete();
  if(!result.ok) return alert(result.reason === 'pin' ? 'Nieprawidłowy PIN potwierdzenia.' : 'Nieprawidłowe hasło master.');
  const removedCount = changeHistory.length;
  changeHistory = [];
  saveHistory();
  renderChangeHistory();
  alert(`Historia zmian została wyczyszczona. Usunięte wpisy: ${removedCount}.`);
};
if ($('changeHistoryFilter')) $('changeHistoryFilter').addEventListener('change', () => renderChangeHistory());
if ($('changeHistorySearch')) $('changeHistorySearch').addEventListener('input', () => renderChangeHistory());
if ($('alarmHistoryZoneFilter')) $('alarmHistoryZoneFilter').addEventListener('change', () => renderAlarmHistory());
if ($('alarmHistorySearch')) $('alarmHistorySearch').addEventListener('input', () => renderAlarmHistory());
let masterTapCount = 0, masterTapTimer = null;
const masterTrigger = document.querySelector('.logo-img') || document.querySelector('.brand h1');
if(masterTrigger){
  masterTrigger.title = 'Kliknij 5 razy, aby otworzyć ukryty panel master';
  masterTrigger.addEventListener('click', () => {
    masterTapCount += 1;
    clearTimeout(masterTapTimer);
    if(masterTapCount >= 5){
      masterTapCount = 0;
      openMasterPanel();
      return;
    }
    masterTapTimer = setTimeout(() => { masterTapCount = 0; }, 2200);
  });
}
// Metronome
let audioCtx = null;
let metroTimer = null;
let metroRunning = false;
let metroNextTickAt = 0;
const METRONOME_BPM = 110;
const METRONOME_INTERVAL_SEC = 60 / METRONOME_BPM;
const METRONOME_LOOKAHEAD_MS = 60;
const METRONOME_SCHEDULE_AHEAD_SEC = 0.18;
const METRONOME_RESYNC_THRESHOLD_SEC = 0.35;
async function ensureMetronomeAudioContext(){
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if(!AudioContextCtor) throw new Error('Ta przeglądarka nie obsługuje Web Audio.');
  audioCtx = audioCtx || new AudioContextCtor();
  if(audioCtx.state === 'suspended'){
    try{
      await audioCtx.resume();
    }catch(_){}
  }
  return audioCtx;
}
function scheduleMetronomeTick(atTime){
  if(!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = 880;
  osc.type = 'square';
  gain.gain.setValueAtTime(0.0001, atTime);
  gain.gain.exponentialRampToValueAtTime(0.18, atTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, atTime + 0.08);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(atTime);
  osc.stop(atTime + 0.09);
}
function stopMetronome(){
  metroRunning = false;
  if(metroTimer){
    clearTimeout(metroTimer);
    metroTimer = null;
  }
}
function runMetronomeScheduler(){
  if(!metroRunning || !audioCtx) return;
  if(metroTimer){
    clearTimeout(metroTimer);
    metroTimer = null;
  }
  if(audioCtx.state !== 'running'){
    metroTimer = setTimeout(() => {
      ensureMetronomeAudioContext().then(() => {
        if(metroRunning) runMetronomeScheduler();
      }).catch(() => {});
    }, METRONOME_LOOKAHEAD_MS);
    return;
  }
  const now = audioCtx.currentTime;
  if(!metroNextTickAt || metroNextTickAt < now - METRONOME_RESYNC_THRESHOLD_SEC){
    // On phones timers can freeze briefly; after wakeup we resync instead of replaying missed beats in a burst.
    metroNextTickAt = now + 0.03;
  }
  while(metroNextTickAt < now + METRONOME_SCHEDULE_AHEAD_SEC){
    scheduleMetronomeTick(metroNextTickAt);
    metroNextTickAt += METRONOME_INTERVAL_SEC;
  }
  metroTimer = setTimeout(runMetronomeScheduler, METRONOME_LOOKAHEAD_MS);
}
async function startMetronome(){
  stopMetronome();
  try{
    const ctx = await ensureMetronomeAudioContext();
    metroRunning = true;
    metroNextTickAt = ctx.currentTime + 0.03;
    runMetronomeScheduler();
  }catch(err){
    alert('Nie udało się uruchomić metronomu: ' + (err?.message || err));
  }
}
$('startMetronomeBtn').onclick = () => { startMetronome(); };
refreshNotificationButtons();
$('stopMetronomeBtn').onclick = () => { stopMetronome(); };
document.addEventListener('visibilitychange', () => {
  if(!metroRunning) return;
  if(document.hidden){
    if(metroTimer){
      clearTimeout(metroTimer);
      metroTimer = null;
    }
    return;
  }
  ensureMetronomeAudioContext().then(() => {
    if(audioCtx){
      metroNextTickAt = audioCtx.currentTime + 0.03;
    }
    if(metroRunning) runMetronomeScheduler();
  }).catch(() => {});
});
window.addEventListener('pagehide', () => stopMetronome());
if ($('enableNotificationsBtn')) $('enableNotificationsBtn').onclick = async () => {
  if(!('Notification' in window)) return alert('Ta przeglądarka nie obsługuje powiadomień.');
  if(!window.isSecureContext) return alert('Powiadomienia wymagają bezpiecznego połączenia HTTPS albo uruchomienia aplikacji jako zainstalowane PWA z GitHub Pages.');
  const stateBefore = getNotificationPermissionState();
  if(stateBefore === 'granted'){
    refreshNotificationButtons();
    alert('Powiadomienia są już włączone.');
    return;
  }
  if(stateBefore === 'denied'){
    alert('Powiadomienia zostały wcześniej zablokowane w przeglądarce. Odblokuj je ręcznie w ustawieniach witryny i odśwież aplikację.');
    return;
  }
  const result = await ensureNotificationPermission(true);
  refreshNotificationButtons();
  if(result === 'granted'){
    const test = await notifyLocal('Ratownik PLK', 'Powiadomienia lokalne zostały włączone.', { source:'Ustawienia powiadomień', level:'notice' });
    if(test.ok){
      alert('Powiadomienia włączone i działają poprawnie.');
    }else{
      alert('Zgoda na powiadomienia została nadana, ale system nie pokazał testu. Najczęściej pomaga ponowne otwarcie aplikacji PWA albo sprawdzenie ustawień powiadomień dla tej witryny. Szczegóły: ' + test.reason);
    }
  }else if(result === 'denied'){
    alert('Powiadomienia zostały zablokowane. Odblokuj je ręcznie w ustawieniach witryny.');
  }else{
    alert('Powiadomienia nie zostały włączone. Aplikacja nadal pokaże komunikaty w banerze startowym.');
  }
};
if ($('testNotificationBtn')) $('testNotificationBtn').onclick = async () => {
  if(!('Notification' in window)) return alert('Ta przeglądarka nie obsługuje powiadomień.');
  if(!window.isSecureContext) return alert('Test powiadomień działa tylko przez HTTPS albo w zainstalowanej aplikacji PWA.');
  const state = await ensureNotificationPermission(false);
  if(state !== 'granted') return alert('Powiadomienia nie są jeszcze aktywne. Kliknij „Włącz powiadomienia”, zaakceptuj zgodę przeglądarki i spróbuj ponownie.');
  const result = await notifyLocal('Ratownik PLK', 'Test powiadomienia działa poprawnie.', { source:'Test powiadomień', level:'notice' });
  if(!result.ok) alert('Nie udało się wyświetlić testowego powiadomienia. Szczegóły: ' + result.reason);
};
if ($('selectAllRescuersBtn')) $('selectAllRescuersBtn').onclick = () => document.querySelectorAll('.rescuer-check').forEach(ch => ch.checked = true);
if ($('clearSelectedRescuersBtn')) $('clearSelectedRescuersBtn').onclick = () => document.querySelectorAll('.rescuer-check').forEach(ch => ch.checked = false);
if ($('groupSmsBtn')) $(`groupSmsBtn`).onclick = () => {
  const ids = selectedRescuers();
  const selected = rescuers.filter(r => ids.includes(r.id) && r.phone);
  if(!selected.length) return alert('Zaznacz co najmniej jednego ratownika.');
  const numbers = selected.map(r => r.phone).join(',');
  const message = buildAlarmMessageForRescuers(selected);
  notifyLocal('Alarm grupowy', `Przygotowano alarm dla ${selected.length} ratowników.`, { source:'Alarmy', level:'alarm' }).catch(()=>{});
  location.href = 'sms:' + numbers + '?body=' + encodeURIComponent(message);
};
if ($('groupCallBtn')) $(`groupCallBtn`).onclick = () => alarmSelectedRescuers();
if ($('exportHistoryExcelBtn')) $('exportHistoryExcelBtn').onclick = () => exportBlob('historia_systemu_i_alarmow.xls', buildWorkbookExcelXml(), 'application/vnd.ms-excel');
if ($('exportAlarmExcelBtn')) $('exportAlarmExcelBtn').onclick = () => exportBlob('historia_alarmow_osobny_arkusz.xls', buildWorkbookExcelXml(), 'application/vnd.ms-excel');
function scrollScreenTop(){
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector('.app')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setAlgorithmView(mode='list'){
  const screen = $('screen-algorithms');
  if(!screen) return;
  screen.classList.remove('stepper-mode','list-mode');
  screen.classList.add(mode === 'stepper' ? 'stepper-mode' : 'list-mode');
}

// Mobile nav
window.showScreen = function(screenId, options = {}){
  if(screenId === 'screen-admin' && !ensureAdminAccess()){ screenId = 'screen-start'; }
  document.querySelectorAll('.bottom-nav button').forEach(b => b.classList.toggle('active', b.dataset.screen === screenId));
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === screenId));
  if(screenId === 'screen-algorithms'){
    setAlgorithmView(options.algorithmMode || 'list');
  }
  if(screenId === 'screen-aed') setTimeout(() => map.invalidateSize(), 150);
  setTimeout(scrollScreenTop, 10);
};
document.querySelectorAll('.bottom-nav button').forEach(btn => btn.onclick = () => window.showScreen(btn.dataset.screen, btn.dataset.screen === 'screen-algorithms' ? { algorithmMode:'list' } : {}));
document.querySelectorAll('[data-jump-screen]').forEach(btn => btn.onclick = () => window.showScreen(btn.dataset.jumpScreen, btn.dataset.jumpScreen === 'screen-algorithms' ? { algorithmMode:'list' } : {}));
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMasterPanel(); });
if ($('masterModal')) $('masterModal').addEventListener('click', e => { if(e.target.id === 'masterModal') closeMasterPanel(); });
if ($('appInfoModal')) $('appInfoModal').addEventListener('click', e => { if(e.target.id === 'appInfoModal') closeModalById('appInfoModal'); });
if ($('notificationInfoModal')) $('notificationInfoModal').addEventListener('click', e => { if(e.target.id === 'notificationInfoModal') closeModalById('notificationInfoModal'); });
if ($('offlineModal')) $('offlineModal').addEventListener('click', e => { if(e.target.id === 'offlineModal') closeModalById('offlineModal'); });

document.addEventListener('click', e => {
  const btn = e.target.closest('#appInfoBtn, #notificationInfoBtn, #closeAppInfoBtn, #closeNotificationInfoBtn, #topOfflineBtn, #closeOfflineBtn');
  if(!btn) return;
  if(btn.id === 'appInfoBtn'){ renderAppInfoModal(); openModalById('appInfoModal'); }
  if(btn.id === 'notificationInfoBtn'){ renderNotificationInfoModal(); openModalById('notificationInfoModal'); }
  if(btn.id === 'closeAppInfoBtn'){ closeModalById('appInfoModal'); }
  if(btn.id === 'closeNotificationInfoBtn'){ closeModalById('notificationInfoModal'); }
  if(btn.id === 'topOfflineBtn'){ renderOfflineSummary(); openModalById('offlineModal'); }
  if(btn.id === 'closeOfflineBtn'){ closeModalById('offlineModal'); }
});
// Admin CRUD
$('addRescuerBtn').onclick = () => {
  const existing = rescuerEditId ? rescuers.find(x => x.id === rescuerEditId) : null;
  const item = normalizeRescuer({ id: rescuerEditId || 'r'+Date.now(), name:$('adminRescuerName').value.trim(), phone:$('adminRescuerPhone').value.trim(), zone:$('adminRescuerZone').value.trim(), location:$('adminRescuerLocation').value.trim(), shift:$('adminRescuerShift').value.trim(), skills:$('adminRescuerSkills').value.trim(), alarmGroup: $('adminRescuerAlarmGroup').value !== 'nie' });
  if(!item.name || !item.phone) return alert('Podaj imię i telefon.');
  upsertEntity(rescuers, item); rescuerEditId = null; saveLocal(); renderAll();
  logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action: existing ? 'Edycja' : 'Dodanie', entityType:'rescuer', entityId:item.id, label:item.name, beforeState: existing ? summarizeRescuer(existing) : '', afterState: summarizeRescuer(item), details: existing ? 'Zmieniono dane ratownika.' : 'Dodano nowego ratownika.' }));
  $('addRescuerBtn').textContent = 'Dodaj / zapisz ratownika';
  ['adminRescuerName','adminRescuerPhone','adminRescuerZone','adminRescuerLocation','adminRescuerShift','adminRescuerSkills','adminRescuerAlarmGroup'].forEach(id => $(id).value = '');
};
$('addAedBtn').onclick = () => {
  const existing = aedEditId ? aeds.find(x => x.id === aedEditId) : null;
  const item = { id: aedEditId || 'a'+Date.now(), name:$('adminAedName').value.trim(), location:$('adminAedLocation').value.trim(), lat:Number($('adminAedLat').value), lon:Number($('adminAedLon').value) };
  if(!item.name || !item.location || Number.isNaN(item.lat) || Number.isNaN(item.lon)) return alert('Uzupełnij nazwę, lokalizację i współrzędne.');
  upsertEntity(aeds, item); aedEditId = null; saveLocal(); renderAll(); renderMap();
  logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action: existing ? 'Edycja' : 'Dodanie', entityType:'aed', entityId:item.id, label:item.name, beforeState: existing ? summarizeAed(existing) : '', afterState: summarizeAed(item), details: existing ? 'Zmieniono dane AED.' : 'Dodano punkt AED.' }));
  $('addAedBtn').textContent = 'Dodaj / zapisz AED';
  ['adminAedName','adminAedLocation','adminAedLat','adminAedLon'].forEach(id => $(id).value = '');
};
$('addKitBtn').onclick = () => {
  const existing = kitEditId ? kits.find(x => x.id === kitEditId) : null;
  const name = $('adminKitName').value.trim();
  const location = $('adminKitLocation').value.trim();
  const type = $('adminKitType').value;
  const categories = ($('adminKitCategories').value || '').split(',').map(x => x.trim()).filter(Boolean);
  const items = $('adminKitContents').value.split(/\r?\n/).map(x => x.trim()).filter(Boolean).map(normalizeKitItem).filter(x => x.name);
  if(!name || !location) return alert('Podaj nazwę i lokalizację apteczki.');
  const normalizedKit = normalizeKit({ id: kitEditId || 'k'+Date.now(), name, location, type, categories, items: items.length ? items : [{name:'brak opisu zawartości', size:'', qty:'', expiry:''}] });
  upsertEntity(kits, normalizedKit);
  kitEditId = null; saveLocal(); renderAll();
  logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action: existing ? 'Edycja' : 'Dodanie', entityType:'kit', entityId:normalizedKit.id, label:normalizedKit.name, beforeState: existing ? summarizeKit(existing) : '', afterState: summarizeKit(normalizedKit), details: existing ? 'Zmieniono dane apteczki.' : 'Dodano apteczkę.' }));
  $('addKitBtn').textContent = 'Dodaj / zapisz apteczkę';
  ['adminKitName','adminKitLocation','adminKitType','adminKitCategories','adminKitContents'].forEach(id => $(id).value = id === 'adminKitType' ? 'zakładowa' : '');
  if ($('expiredKitReportOutput')) $('expiredKitReportOutput').value = buildExpiredKitReport();
};

if ($('importRescuersBtn')) $('importRescuersBtn').onclick = () => $('importRescuersCsv')?.click();
if ($('importAedsBtn')) $('importAedsBtn').onclick = () => $('importAedsCsv')?.click();
if ($('importKitsBtn')) $('importKitsBtn').onclick = () => $('importKitsCsv')?.click();
if ($('importTopicsBtn')) $('importTopicsBtn').onclick = () => $('importTopicsCsv')?.click();
if ($('importRescuersCsv')) $('importRescuersCsv').onchange = e => { handleCsvImport(e.target.files?.[0], 'rescuers'); e.target.value = ''; };
if ($('importAedsCsv')) $('importAedsCsv').onchange = e => { handleCsvImport(e.target.files?.[0], 'aeds'); e.target.value = ''; };
if ($('importKitsCsv')) $('importKitsCsv').onchange = e => { handleCsvImport(e.target.files?.[0], 'kits'); e.target.value = ''; };
if ($('importTopicsCsv')) $('importTopicsCsv').onchange = e => { handleCsvImport(e.target.files?.[0], 'topics'); e.target.value = ''; };

if ($('saveEventTypeBtn')) $('saveEventTypeBtn').onclick = () => {
  const value = $('adminEventTypeName')?.value.trim() || '';
  if(!value) return alert('Podaj nazwę typu zdarzenia.');
  const duplicateIndex = eventTypes.findIndex((x, idx) => x.toLowerCase() === value.toLowerCase() && idx !== eventTypeEditIndex);
  if(duplicateIndex >= 0) return alert('Taki typ zdarzenia już istnieje.');
  if(eventTypeEditIndex == null) eventTypes.push(value);
  else eventTypes[eventTypeEditIndex] = value;
  eventTypes = [...new Set(eventTypes)];
  eventTypeEditIndex = null;
  if($('adminEventTypeName')) $('adminEventTypeName').value = '';
  if($('saveEventTypeBtn')) $('saveEventTypeBtn').textContent = 'Dodaj typ zdarzenia';
  if($('cancelEventTypeEditBtn')) $('cancelEventTypeEditBtn').hidden = true;
  saveLocal(); renderAll();
};
if ($('cancelEventTypeEditBtn')) $('cancelEventTypeEditBtn').onclick = () => {
  eventTypeEditIndex = null;
  if($('adminEventTypeName')) $('adminEventTypeName').value = '';
  if($('saveEventTypeBtn')) $('saveEventTypeBtn').textContent = 'Dodaj typ zdarzenia';
  $('cancelEventTypeEditBtn').hidden = true;
};

$('saveTopicBtn').onclick = () => {
  const existingTopic = currentTopicEditId ? topics.find(x => x.id === currentTopicEditId) : null;
  const title = $('topicTitle').value.trim();
  if(!title) return alert('Podaj tytuł tematu.');
  const item = {
    id: currentTopicEditId || 't'+Date.now(),
    n: topics.length + 1,
    category: $('topicCategory')?.value.trim() || getDefaultTopicCategorySelection(),
    icon: $('topicIcon').value.trim() || '🩺',
    t: title,
    images: ($('topicImage').value || '').split(/\r?\n|,/).map(x => x.trim()).filter(Boolean).slice(0,4),
    img: (($('topicImage').value || '').split(/\r?\n|,/).map(x => x.trim()).filter(Boolean).slice(0,4)[0]) || 'assets/topics/sec01.jpg',
    leadTitle: $('topicLeadTitle')?.value.trim() || 'Wstęp',
    lead: $('topicLead')?.value.trim() || '',
    leadColor: $('topicLeadColor')?.value || defaultTopicColors.lead,
    stepsColor: $('topicStepsColor')?.value || defaultTopicColors.steps,
    warnColor: $('topicWarnColor')?.value || defaultTopicColors.warn,
    notesColor: $('topicNotesColor')?.value || defaultTopicColors.notes,
    relatedAlgorithmIds: [...document.querySelectorAll('#topicAlgorithmLinks input:checked')].map(i => i.value),
    s: normalizeTopicSectionsFromForm()
  };
  upsertEntity(topics, item);
  currentTopicEditId = null;
  saveLocal(); renderAll(); fillTopicForm(null);
  logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action: existingTopic ? 'Edycja' : 'Dodanie', entityType:'topic', entityId:item.id, label:item.t, beforeState: existingTopic ? summarizeTopic(existingTopic) : '', afterState: summarizeTopic(item), details: existingTopic ? 'Zmieniono temat szybkiej pomocy.' : 'Dodano temat szybkiej pomocy.' }));
};
$('cancelTopicEditBtn').onclick = () => fillTopicForm(null);
$('saveAlgorithmBtn').onclick = () => {
  const existing = algorithmEditId ? algorithms.find(x => x.id === algorithmEditId) : null;
  const title = $('algorithmTitle').value.trim();
  const steps = $('algorithmSteps').value.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  if(!title) return alert('Podaj tytuł algorytmu.');
  const item = normalizeAlgorithm({
    id: algorithmEditId || 'alg'+Date.now(),
    icon: $('algorithmIcon').value.trim() || '🧭',
    title,
    category: $('algorithmCategory').value.trim() || 'Algorytm',
    accent: $('algorithmAccent').value || 'primary',
    steps
  });
  upsertEntity(algorithms, item);
  algorithmEditId = null;
  currentAlgorithmId = item.id;
  currentAlgorithmStep = 0;
  saveLocal(); renderAll(); fillAlgorithmForm(null); renderTopicAlgorithmPicker([...document.querySelectorAll('#topicAlgorithmLinks input:checked')].map(i => i.value)); window.showScreen('screen-admin');
  logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action: existing ? 'Edycja' : 'Dodanie', entityType:'algorithm', entityId:item.id, label:item.title, beforeState: existing ? summarizeAlgorithm(existing) : '', afterState: summarizeAlgorithm(item), details: existing ? 'Zmieniono algorytm.' : 'Dodano algorytm.' }));
};
$('cancelAlgorithmEditBtn').onclick = () => fillAlgorithmForm(null);
$('exportAlgorithmsDocBtn').onclick = () => {
  const content = ['PKP PLK Ratownik – algorytmy ratunkowe',''].concat(algorithms.flatMap(a => [ `${a.icon || '🧭'} ${a.title} [${a.category}]`, ...(a.steps || []).map((s,i)=>`${i+1}. ${s}`), '' ])).join('\n');
  exportBlob('pkp_plk_algorytmy_ratunkowe.doc', content, 'application/msword');
};
$('exportAlgorithmsHtmlBtn').onclick = () => exportBlob('pkp_plk_algorytmy_ratunkowe.html', algorithmExportHtml(), 'text/html');
if($('printAlgorithmsBtn')) $('printAlgorithmsBtn').onclick = () => printAlgorithms();
if($('printAlgorithmsPublicBtn')) $('printAlgorithmsPublicBtn').onclick = () => printAlgorithms();
if($('printAlgorithmsStepperBtn')) $('printAlgorithmsStepperBtn').onclick = () => printAlgorithms();
if($('resetTopicCategoryPriorityBtn')) $('resetTopicCategoryPriorityBtn').onclick = () => {
  topicCategoryPriority = [...DEFAULT_TOPIC_CATEGORY_PRIORITY];
  saveLocal();
  renderAll();
};
if($('resetOfflineAlgorithmOrderBtn')) $('resetOfflineAlgorithmOrderBtn').onclick = () => {
  const selected = new Set(offlineAlgorithmIds);
  offlineAlgorithmIds = algorithms
    .map((algo, idx) => normalizeAlgorithm(algo, idx).id)
    .filter(id => selected.has(id));
  saveLocal();
  renderAll();
};
$('resetLocalBtn').onclick = () => {
  if(!confirm('Przywrócić domyślne dane lokalne?')) return;
  localStorage.removeItem(STORAGE_KEYS.rescuers);
  localStorage.removeItem(STORAGE_KEYS.aeds);
  localStorage.removeItem(STORAGE_KEYS.kits);
  localStorage.removeItem(STORAGE_KEYS.topics);
  localStorage.removeItem(STORAGE_KEYS.algorithms);
  localStorage.removeItem(STORAGE_KEYS.topicCategoryPriority);
  rescuers = deepClone(defaultRescuers);
  aeds = deepClone(defaultAeds);
  kits = deepClone(defaultKits);
  topics = deepClone(defaultTopics);
  algorithms = deepClone(defaultAlgorithms);
  topicCategoryPriority = [...DEFAULT_TOPIC_CATEGORY_PRIORITY];
  currentAlgorithmId = algorithms[0]?.id || null;
  currentAlgorithmStep = 0;
  saveLocal(); renderAll(); renderMap(); resetEntityForms();
  logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action:'Reset danych', entityType:'system', label:'Dane lokalne', beforeState:'własne dane lokalne użytkownika', afterState:'przywrócono zestaw danych domyślnych', details:'Przywrócono domyślne dane lokalne aplikacji.' }));
  alert('Przywrócono dane domyślne.');
};
document.addEventListener('click', e => {
  const t = e.target.closest('[data-edit-rescuer],[data-delete-rescuer],[data-edit-aed],[data-delete-aed],[data-edit-kit],[data-delete-kit],[data-edit-topic],[data-delete-topic],[data-move-topic],[data-move-topic-category],[data-move-offline-algo],[data-select-algo],[data-edit-algorithm],[data-delete-algorithm],[data-open-related-algo],[data-toggle-offline-algo],[data-edit-event-type],[data-delete-event-type]') || e.target;
  const rescuerId = t.dataset.editRescuer || t.dataset.deleteRescuer;
  const aedId = t.dataset.editAed || t.dataset.deleteAed;
  const kitId = t.dataset.editKit || t.dataset.deleteKit;
  const topicId = t.dataset.editTopic || t.dataset.deleteTopic;
  const moveTopic = t.dataset.moveTopic;
  const moveTopicCategory = t.dataset.moveTopicCategory;
  const topicCategoryName = t.dataset.topicCategoryName || '';
  const moveOfflineAlgo = t.dataset.moveOfflineAlgo;
  const offlineAlgoIdToMove = t.dataset.offlineAlgoId || '';
  const algoId = t.dataset.selectAlgo;
  const adminAlgorithmId = t.dataset.editAlgorithm || t.dataset.deleteAlgorithm;
  const relatedAlgoId = t.dataset.openRelatedAlgo;
  const offlineAlgoId = t.dataset.toggleOfflineAlgo;
  const eventTypeIndex = t.dataset.editEventType ?? t.dataset.deleteEventType;
  if (offlineAlgoId){
    if(t.checked){
      if(!offlineAlgorithmIds.includes(offlineAlgoId)) offlineAlgorithmIds.push(offlineAlgoId);
    }else{
      offlineAlgorithmIds = offlineAlgorithmIds.filter(id => id !== offlineAlgoId);
    }
    saveLocal();
    renderOfflineSummary();
    renderOfflineAlgorithmPriorityEditor();
    renderAdminAlgorithms();
  }
  if (relatedAlgoId){
    currentAlgorithmId = relatedAlgoId;
    currentAlgorithmStep = 0;
    renderAlgorithms($('algorithmSearch').value || '');
    renderAlgorithmStepper();
    setAlgorithmView('stepper');
    window.showScreen('screen-algorithms', { algorithmMode:'stepper' });
    setTimeout(() => $('algorithmStepperCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }
  if (algoId){
    currentAlgorithmId = algoId;
    currentAlgorithmStep = 0;
    renderAlgorithms($('algorithmSearch').value || '');
    renderAlgorithmStepper();
    setAlgorithmView('stepper');
    window.showScreen('screen-algorithms', { algorithmMode:'stepper' });
    setTimeout(() => $('algorithmStepperCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }
  if (t.dataset.editRescuer){
    const item = rescuers.find(x => x.id === rescuerId); if(!item) return;
    rescuerEditId = item.id; $('addRescuerBtn').textContent = 'Zapisz ratownika';
    $('adminRescuerName').value = item.name; $('adminRescuerPhone').value = item.phone; $('adminRescuerZone').value = item.zone; $('adminRescuerLocation').value = item.location || ''; $('adminRescuerShift').value = item.shift || ''; $('adminRescuerSkills').value = item.skills; $('adminRescuerAlarmGroup').value = item.alarmGroup === false ? 'nie' : 'tak';
  }
  if (t.dataset.deleteRescuer){
    const deleted = rescuers.find(x => x.id === rescuerId);
    rescuers = rescuers.filter(x => x.id !== rescuerId); saveLocal(); renderAll();
    if(deleted){ const map = getDefaultRescuerMap(); if(map[deleted.zone] === deleted.id){ delete map[deleted.zone]; saveDefaultRescuerMap(map); } logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action:'Usunięcie', entityType:'rescuer', entityId:deleted.id, label:deleted.name, beforeState:summarizeRescuer(deleted), afterState:'usunięto', details:'Usunięto ratownika.' })); }
  }
  if (t.dataset.editAed){
    const item = aeds.find(x => x.id === aedId); if(!item) return;
    aedEditId = item.id; $('addAedBtn').textContent = 'Zapisz AED';
    $('adminAedName').value = item.name; $('adminAedLocation').value = item.location; $('adminAedLat').value = item.lat; $('adminAedLon').value = item.lon;
  }
  if (t.dataset.deleteAed){
    const deleted = aeds.find(x => x.id === aedId);
    aeds = aeds.filter(x => x.id !== aedId); saveLocal(); renderAll(); renderMap();
    if(deleted) logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action:'Usunięcie', entityType:'aed', entityId:deleted.id, label:deleted.name, beforeState:summarizeAed(deleted), afterState:'usunięto', details:'Usunięto punkt AED.' }));
  }
  if (t.dataset.editKit){
    const item = kits.find(x => x.id === kitId); if(!item) return;
    kitEditId = item.id; $('addKitBtn').textContent = 'Zapisz apteczkę';
    const kit = normalizeKit(item);
    $('adminKitName').value = kit.name; $('adminKitLocation').value = kit.location; $('adminKitType').value = kit.type || 'zakładowa'; $('adminKitCategories').value = (kit.categories || []).join(', '); $('adminKitContents').value = (kit.items || []).map(i => [i.name, i.size || '', i.qty || '', i.expiry || ''].filter((part, idx, arr) => idx === 0 || arr.slice(idx).join('').trim() !== '' || idx < 3).join(' | ')).join('\n');
  }
  if (t.dataset.deleteKit){
    const deleted = kits.find(x => x.id === kitId);
    kits = kits.filter(x => x.id !== kitId); saveLocal(); renderAll();
    if(deleted) logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action:'Usunięcie', entityType:'kit', entityId:deleted.id, label:deleted.name, beforeState:summarizeKit(deleted), afterState:'usunięto', details:'Usunięto apteczkę.' }));
  }
  if (t.dataset.editTopic){
    const item = topics.find(x => x.id === topicId); if(!item) return;
    fillTopicForm(item);
    window.showScreen('screen-admin');
  }
  if (t.dataset.deleteTopic){
    const deleted = topics.find(x => x.id === topicId);
    topics = topics.filter(x => x.id !== topicId); saveLocal(); renderAll(); fillTopicForm(null);
    if(deleted) logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action:'Usunięcie', entityType:'topic', entityId:deleted.id, label:deleted.t, beforeState:summarizeTopic(deleted), afterState:'usunięto', details:'Usunięto temat szybkiej pomocy.' }));
  }
  if (t.dataset.editAlgorithm){
    const item = algorithms.find(x => x.id === adminAlgorithmId); if(!item) return;
    fillAlgorithmForm(item);
    window.showScreen('screen-admin');
  }
  if (t.dataset.deleteAlgorithm){
    const deleted = algorithms.find(x => x.id === adminAlgorithmId);
    algorithms = algorithms.filter(x => x.id !== adminAlgorithmId);
    if (!algorithms.find(x => x.id === currentAlgorithmId)) { currentAlgorithmId = algorithms[0]?.id || null; currentAlgorithmStep = 0; }
    saveLocal(); renderAll(); fillAlgorithmForm(null); renderTopicAlgorithmPicker();
    if(deleted) logChangeSync(makeHistoryPayload({ actorRole:'Administrator', action:'Usunięcie', entityType:'algorithm', entityId:deleted.id, label:deleted.title, beforeState:summarizeAlgorithm(deleted), afterState:'usunięto', details:'Usunięto algorytm.' }));
  }
  if (moveTopic){
    const [dir, id] = moveTopic.split(':');
    const idx = topics.findIndex(x => x.id === id);
    if (idx < 0) return;
    const newIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= topics.length) return;
    [topics[idx], topics[newIdx]] = [topics[newIdx], topics[idx]];
    saveLocal(); renderAll();
  }
  if (moveTopicCategory){
    normalizeTopicCategoryPriorityState();
    const currentOrder = [...topicCategoryPriority];
    const idx = currentOrder.findIndex(item => item.toLowerCase() === topicCategoryName.toLowerCase());
    if (idx < 0) return;
    const newIdx = moveTopicCategory === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= currentOrder.length) return;
    [currentOrder[idx], currentOrder[newIdx]] = [currentOrder[newIdx], currentOrder[idx]];
    topicCategoryPriority = normalizeTopicCategoryPriorityList(currentOrder, topics);
    saveLocal();
    renderAll();
  }
  if (moveOfflineAlgo){
    normalizeOfflineAlgorithmIds();
    const idx = offlineAlgorithmIds.findIndex(id => id === offlineAlgoIdToMove);
    if (idx < 0) return;
    const newIdx = moveOfflineAlgo === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= offlineAlgorithmIds.length) return;
    [offlineAlgorithmIds[idx], offlineAlgorithmIds[newIdx]] = [offlineAlgorithmIds[newIdx], offlineAlgorithmIds[idx]];
    saveLocal();
    renderAll();
  }
});
$('syncBtn').onclick = async () => {
  try{
    await syncAllOnline({ skipReload:false });
    alert('Synchronizacja zakończona.');
  }catch(e){
    alert('Błąd synchronizacji: ' + e.message);
    updateOnlineStatus(`Błąd synchronizacji: ${e.message}`, 'warn');
  }
};
// PWA install + SW
let deferredPrompt = null;
const installBtn = $('installBtn');
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; installBtn.hidden = false; });
installBtn.onclick = async () => { if(!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; installBtn.hidden = true; };
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js').then(reg => {
    if(reg && typeof reg.update === 'function') reg.update();
  }).catch(() => {});
}
fillTopicForm(null);
renderAll();
window.showScreen('screen-start');
fetchPublicIp();
setTheme(localStorage.getItem(STORAGE_KEYS.theme) || 'light');
if (hasOnlineConfig()) ensureOnlineAdminBox();
if ($('onlineAdminLoginBtn')) $('onlineAdminLoginBtn').onclick = async () => {
  if(!hasOnlineConfig()) return alert('Uzupełnij config.js.');
  const email = $('onlineAdminEmail')?.value?.trim();
  const password = $('onlineAdminPassword')?.value || '';
  if(!email || !password) return alert('Podaj email i hasło administratora online.');
  try{
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if(error) throw error;
    await refreshOnlineSessionInfo();
    await loadOnlineData({ silent:true });
    await maybeNotifyAppNotice();
    alert('Zalogowano administratora online.');
  }catch(err){
    updateOnlineStatus(`Logowanie online nieudane: ${err.message}`, 'warn');
    alert('Błąd logowania online: ' + err.message);
  }
};
if ($('onlineAdminLogoutBtn')) $('onlineAdminLogoutBtn').onclick = async () => {
  if(!hasOnlineConfig()) return;
  await supabaseClient.auth.signOut();
  await refreshOnlineSessionInfo();
};
if ($('onlineRefreshBtn')) $('onlineRefreshBtn').onclick = async () => {
  const ok = await loadOnlineData({ silent:false });
  if(ok){
    await maybeNotifyAppNotice();
    alert('Pobrano świeże dane online.');
  }
};
if (hasOnlineConfig()) { initOnlineFeatures().catch(err => { console.warn('Online init error', err); updateOnlineStatus?.(`Tryb online nieaktywny: ${err.message}`, 'warn'); }); }
