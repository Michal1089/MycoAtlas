export type Lang = 'pl' | 'en';

export const MONTHS: Record<Lang, string[]> = {
  pl: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export const MONTHS_FULL: Record<Lang, string[]> = {
  pl: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

export const STRINGS: Record<Lang, Record<string, string>> = {
  pl: {
    appName: 'MycoAtlas', home: 'Atlas', search: 'Szukaj', saved: 'Zebrane', profile: 'Profil',
    greet1: 'Dzień dobry,', greet2: 'grzybiarzu',
    tileEdible: 'Jadalnych\ngatunków', tileSeason: 'W sezonie\nteraz',
    tileSaved: 'Zapisanych\ngatunków', tileSavedEdible: 'Jadalnych\nz nich',
    allMushrooms: 'Wszystkie grzyby', seeAll: 'Zobacz wszystkie',
    inSeasonNow: 'Sezon trwa', offSeason: 'Poza sezonem',
    add: 'Dodaj', openDetails: 'Otwórz', cancel: 'Anuluj', back: 'Wstecz',
    searchPlaceholder: 'Szukaj grzyba…', all: 'Wszystkie', allShort: 'Wsz', allMonths: 'Wszystkie miesiące',
    edible: 'Jadalny', inedible: 'Niejadalny', deadly: 'Śmiertelnie trujący',
    coniferous: 'Las iglasty', deciduous: 'Las liściasty', mixed: 'Las mieszany', meadow: 'Łąka',
    results: 'Wyniki', clear: 'Wyczyść filtry', noResults: 'Brak wyników',
    noResultsText: 'Zmień filtry lub wyszukiwaną frazę.',
    savedTitle1: 'Twoje', savedTitle2: 'zbiory', savedHeading: 'Zebrane grzyby', savedSection: 'Zapisane',
    sort: 'Sortuj', sortRecent: 'ostatnie', sortAz: 'A–Z',
    savedEmptyTitle: 'Nic jeszcze nie zebrano',
    savedEmptyText: 'Otwórz grzyba i dotknij przycisku „Dodaj do zebranych".',
    profileTitle1: 'Profil', profileTitle2: 'ustawienia',
    language: 'Język', theme: 'Motyw', themeLight: 'Jasny', themeDark: 'Ciemny', themeSystem: 'Systemowy',
    documents: 'Dokumenty', privacy: 'Polityka Prywatności', terms: 'Regulamin Aplikacji', licenses: 'Prawa autorskie i licencje',
    details: 'Szczegóły', about: 'Opis', habitat: 'Siedlisko', season: 'Sezon',
    monthsShort: 'mies.', save: 'Dodaj do zebranych', remove: 'Usuń z zebranych',
    warning: 'Atlas ma charakter informacyjny. Nie jedz grzybów bez oceny grzyboznawcy.',
    map: 'Mapa', mapTitle1: 'Twoje', mapTitle2: 'miejsca',
    mapHint: 'Dotknij mapy, aby oznaczyć miejsce', locate: 'Moja lokalizacja', fitAll: 'Pokaż wszystkie miejsca',
    markMe: 'Oznacz moją pozycję', newSpot: 'Nowe miejsce', whichMushroom: 'Jaki grzyb?', otherMushroom: 'Inny / nieznany',
    notePlaceholder: 'Notatka (opcjonalnie)', saveSpot: 'Zapisz miejsce', deleteSpot: 'Usuń',
    deleteSpotTitle: 'Usunąć to miejsce?', unknownMushroom: 'Nieokreślony grzyb', openMushroom: 'Otwórz grzyba',
    locationDenied: 'Brak zgody na lokalizację. Włącz ją w ustawieniach telefonu.', locationError: 'Nie udało się ustalić lokalizacji.',
    mapOfflineTitle: 'Mapa wymaga internetu', mapOfflineText: 'Kafelki mapy są pobierane z sieci. Zapisane miejsca zostają w telefonie.',
    retry: 'Spróbuj ponownie', close: 'Zamknij',
        mapSearchPlaceholder: 'Szukaj miejscowości lub adresu', enableLocation: 'Włącz lokalizację', openSettings: 'Ustawienia',
    searchNotFound: 'Nie znaleziono takiego miejsca.', searchError: 'Wyszukiwanie nie powiodło się. Sprawdź połączenie z internetem.',
    privacyText:
      'MycoAtlas nie zbiera danych osobowych. Zebrane grzyby i ustawienia (język, motyw) są zapisywane wyłącznie lokalnie na Twoim urządzeniu i nie są wysyłane na żaden serwer.\n\nAplikacja działa w pełni offline, nie używa reklam ani narzędzi analitycznych.',
    termsText:
      '1. Aplikacja ma charakter wyłącznie informacyjno-edukacyjny.\n2. Oznaczenia „jadalny" i „niejadalny" nie zastępują oceny grzyboznawcy. Autor nie ponosi odpowiedzialności za skutki spożycia grzybów.\n3. Korzystając z aplikacji, akceptujesz niniejszy regulamin.',
    licensesText:
      'Aplikacja: © Michał Brzeziak. Wszelkie prawa zastrzeżone.\n\n' +
      'Opisy gatunków: opracowanie własne na podstawie powszechnie dostępnej wiedzy mykologicznej.\n\n' +
      'Zdjęcia: Wikipedia / Wikimedia Commons. Autorzy i licencje (zdjęcia mogą być przycięte):\n' +
      '• Borowik szlachetny – George Chernilevsky, Public Domain, https://commons.wikimedia.org/wiki/File:Boletus_reticulatus_2016_G1.jpg?uselang=pl#Licencja\n' +
      '• Kania – Chrumps, Own Work, https://pl.wikipedia.org/wiki/Czubajka_kania#/media/Plik:Macrolepiota-procera.jpg\n' +
      '• Kurka – Heisenberg-pl, Own Work, https://pl.wikipedia.org/wiki/Pieprznik_jadalny#/media/Plik:Cantharellus_cibarius_20090717-02.jpg\n' +
      '• Podgrzybek brunatny – H. Krisp, Own Work, https://commons.wikimedia.org/wiki/File:Maronenr%C3%B6hling.jpg\n' +
      '• Maślak zwyczajny – Jerzy Opioła, Own Work, https://pl.wikipedia.org/wiki/Ma%C5%9Blak_zwyczajny#/media/Plik:Suillus_luteus_2.jpg\n' +
      '• Mleczaj rydz – Ericsteinert, Own Work,  https://commons.wikimedia.org/wiki/File:Lactarius_deliciosus.jpg\n' +
      '• Purchawka chropowata – Jerzy Opioła, Own Work, https://pl.wikipedia.org/wiki/Purchawka_chropowata#/media/Plik:Lycoperdon_perlatum_a3.jpg\n' +
      '• Muchomor czerwony – Onderwijsgek, Own Work, https://pl.wikipedia.org/wiki/Muchomor_czerwony#/media/Plik:Amanita_muscaria_3_vliegenzwammen_op_rij.jpg\n' +
      '• Muchomor zielonawy – Archenzo, Own Work, https://pl.wikipedia.org/wiki/Muchomor_zielonawy#/media/Plik:Amanita_phalloides_1.JPG\n' +
      '• Borowik szatański – Archenzo, Own Work, https://pl.wikipedia.org/wiki/Krwistoborowik_szata%C5%84ski#/media/Plik:Boletus_satanas.JPG\n' +
      '• Gołąbek wymiotny – Jerzy Opioła, Own Work, https://pl.wikipedia.org/wiki/Go%C5%82%C4%85bek_wymiotny#/media/Plik:Russula_emetica_G28.jpg\n' +
      'Mapa: Android – Google Maps (© Google), iOS – Apple Maps (© Apple). Wyszukiwanie miejsc korzysta z systemowego geokodera.\n\n' +
      'Biblioteki open source (licencja MIT): React Native, Expo, React Navigation, React Native Maps, React Native SVG, AsyncStorage, Expo Location. Ikony: Ionicons i Material Design Icons (w pakiecie @expo/vector-icons).',
  },
  en: {
    appName: 'MycoAtlas', home: 'Atlas', search: 'Search', saved: 'Collected', profile: 'Profile',
    greet1: 'Good morning,', greet2: 'forager',
    tileEdible: 'Edible\nspecies', tileSeason: 'In season\nnow',
    tileSaved: 'Saved\nspecies', tileSavedEdible: 'Edible\namong them',
    allMushrooms: 'All mushrooms', seeAll: 'See all',
    inSeasonNow: 'In season', offSeason: 'Off season',
    add: 'Add', openDetails: 'Open', cancel: 'Cancel', back: 'Back',
    searchPlaceholder: 'Search mushrooms…', all: 'All', allShort: 'All', allMonths: 'All months',
    edible: 'Edible', inedible: 'Inedible', deadly: 'Deadly poisonous',
    coniferous: 'Coniferous forest', deciduous: 'Deciduous forest', mixed: 'Mixed forest', meadow: 'Meadow',
    results: 'Results', clear: 'Clear filters', noResults: 'No results',
    noResultsText: 'Change the filters or the search phrase.',
    savedTitle1: 'Your', savedTitle2: 'harvest', savedHeading: 'Collected mushrooms', savedSection: 'Saved',
    sort: 'Sort', sortRecent: 'recent', sortAz: 'A–Z',
    savedEmptyTitle: 'Nothing collected yet',
    savedEmptyText: 'Open a mushroom and tap “Add to collected”.',
    profileTitle1: 'Profile', profileTitle2: 'settings',
    language: 'Language', theme: 'Theme', themeLight: 'Light', themeDark: 'Dark', themeSystem: 'System',
    documents: 'Documents', privacy: 'Privacy Policy', terms: 'Terms of Use', licenses: 'Copyright and licenses',
    details: 'Details', about: 'About', habitat: 'Habitat', season: 'Season',
    monthsShort: 'mo.', save: 'Add to collected', remove: 'Remove from collected',
    warning: 'This atlas is for information only. Do not eat mushrooms without an expert’s assessment.',
    map: 'Map', mapTitle1: 'Your', mapTitle2: 'spots',
    mapHint: 'Tap the map to mark a spot', locate: 'My location', fitAll: 'Show all spots',
    markMe: 'Mark my location', newSpot: 'New spot', whichMushroom: 'Which mushroom?', otherMushroom: 'Other / unknown',
    notePlaceholder: 'Note (optional)', saveSpot: 'Save spot', deleteSpot: 'Delete',
    deleteSpotTitle: 'Delete this spot?', unknownMushroom: 'Unknown mushroom', openMushroom: 'Open mushroom',
    locationDenied: 'Location permission denied. Enable it in phone settings.', locationError: 'Could not determine your location.',
    mapOfflineTitle: 'The map needs internet', mapOfflineText: 'Map tiles are downloaded from the network. Saved spots stay on your phone.',
    retry: 'Try again', close: 'Close',
    mapSearchPlaceholder: 'Search a town or address', enableLocation: 'Enable location', openSettings: 'Settings',
    searchNotFound: 'Place not found.', searchError: 'Search failed. Check your internet connection.',
    privacyText:
      'MycoAtlas does not collect personal data. Collected mushrooms and settings (language, theme) are stored locally on your device only and are never sent to any server.\n\nThe app works fully offline and contains no ads or analytics.',
    termsText:
      '1. The app is for information and education only.\n2. “Edible” and “inedible” labels do not replace an expert’s assessment. The author is not liable for consequences of eating mushrooms.\n3. By using the app you accept these terms.',
    licensesText:
      'App: © Michał Brzeziak. All rights reserved.\n\n' +
      'Species descriptions: original text based on common mycological knowledge.\n\n' +
      'Photos: Wikipedia / Wikimedia Commons. Authors and licenses (photos may be cropped):\n' +
      '• Porcini – George Chernilevsky, Public Domain, https://commons.wikimedia.org/wiki/File:Boletus_reticulatus_2016_G1.jpg?uselang=pl#Licencja\n' +
      '• Parasol mushroom – Chrumps, Own Work, https://pl.wikipedia.org/wiki/Czubajka_kania#/media/Plik:Macrolepiota-procera.jpg\n' +
      '• Chanterelle – Heisenberg-pl, Own Work, https://pl.wikipedia.org/wiki/Pieprznik_jadalny#/media/Plik:Cantharellus_cibarius_20090717-02.jpg\n' +
      '• Bay bolete – H. Krisp, Own Work, https://commons.wikimedia.org/wiki/File:Maronenr%C3%B6hling.jpg\n' +
      '• Slippery jack – Jerzy Opioła, Own Work, https://pl.wikipedia.org/wiki/Ma%C5%9Blak_zwyczajny#/media/Plik:Suillus_luteus_2.jpg\n' +
      '• Saffron milk cap – Ericsteinert, Own Work,  https://commons.wikimedia.org/wiki/File:Lactarius_deliciosus.jpg\n' +
      '• Common puffball – Jerzy Opioła, Own Work, https://pl.wikipedia.org/wiki/Purchawka_chropowata#/media/Plik:Lycoperdon_perlatum_a3.jpg\n' +
      '• Fly agaric – Onderwijsgek, Own Work, https://pl.wikipedia.org/wiki/Muchomor_czerwony#/media/Plik:Amanita_muscaria_3_vliegenzwammen_op_rij.jpg\n' +
      '• Death cap  – Archenzo, Own Work, https://pl.wikipedia.org/wiki/Muchomor_zielonawy#/media/Plik:Amanita_phalloides_1.JPG\n' +
      '• Devil’s bolete – Archenzo, Own Work, https://pl.wikipedia.org/wiki/Krwistoborowik_szata%C5%84ski#/media/Plik:Boletus_satanas.JPG\n' +
      '• Sickener  – Jerzy Opioła, Own Work, https://pl.wikipedia.org/wiki/Go%C5%82%C4%85bek_wymiotny#/media/Plik:Russula_emetica_G28.jpg\n' +
      'Map: Android – Google Maps (© Google), iOS – Apple Maps (© Apple). Place search uses the system geocoder.\n\n' +
      'Open source libraries (MIT license): React Native, Expo, React Navigation, React Native Maps, React Native SVG, AsyncStorage, Expo Location. Icons: Ionicons and Material Design Icons (bundled in @expo/vector-icons).',
  },
};
