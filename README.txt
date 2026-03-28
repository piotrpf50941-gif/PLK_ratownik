PIERWSZA POMOC – PKP PLK v9

To jest kompletna, prostsza aplikacja do wdrożenia.

CO ZAWIERA
- trzy główne przyciski: 112, 999, ratownik zakładowy,
- szybką lokalizację GPS,
- mapę AED na OpenStreetMap,
- wskazanie najbliższego AED,
- 11 tematów pierwszej pomocy,
- bardziej realistyczne zdjęcia ludzi w sekcjach szkoleniowych,
- metronom RKO 110/min,
- PWA: instalacja na telefonie,
- offline dla interfejsu po pierwszym uruchomieniu,
- panel administratora online-ready.

PANEL ADMINISTRATORA ONLINE
Aplikacja działa od razu lokalnie.
Jeśli chcesz panel online:
1. Załóż projekt Supabase.
2. Utwórz tabele:
   - rescuers(id text primary key, name text, phone text, zone text, skills text)
   - aeds(id text primary key, name text, location text, lat float8, lon float8)
3. W pliku config.js wpisz:
   supabaseUrl
   supabaseAnonKey
4. Kliknij „Synchronizuj”.

GDZIE ZAMIEŚCIĆ
Najprościej:
- Netlify
- GitHub Pages
- Cloudflare Pages
- własny hosting WWW z HTTPS

JAK WDROŻYĆ
1. Rozpakuj ZIP.
2. Wrzuć wszystkie pliki na hosting statyczny.
3. Otwórz index.html przez HTTPS.
4. Na telefonie wybierz „Zainstaluj” lub „Dodaj do ekranu głównego”.

UWAGI
- mapa OSM wymaga internetu do pobierania kafelków,
- sama aplikacja, grafiki i treści działają offline po pierwszym uruchomieniu,
- zdjęcia w sekcjach są lokalnie zapisane i dopasowane do kart mobilnych.


WERSJA 10 – DODATKOWE ZMIANY
- podmienione logo aplikacji na dołączone logo PKP Polskie Linie Kolejowe S.A.,
- dodany panel apteczek z lokalizacją i zawartością,
- dodane wyszukiwanie po lokalizacji dla AED i apteczek, np. 'zakład', 'hala', 'recepcja',
- w zakładce AED dodany przycisk otwierający zewnętrzną mapę OpenAEDMap opartą o OpenStreetMap.

PANEL ONLINE – SUPABASE
Dla wersji online utwórz także tabelę:
- kits(id text primary key, name text, location text, contents jsonb)

UWAGA O MAPACH AED
W aplikacji zostawiłem własną mapę OSM z lokalnymi punktami oraz dodałem przycisk otwierający OpenAEDMap, bo to publiczna mapa AED oparta o dane OpenStreetMap. Informacje o OpenAEDMap jako globalnej mapie AED oraz o polskiej inicjatywie AED w OSM pochodzą ze źródeł OpenStreetMap. citeturn719634search3turn719634search4turn719634search9


Wersja v13 FINAL: dodano powiadomienia lokalne, filtrowanie ratowników po zakładzie, alarm grupowy, nawigację między algorytmami oraz rozbudowane apteczki.


Aktualizacja: dodano pole Wstęp / opis w tematach pierwszej pomocy oraz lokalne zasoby assets/topics i assets/audio/metronome_rko.wav.


Nowości v13 FINAL:
- ikona startowa aplikacji ustawiona w manifeście i nagłówku,
- przycisk „Wezwij ratownika zakładowego” dzwoni do domyślnego ratownika dla wybranego zakładu,
- nowy tryb „Alarm SMS + telefon” dla wielu ratowników,
- możliwość wskazania domyślnego ratownika dla każdego zakładu w panelu administratora.


V15 additions:
- ANDROID_BUILD_CHECKLIST.md
- android-ready/.well-known/assetlinks.json.example
- android-ready/bubblewrap-notes.txt
