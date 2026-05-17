export const SportsEnum = {
    FUSSBALL: 'Fußball',
    HANDBALL: 'Handball'
};

// Whitelist der professionellen Wettbewerbe über alle Jahre hinweg
export const ALLOWED_PROFESSIONAL_SHORTCUTS = {
    [SportsEnum.FUSSBALL]: [
        'bl1', 'bl2', 'bl3', // 1., 2. und 3. Bundesliga
        'dfb', 'dfb10', 'dfb11', 'dfb12', 'dfb2013', 'dfb2014', 'dfb2015', // DFB-Pokal-Varianten
        'cl', 'cl1011', 'cl1112', 'cl0910', // Champions League
        'el', 'el2010', 'el2013', 'el2014', 'uefa', // Europa League / UEFA-Cup
        'pl', // Premier League
        'pd', // Primera Division
        'sa', // Serie A
        'asl', // Swiss Super League
        'öfb', 'obf', 'blat1', 'atbl1', // Österreichische Bundesliga
        'wm2010', 'wm14', 'wc_2014', 'wc-2014', 'fifa2014', // Weltmeisterschaften
        'em12', 'em13', 'em-2016', 'uefa em 2016', 'fem08' // Europameisterschaften
    ],
    [SportsEnum.HANDBALL]: [
        'hbl', 'hbl2' // 1. und 2. Handball-Bundesliga
    ]
};

export const MODES = [
    { id: 'tabelle',   label: 'Tabelle',   icon: '📊' },
    { id: 'spieltag',  label: 'Spieltag',  icon: '📅' },
    { id: 'torjaeger', label: 'Torjäger',  icon: '⚽' },
    { id: 'team',      label: 'Teamsuche', icon: '🔍' },
];

export const MAX_MATCHDAY = 34;