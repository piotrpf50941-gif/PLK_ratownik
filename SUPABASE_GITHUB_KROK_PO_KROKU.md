# SUPABASE + GITHUB — krok po kroku

## 1. Załóż projekt w Supabase
1. Wejdź na stronę Supabase i zaloguj się.
2. Kliknij **New project**.
3. Wpisz nazwę projektu, np. `ratownik-plk`.
4. Ustaw hasło do bazy.
5. Wybierz region.
6. Kliknij **Create new project**.

## 2. Skopiuj dane API
1. W projekcie kliknij **Settings**.
2. Kliknij **API**.
3. Skopiuj:
   - **Project URL** → wklej do `supabaseUrl`
   - **anon public key** → wklej do `supabaseAnonKey`

## 3. Uzupełnij plik config.js
Otwórz `config.js` i wklej swoje dane:
```javascript
window.APP_CONFIG = {
  supabaseUrl: 'https://twoj-projekt.supabase.co',
  supabaseAnonKey: 'TU_WKLEJ_ANON_KEY',
  autoSyncDelayMs: 900,
  publicBaseUrl: ''
};
```

## 4. Utwórz tabele
1. W Supabase kliknij **SQL Editor**.
2. Kliknij **New query**.
3. Otwórz plik `SUPABASE_SETUP.sql` z paczki aplikacji.
4. Wklej jego treść do edytora.
5. Kliknij **Run**.

## 5. Dodaj administratora online
1. Wejdź w **Authentication**.
2. Otwórz **Users**.
3. Kliknij **Add user**.
4. Podaj e-mail i hasło administratora.
5. Zapisz.

## 6. Połącz z GitHub
1. Rozpakuj paczkę aplikacji.
2. Uzupełnij `config.js`.
3. Wgraj wszystkie pliki do repozytorium GitHub.
4. W repo kliknij **Settings > Pages**.
5. Ustaw:
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: /root
6. Zapisz.

## 7. Publikacja
Po każdym wgraniu zmian:
- na komputerze zrób `Ctrl + F5`
- na telefonie najlepiej usuń starą PWA i dodaj aplikację ponownie

## 8. Test działania
1. Otwórz aplikację.
2. Zaloguj się jako administrator online.
3. Dodaj ratownika lub zakład.
4. Sprawdź na drugim urządzeniu, czy dane się pojawiły.
