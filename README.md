# MycoAtlas – atlas grzybów polskich (React Native + Expo + TypeScript)

## Uruchomienie
1. Zainstaluj Node.js LTS oraz aplikację **Expo Go** na telefonie (telefon i komputer w tej samej sieci Wi‑Fi).
2. W katalogu projektu:
       rm -rf node_modules package-lock.json
       npm install
       npx expo install --check     # powinno napisać, że wersje są zgodne
       npx expo-doctor
       npx expo start -c
3. Zeskanuj kod QR w Expo Go.

## Biblioteki
react-navigation (native, bottom-tabs, native-stack), react-native-screens,
react-native-safe-area-context, react-native-svg (wykres i kółka postępu), react-native-webview (mapa), expo-location (lokalizacja),
@react-native-async-storage/async-storage, @expo/vector-icons, expo-status-bar.

## Tryb offline
Poza mapą brak zapytań sieciowych. Dane: `src/data/mushrooms.ts`. Zebrane grzyby i ustawienia: AsyncStorage.

## Zdjęcia grzybów – gdzie wpisać ścieżki
Plik: **`src/data/images.ts`**. Wrzuć zdjęcie do `src/assets/mushrooms/`, odkomentuj linię grzyba
i wpisz nazwę pliku, np.:
    'borowik-szlachetny': require('../assets/mushrooms/borowik-szlachetny.jpg'),
Zdjęcie pojawi się na listach (Atlas, Szukaj, Zebrane, Mapa) oraz na karcie grzyba (okrągłe i duże zdjęcie).

## Nowy gatunek
Dopisz obiekt w `src/data/mushrooms.ts` (typ `Mushroom` podpowie pola), a potem dodaj jego `id` w `images.ts`.

## Mapa
Zakładka „Mapa": Leaflet (open source) w WebView + kafelki OpenStreetMap w stylu CARTO (jasny/ciemny).
Dotknij mapy, aby oznaczyć miejsce, wybierz grzyba, dodaj notatkę i zapisz. Miejsca są w pamięci telefonu.
Uwaga: kafelki mapy i biblioteka Leaflet są pobierane z internetu – bez sieci mapa pokaże komunikat,
a zapisane miejsca nie znikają. Kod mapy: `src/screens/MapScreen.tsx`, `src/components/mapHtml.ts`.
Kafelki CARTO/OSM są darmowe do użytku niekomercyjnego (wymagana atrybucja – jest na mapie).

## Uwaga
Atlas ma charakter informacyjny. Nie jedz grzybów bez oceny grzyboznawcy.
