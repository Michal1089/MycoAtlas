import { Lang } from '../i18n';

export type Habitat = 'coniferous' | 'deciduous' | 'mixed' | 'meadow';

export type Mushroom = {
  id: string;
  name: Record<Lang, string>;
  latin: string;
  edible: boolean;
  deadly?: boolean;
  habitat: Habitat[];
  season: [number, number]; 
  desc: Record<Lang, string>;
};

export const HABITATS: Habitat[] = ['coniferous', 'deciduous', 'mixed', 'meadow'];

export const MUSHROOMS: Mushroom[] = [
  { id: 'borowik-szlachetny', name: { pl: 'Borowik szlachetny (prawdziwek)', en: 'Porcini' }, latin: 'Boletus edulis', edible: true,
    habitat: ['coniferous', 'deciduous', 'mixed'], season: [6, 10],
    desc: { pl: 'Gruby, brunatny kapelusz, biała rurkowata warstwa spodnia i beczułkowaty trzon z siatką. Jeden z najbardziej cenionych grzybów kuchennych.', en: 'Thick brown cap, white pores and a barrel-shaped stem with a net pattern. One of the most prized culinary mushrooms.' } },
  { id: 'kania', name: { pl: 'Kania (czubajka kania)', en: 'Parasol mushroom' }, latin: 'Macrolepiota procera', edible: true,
    habitat: ['meadow', 'mixed'], season: [7, 10],
    desc: { pl: 'Duży grzyb o łuskowatym kapeluszu i cienkim trzonie z ruchomym pierścieniem. Smaży się go w panierce.', en: 'Large mushroom with a scaly cap and slender stem with a movable ring. Often fried in breadcrumbs.' } },
  { id: 'kurka', name: { pl: 'Kurka (pieprznik jadalny)', en: 'Chanterelle' }, latin: 'Cantharellus cibarius', edible: true,
    habitat: ['coniferous', 'deciduous', 'mixed'], season: [6, 10],
    desc: { pl: 'Żółtopomarańczowy, lejkowaty owocnik z listwami zbiegającymi na trzon. Ma owocowy zapach.', en: 'Yellow-orange funnel-shaped fruiting body with ridges running down the stem and a fruity aroma.' } },
  { id: 'podgrzybek-brunatny', name: { pl: 'Podgrzybek brunatny', en: 'Bay bolete' }, latin: 'Imleria badia', edible: true,
    habitat: ['coniferous', 'mixed'], season: [7, 11],
    desc: { pl: 'Kasztanowobrązowy kapelusz, żółtawe rurki, które po uciśnięciu sinieją. Bardzo popularny w polskich lasach.', en: 'Chestnut-brown cap with yellowish pores that turn blue when pressed. Very common in Polish forests.' } },
  { id: 'maslak-zwyczajny', name: { pl: 'Maślak zwyczajny', en: 'Slippery jack' }, latin: 'Suillus luteus', edible: true,
    habitat: ['coniferous'], season: [6, 11],
    desc: { pl: 'Śliski, brązowy kapelusz i pierścień na trzonie. Rośnie pod sosnami. Przed obróbką zdejmuje się skórkę.', en: 'Slimy brown cap and a ring on the stem. Grows under pines. Peel the skin before cooking.' } },
  { id: 'rydz', name: { pl: 'Mleczaj rydz', en: 'Saffron milk cap' }, latin: 'Lactarius deliciosus', edible: true,
    habitat: ['coniferous'], season: [8, 10],
    desc: { pl: 'Pomarańczowy grzyb z koncentrycznymi kręgami na kapeluszu i pomarańczowym mleczkiem.', en: 'Orange mushroom with concentric rings on the cap and orange latex.' } },
  { id: 'purchawka-chropowata', name: { pl: 'Purchawka chropowata', en: 'Common puffball' }, latin: 'Lycoperdon perlatum', edible: true,
    habitat: ['coniferous', 'deciduous', 'mixed', 'meadow'], season: [6, 11],
    desc: { pl: 'Biały owocnik pokryty drobnymi kolcami. Jadalna tylko, gdy miąższ jest jeszcze biały i jędrny.', en: 'White fruiting body covered in small spines. Edible only while the flesh is still white and firm.' } },
  { id: 'muchomor-czerwony', name: { pl: 'Muchomor czerwony', en: 'Fly agaric' }, latin: 'Amanita muscaria', edible: false,
    habitat: ['coniferous', 'deciduous', 'mixed'], season: [7, 11],
    desc: { pl: 'Czerwony kapelusz z białymi kropkami. Trujący, wywołuje zaburzenia żołądkowe i nerwowe.', en: 'Red cap with white spots. Poisonous, causes gastrointestinal and neurological symptoms.' } },
  { id: 'muchomor-zielonawy', name: { pl: 'Muchomor zielonawy', en: 'Death cap' }, latin: 'Amanita phalloides', edible: false, deadly: true,
    habitat: ['deciduous', 'mixed'], season: [7, 10],
    desc: { pl: 'Oliwkowozielonkawy kapelusz, białe blaszki, pierścień i bulwiasta podstawa trzonu. Śmiertelnie trujący – często mylony z jadalnymi gatunkami.', en: 'Olive-green cap, white gills, ring and a bulbous stem base. Deadly – often confused with edible species.' } },
  { id: 'borowik-szatanski', name: { pl: 'Borowik szatański', en: "Devil's bolete" }, latin: 'Rubroboletus satanas', edible: false,
    habitat: ['deciduous'], season: [6, 9],
    desc: { pl: 'Jasny kapelusz, czerwone pory i wzdęty trzon. Trujący na surowo i niedogotowany.', en: 'Pale cap, red pores and a swollen stem. Poisonous raw or undercooked.' } },
  { id: 'golabek-wymiotny', name: { pl: 'Gołąbek wymiotny', en: 'The sickener' }, latin: 'Russula emetica', edible: false,
    habitat: ['coniferous', 'mixed'], season: [7, 10],
    desc: { pl: 'Czerwony kapelusz i białe blaszki. Ostry w smaku, wywołuje wymioty.', en: 'Red cap and white gills. Acrid taste, causes vomiting.' } },
];
