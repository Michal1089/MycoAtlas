# MycoAtlas – Atlas Grzybów Polskich

MycoAtlas to aplikacja mobilna stworzona w React Native i Expo, której celem jest ułatwienie poznawania grzybów występujących w Polsce. Aplikacja łączy interaktywny atlas gatunków z wyszukiwarką, osobistym rejestrem zbiorów oraz mapą umożliwiającą zapisywanie miejsc znalezienia grzybów.

Projekt został zaprojektowany z myślą o wygodnym użytkowaniu zarówno w domu, jak i podczas grzybobrania.

## Funkcjonalności

- **Atlas grzybów** – przeglądanie gatunków, zdjęć oraz informacji o poszczególnych grzybach.
- **Wyszukiwarka** – szybkie odnajdywanie wybranych gatunków.
- **Szczegóły gatunków** – dostęp do opisów i informacji o grzybach.
- **Moje zbiory** – zapisywanie i przeglądanie własnych znalezisk.
- **Interaktywna mapa** – oznaczanie lokalizacji znalezionych grzybów oraz dodawanie notatek.
- **Lokalne przechowywanie danych** – zachowywanie zapisanych informacji i ustawień na urządzeniu.
- **Tryb offline** – dostęp do atlasu i zapisanych danych bez połączenia z internetem.

## Wykorzystane technologie

| Technologia | Zastosowanie |
|---|---|
| React Native | Tworzenie aplikacji mobilnej |
| Expo | Środowisko uruchomieniowe |
| TypeScript | Typowanie kodu |
| React Navigation | Nawigacja między ekranami |
| AsyncStorage | Lokalna pamięć aplikacji |
| React Native SVG | Elementy graficzne |
| React Native WebView | Wyświetlanie mapy |
| Expo Location | Obsługa lokalizacji |
| Leaflet | Interaktywna mapa |
| OpenStreetMap / CARTO | Podkład mapowy |

## Struktura projektu

```text
MycoAtlas/
├── src/
│   ├── assets/
│   │   └── mushrooms/
│   ├── components/
│   ├── data/
│   │   ├── mushrooms.ts
│   │   └── images.ts
│   └── screens/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

## Instalacja i uruchomienie

**Wymagania:**
- Node.js (wersja LTS)
- npm
- Expo Go lub emulator Android

**1. Sklonowanie repozytorium**

```bash
git clone https://github.com/Michal1089/MycoAtlas.git
```

**2. Przejście do katalogu projektu**

```bash
cd MycoAtlas
```

**3. Instalacja zależności**

```bash
npm install
```

**4. Uruchomienie aplikacji**

```bash
npx expo start
```

Po uruchomieniu serwera należy zeskanować kod QR za pomocą aplikacji Expo Go na urządzeniu mobilnym.

## Przechowywanie danych i tryb offline

Aplikacja wykorzystuje AsyncStorage do lokalnego przechowywania danych użytkownika, takich jak zapisane zbiory i ustawienia.

Dane atlasu są dostępne lokalnie, dzięki czemu ich przeglądanie nie wymaga dostępu do internetu. Interaktywna mapa wymaga natomiast połączenia z siecią do pobierania kafelków mapowych.

## Prezentacja aplikacji

Poniżej przedstawiono najważniejsze ekrany aplikacji.

### Ekran główny
![Ekran główny](docs/screenshots/home.png)

### Atlas grzybów
![Atlas](docs/screenshots/atlas.png)

### Szczegóły gatunku
![Szczegóły gatunku](docs/screenshots/details.png)

### Interaktywna mapa
![Mapa](docs/screenshots/map.png)

## Informacje o testowaniu

| Parametr | Informacja |
|---|---|
| Główna platforma | Android |
| Środowisko testowe | Expo Go |
| Testowanie na urządzeniu fizycznym | Tak |

Aplikacja została uruchomiona i przetestowana na fizycznym urządzeniu z systemem Android przy użyciu Expo Go.

## Bezpieczeństwo

MycoAtlas ma charakter informacyjny i edukacyjny. Informacje oraz zdjęcia prezentowane w aplikacji nie zastępują konsultacji z wykwalifikowanym grzyboznawcą. Nie należy spożywać grzybów wyłącznie na podstawie informacji dostępnych w aplikacji.

## Autor

**Michał Brzeziak**
