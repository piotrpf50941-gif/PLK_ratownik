# Supabase — ekran po ekranie

## Założenie projektu
1. Zaloguj się do Supabase.
2. Kliknij **New project**.
3. Wybierz organizację.
4. Wpisz nazwę projektu, np. `ratownik-plk`.
5. Ustaw hasło do bazy.
6. Wybierz region.
7. Kliknij **Create new project**.

## Skopiowanie danych do config.js
1. Wejdź w **Project Settings**.
2. Kliknij **API**.
3. Skopiuj **Project URL**.
4. Skopiuj **anon public key**.
5. Otwórz plik `config.js`.
6. Wklej wartości do `supabaseUrl` i `supabaseAnonKey`.

## Utworzenie tabel
1. Otwórz **SQL Editor**.
2. Kliknij **New query**.
3. Wklej zawartość `SUPABASE_SETUP.sql`.
4. Kliknij **Run**.

## Utworzenie administratora online
1. Otwórz **Authentication**.
2. Wejdź w **Users**.
3. Kliknij **Add user**.
4. Wpisz email i hasło.
5. Zapisz użytkownika.

## Włączenie realtime
1. Otwórz **Database** → **Replication / Realtime**.
2. Upewnij się, że realtime jest aktywny dla tabel:
   - `rescuers`
   - `aeds`
   - `kits`
   - `topics`
   - `algorithms`
   - `app_settings`

## Pierwsze logowanie w aplikacji
1. Wgraj pliki na GitHub Pages.
2. Otwórz aplikację.
3. Wejdź do **Panel administratora**.
4. Wpisz email i hasło administratora online.
5. Kliknij **Zaloguj online**.
6. Kliknij **Synchronizuj**.
7. Na drugim urządzeniu użyj **Pobierz dane online**.
