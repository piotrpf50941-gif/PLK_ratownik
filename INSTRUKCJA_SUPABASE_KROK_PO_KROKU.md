# PKP PLK Ratownik v15 – uruchomienie wspólnych danych online

Ten pakiet został przygotowany tak, aby:
- aplikacja zawsze startowała od ekranu startowego,
- dane mogły być wspólne dla wszystkich telefonów i komputerów,
- administrator po zalogowaniu online mógł dodawać ratowników, AED, apteczki, tematy i algorytmy,
- wszystkie urządzenia pobierały zmiany automatycznie z Supabase.

## 1. Co jest już przygotowane w tej wersji

W paczce są już gotowe:
- `app.js` – dopisane pobieranie danych online, autosynchronizacja i realtime,
- `config.js` – miejsce na dane połączenia do Supabase,
- `sw.js` – odświeżony service worker z nową wersją cache,
- `SUPABASE_SETUP.sql` – gotowy skrypt tworzący tabele i polityki,
- panel administratora z sekcją logowania online.

## 2. Co trzeba zrobić po kolei

### Krok 1 – załóż projekt w Supabase
1. Wejdź do Supabase.
2. Utwórz nowy projekt.
3. Poczekaj aż projekt będzie gotowy.

### Krok 2 – utwórz tabele i polityki
1. W projekcie wejdź do **SQL Editor**.
2. Otwórz plik `SUPABASE_SETUP.sql`.
3. Wklej całość do SQL Editor.
4. Uruchom cały skrypt.

Jeśli projekt Supabase był utworzony wcześniej dla starszej wersji aplikacji, uruchom ten sam plik ponownie.
Skrypt zawiera także polecenia `alter table ... add column if not exists`, więc uzupełni brakujące kolumny bez niszczenia danych.

Efekt:
- powstaną tabele `rescuers`, `aeds`, `kits`, `topics`, `algorithms`,
- odczyt będzie dostępny dla wszystkich użytkowników aplikacji,
- zapis, edycja i usuwanie będą dostępne tylko dla zalogowanego administratora online,
- włączony będzie realtime dla wszystkich tych tabel.

### Krok 3 – utwórz konto administratora online
1. W Supabase wejdź w **Authentication**.
2. Dodaj użytkownika administratora, np. `admin@twojadomena.pl`.
3. Ustaw mu hasło.
4. Zapisz te dane – będą potrzebne w panelu administratora aplikacji.

### Krok 4 – pobierz dane połączenia
1. W Supabase wejdź w **Project Settings**.
2. Odszukaj:
   - **Project URL**
   - **anon public key**
3. Skopiuj te dwie wartości.

### Krok 5 – uzupełnij `config.js`
Otwórz plik `config.js` i wpisz swoje dane:

```javascript
window.APP_CONFIG = {
  supabaseUrl: "TU_WKLEJ_PROJECT_URL",
  supabaseAnonKey: "TU_WKLEJ_ANON_KEY",
  autoSyncDelayMs: 900
};
```

### Krok 6 – wgraj pliki na GitHub
1. Podmień pliki w repozytorium GitHub na nowe z tej paczki.
2. Wypchnij zmiany do repo.
3. Poczekaj aż GitHub Pages opublikuje nową wersję.

## 3. Jak uruchomić pierwszą synchronizację

1. Otwórz aplikację w przeglądarce.
2. Wejdź do **Panel administratora**.
3. W sekcji **Połączenie online i administrator Supabase** wpisz:
   - email administratora online,
   - hasło administratora online.
4. Kliknij **Zaloguj online**.
5. Kliknij **Synchronizuj**.

To wrzuci bieżące dane z aplikacji do Supabase.

## 4. Jak to działa potem

Po pierwszym uruchomieniu:
- zwykły użytkownik tylko otwiera aplikację i widzi wspólne dane,
- administrator loguje się online i zapisuje zmiany,
- aplikacja zapisuje zmiany lokalnie i automatycznie wysyła je do Supabase,
- pozostałe telefony i komputery pobiorą świeże dane automatycznie.

## 5. Najważniejsze zasady pracy

### Zwykły użytkownik
- nie musi się logować,
- może korzystać z aplikacji i czytać dane,
- przy starcie pobierze aktualną wersję danych z bazy.

### Administrator
- odblokowuje panel lokalnym hasłem aplikacji,
- dodatkowo loguje się online kontem Supabase,
- dopiero wtedy zapis idzie do wspólnej bazy.

## 6. Co zostało poprawione względem poprzedniej wersji

1. Aplikacja została ustawiona tak, aby po starcie pokazywał się ekran startowy.
2. Zostało dodane pobieranie danych online przy uruchomieniu.
3. Została dodana automatyczna synchronizacja po zmianach.
4. Został dodany realtime – zmiany mogą pojawić się na innych urządzeniach bez ponownej instalacji.
5. Service worker dostał nową wersję cache, żeby łatwiej odświeżać aplikację po publikacji.

## 7. Co zrobić, gdy stare telefony nadal widzą starą wersję

Na telefonie:
1. otwórz aplikację z internetu jeszcze raz,
2. odśwież stronę 2–3 razy,
3. zamknij aplikację całkowicie,
4. uruchom ponownie,
5. jeśli trzeba – odinstaluj starą PWA i zainstaluj ponownie.

## 8. Ważna uwaga bezpieczeństwa

W tej wersji:
- odczyt jest publiczny,
- zapis jest tylko dla zalogowanego administratora Supabase.

To jest poprawniejsze i bezpieczniejsze niż trzymanie wspólnego hasła w samym JavaScript.

## 9. Najkrótsza ścieżka wdrożenia

1. Supabase – nowy projekt.
2. SQL Editor – uruchom `SUPABASE_SETUP.sql`.
3. Authentication – dodaj administratora.
4. `config.js` – wpisz URL i anon key.
5. GitHub – wgraj nowe pliki.
6. Otwórz aplikację.
7. Zaloguj administratora online.
8. Kliknij **Synchronizuj**.

Od tego momentu aplikacja będzie mogła działać jako wspólna baza ratowników i procedur na wszystkich urządzeniach.


## Ważne po aktualizacji aplikacji
Jeżeli telefon miał wcześniej zainstalowaną starą wersję PWA, zrób twarde odświeżenie strony albo usuń skrót/aplikację i zainstaluj ją ponownie. To czyści stary cache service workera.
