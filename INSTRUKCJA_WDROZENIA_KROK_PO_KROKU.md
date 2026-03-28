# Ratownik PLK — wdrożenie krok po kroku

## 1. Co jest już gotowe w tej wersji
Ta paczka zawiera:
- pełną aplikację PWA do GitHub Pages,
- synchronizację online przez Supabase dla: ratowników, AED, apteczek, procedur, algorytmów i ustawień aplikacji,
- komunikat startowy dla wszystkich użytkowników,
- lokalne powiadomienia na urządzeniu po wyrażeniu zgody.

## 2. Jak działa synchronizacja
1. Administrator zmienia dane w panelu administratora.
2. Zmiany zapisują się lokalnie i po zalogowaniu online są wysyłane do Supabase.
3. Pozostałe urządzenia pobierają dane przy uruchomieniu aplikacji.
4. Realtime Supabase odświeża dane automatycznie po zmianie w bazie.

## 3. Jak dodać komunikat dla wszystkich użytkowników
1. Otwórz ukryty panel MASTER.
2. Wpisz tytuł i treść komunikatu dla użytkowników.
3. Kliknij „Zapisz”.
4. Kliknij „Synchronizuj”.
5. Na wszystkich urządzeniach pojawi się banner startowy.
6. Jeżeli użytkownik włączył lokalne powiadomienia, przy nowym komunikacie zobaczy też jednorazową notyfikację.

## 4. Jak włączyć powiadomienia lokalne
1. Otwórz aplikację przez GitHub Pages lub jako zainstalowaną PWA.
2. Na ekranie start kliknij „Włącz powiadomienia”.
3. Zgódź się na powiadomienia w przeglądarce.
4. Kliknij „Test”, aby sprawdzić działanie.

### Ważne
- powiadomienia lokalne działają tylko na tym urządzeniu,
- nie są klasycznym push z serwera,
- do wspólnej komunikacji służy komunikat startowy + synchronizacja online.

## 5. Jak założyć projekt w Supabase
1. Wejdź do Supabase i zaloguj się.
2. Kliknij **New project**.
3. Podaj nazwę projektu, np. `ratownik-plk`.
4. Ustaw hasło do bazy i wybierz region.
5. Kliknij **Create new project**.

## 6. Skąd wziąć supabaseUrl i supabaseAnonKey
1. W projekcie kliknij **Settings**.
2. Kliknij **API**.
3. Skopiuj:
   - **Project URL** → wklej do `supabaseUrl`
   - **anon public key** → wklej do `supabaseAnonKey`

## 7. Jak uzupełnić config.js
Otwórz plik `config.js` i wklej swoje dane:
```javascript
window.APP_CONFIG = {
  supabaseUrl: 'https://twoj-projekt.supabase.co',
  supabaseAnonKey: 'TU_WKLEJ_ANON_KEY',
  autoSyncDelayMs: 900,
  publicBaseUrl: ''
};
```

## 8. Jak uruchomić SQL
1. W Supabase kliknij **SQL Editor**.
2. Kliknij **New query**.
3. Otwórz plik `SUPABASE_SETUP.sql` z tej paczki.
4. Wklej jego treść do edytora.
5. Kliknij **Run**.

## 9. Jak utworzyć administratora online
1. Kliknij **Authentication**.
2. Otwórz **Users**.
3. Kliknij **Add user**.
4. Podaj adres e-mail i hasło administratora.
5. Zapisz.

## 10. Jak wrzucić aplikację na GitHub
1. Rozpakuj ZIP.
2. Uzupełnij `config.js`.
3. Otwórz swoje repozytorium GitHub.
4. Kliknij **Add file** → **Upload files**.
5. Wgraj cały komplet plików z folderu aplikacji.
6. Kliknij **Commit changes**.

## 11. Jak włączyć GitHub Pages
1. Wejdź do repozytorium GitHub.
2. Kliknij **Settings**.
3. Kliknij **Pages**.
4. Ustaw:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/root`
5. Zapisz.

## 12. Pierwsze uruchomienie po publikacji
1. Otwórz stronę z GitHub Pages.
2. Na komputerze zrób `Ctrl + F5`.
3. Na telefonie najlepiej usuń starą PWA i dodaj aplikację ponownie.
4. Wejdź do panelu administratora.
5. Zaloguj administratora online.
6. Kliknij „Pobierz dane online”.
7. Następnie kliknij „Synchronizuj”, gdy wprowadzisz pierwsze zmiany.

## 13. Test działania
1. Dodaj nowego ratownika, AED albo apteczkę.
2. Kliknij „Synchronizuj”.
3. Otwórz aplikację na drugim urządzeniu.
4. Sprawdź, czy dane pojawiły się automatycznie.
5. Dodaj komunikat startowy i sprawdź banner oraz lokalną notyfikację.

## 14. Najczęstsze problemy
### Nie działa logowanie online
- sprawdź, czy użytkownik istnieje w Authentication > Users,
- sprawdź e-mail i hasło,
- sprawdź, czy `config.js` jest poprawnie uzupełniony.

### Nie działa synchronizacja
- sprawdź, czy wykonano `SUPABASE_SETUP.sql`,
- sprawdź, czy w `config.js` nie ma placeholderów,
- sprawdź, czy administrator jest zalogowany online.

### Nie działają powiadomienia
- aplikacja musi działać przez HTTPS lub jako PWA,
- użytkownik musi wyrazić zgodę,
- jeśli zgoda została wcześniej zablokowana, trzeba ją odblokować w ustawieniach przeglądarki.
