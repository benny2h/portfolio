export const SportsEnum = {
    FUSSBALL: 'Fußball'
};

// Whitelist der professionellen Wettbewerbe über alle Jahre hinweg
export const ALLOWED_PROFESSIONAL_SHORTCUTS = {
    [SportsEnum.FUSSBALL]: [
        'bl1', 'bl2', 'bl3', // 1., 2. und 3. Bundesliga
        'dfb', 'dfb10', 'dfb11', 'dfb12', 'dfb2013', 'dfb2014', 'dfb2015', // DFB-Pokal-Varianten
        'cl',
        'pl', // Premier League
        'pd', // Primera Division
        'sa', // Serie A
        'wm2010', 'wm14', 'wc_2014', 'wc-2014', 'fifa2014', // Weltmeisterschaften
        'em12', 'em13', 'em-2016', 'uefa em 2016', 'fem08' // Europameisterschaften
    ],
};

export const MODES = [
    { id: 'tabelle',   label: 'Tabelle',   icon: '📊' },
    { id: 'spieltag',  label: 'Spieltag',  icon: '📅' },
    { id: 'torjaeger', label: 'Torjäger',  icon: '⚽' },
    { id: 'team',      label: 'Teamsuche', icon: '🔍' },
];

export const MAX_MATCHDAY = 34;