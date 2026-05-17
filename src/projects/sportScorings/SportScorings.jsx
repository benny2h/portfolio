import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo } from 'react';
import {SportsEnum, MODES, MAX_MATCHDAY, ALLOWED_PROFESSIONAL_SHORTCUTS} from './SportScoringConfig';
import { s } from './SportScoringStyles';
import { Tabelle, Spiele, Torjaeger } from './SportScoringView';

function SportScorings() {
    const navigate = useNavigate();

    const [allLeagues, setAllLeagues] = useState([]);
    const [leaguesLoading, setLeaguesLoading] = useState(true);

    // Whitelist State-Picker
    const [selectedSport, setSelectedSport] = useState(SportsEnum.FUSSBALL);
    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedLeague, setSelectedLeague] = useState(null);

    // Data Modifier
    const [mode, setMode] = useState('tabelle');
    const [matchday, setMatchday] = useState(1);
    const [teamSearch, setTeamSearch] = useState('');

    // Query Results
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. Filtert ALLE Profiligen für die gewählte Sportart heraus (unabhängig vom Jahr)
    const professionalLeaguesBySport = useMemo(() => {
        if (!selectedSport) return [];
        const allowedShortcuts = ALLOWED_PROFESSIONAL_SHORTCUTS[selectedSport] || [];

        return allLeagues.filter(league => {
            const matchesSport = league.sport.sportName.toLowerCase() === selectedSport.toLowerCase();
            const matchesShortcut = allowedShortcuts.includes(league.leagueShortcut.toLowerCase());

            // Blockiert Community-Dummies ("Brinkwerth", "alt", "Test", "Dummy")
            const name = league.leagueName.toLowerCase();
            const isDummy = name.includes('brinkwerth') ||
                name.includes('dummy') ||
                name.includes('test') ||
                name.includes('alt');

            return matchesSport && matchesShortcut && !isDummy;
        });
    }, [allLeagues, selectedSport]);

// 2. Extrahiert dynamisch alle vorhandenen Jahre aus den verbleibenden Profiligen
    const availableSeasons = useMemo(() => {
        const seasons = professionalLeaguesBySport.map(l => l.leagueSeason);
        // Nur einzigartige Jahre, sortiert vom neuesten zum ältesten (z.B. 2026, 2025... 2002)
        return [...new Set(seasons)].sort((a, b) => Number(b) - Number(a));
    }, [professionalLeaguesBySport]);

    // API Call beim Mounten
    useEffect(() => {
        fetch('https://api.openligadb.de/getavailableleagues')
            .then(res => res.json())
            .then(leaguesData => {
                setAllLeagues(leaguesData);
                setLeaguesLoading(false);
            })
            .catch(() => setLeaguesLoading(false));
    }, []);

    // Setze Fallback-Saison bei Wechsel der Sportart
    useEffect(() => {
        if (availableSeasons.length > 0) {
            setSelectedSeason(availableSeasons[0]);
        } else {
            setSelectedSeason('');
        }
    }, [availableSeasons]);

// 3. Setzt die aktive Saison auf das neueste verfügbare Jahr, falls die gewählte Saison ungültig wird
    useEffect(() => {
        if (availableSeasons.length > 0 && !availableSeasons.includes(selectedSeason)) {
            setSelectedSeason(availableSeasons[0]);
        }
    }, [availableSeasons, selectedSeason]);

// 4. Gibt die Ligen für das aktuell ausgewählte Jahr im Dropdown aus
    const filteredLeagues = useMemo(() => {
        if (!selectedSeason) return [];
        return professionalLeaguesBySport
            .filter(l => l.leagueSeason === selectedSeason)
            .sort((a, b) => a.leagueName.localeCompare(b.leagueName));
    }, [professionalLeaguesBySport, selectedSeason]);

    // Setze erste gematchte Liga aktiv bei Filteränderung
    useEffect(() => {
        if (filteredLeagues.length > 0) {
            setSelectedLeague(filteredLeagues[0]);
        } else {
            setSelectedLeague(null);
        }
    }, [filteredLeagues]);

    const handleLeagueChange = (leagueId) => {
        const league = filteredLeagues.find(l => l.leagueId === Number(leagueId));
        setSelectedLeague(league || null);
        setData(null);
    };

    const fetchData = useCallback(async (overrideMode, overrideTeam) => {
        if (!selectedLeague) return;
        const currentMode = overrideMode ?? mode;
        const currentTeam = overrideTeam ?? teamSearch;
        const { leagueShortcut, leagueSeason } = selectedLeague;

        setLoading(true); setError(null); setData(null);
        try {
            let url;
            if (currentMode === 'tabelle') url = `https://api.openligadb.de/getbltable/${leagueShortcut}/${leagueSeason}`;
            else if (currentMode === 'spieltag') url = `https://api.openligadb.de/getmatchdata/${leagueShortcut}/${leagueSeason}/${matchday}`;
            else if (currentMode === 'torjaeger') url = `https://api.openligadb.de/getgoalgetters/${leagueShortcut}/${leagueSeason}`;
            else if (currentMode === 'team') url = `https://api.openligadb.de/getmatchdata/${leagueShortcut}/${leagueSeason}/${encodeURIComponent(currentTeam)}`;

            const response = await fetch(url);
            setData(await response.json());
        } catch {
            setError('Daten konnten nicht geladen werden.');
        } finally {
            setLoading(false);
        }
    }, [selectedLeague, mode, matchday, teamSearch]);

    useEffect(() => { if (selectedLeague) fetchData(); }, [fetchData, selectedLeague, mode, matchday]);

    return (
        <div style={s.root}>
            <aside style={s.sidebar}>
                <button style={s.backBtn} onClick={() => navigate('/')}>
                    <span style={s.backArrow}>←</span>
                    <span>Zurück zum Portfolio</span>
                </button>
                <div style={s.sidebarDivider} />
                <div style={s.sideSection}>
                    <p style={s.sideSectionLabel}>Ansichten</p>
                    <div style={s.sideSectionItems}>
                        {MODES.map(m => (
                            <button
                                key={m.id}
                                style={{ ...s.sideItem, ...(mode === m.id ? s.sideItemActive : {}) }}
                                disabled={!selectedLeague}
                                onClick={() => { setMode(m.id); setData(null); }}
                            >
                                <span style={s.sideItemLabel}>{m.icon}  {m.label}</span>
                                {mode === m.id && <span style={s.sideItemDot} />}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            <main style={s.main}>
                <div style={s.controlBar}>
                    {leaguesLoading ? (
                        <span style={s.loadingMsg}>Konfiguration wird geladen...</span>
                    ) : (
                        <>
                            <div style={s.sportsTabs}>
                                {Object.values(SportsEnum).map(sportName => (
                                    <button
                                        key={sportName}
                                        style={{ ...s.tabButton, ...(selectedSport === sportName ? s.tabButtonActive : {}) }}
                                        onClick={() => { setSelectedSport(sportName); setData(null); }}
                                    >
                                        {sportName}
                                    </button>
                                ))}
                            </div>

                            <div style={s.dropdownGroup}>
                                {availableSeasons.length > 0 && (
                                    <select
                                        style={s.selectCompact}
                                        value={selectedSeason}
                                        onChange={e => { setSelectedSeason(e.target.value); setData(null); }}
                                    >
                                        {availableSeasons.map(season => (
                                            <option key={season} value={season}>{season}/{String(Number(season) + 1).slice(-2)}</option>
                                        ))}
                                    </select>
                                )}

                                {filteredLeagues.length > 0 && (
                                    <select
                                        style={s.select}
                                        value={selectedLeague?.leagueId || ''}
                                        onChange={e => handleLeagueChange(e.target.value)}
                                    >
                                        {filteredLeagues.map(l => (
                                            <option key={l.leagueId} value={l.leagueId}>{l.leagueName}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {selectedLeague && (mode === 'spieltag' || mode === 'team') && (
                    <div style={s.subBar}>
                        {mode === 'spieltag' && (
                            <select style={s.select} value={matchday} onChange={e => setMatchday(Number(e.target.value))}>
                                {Array.from({ length: MAX_MATCHDAY }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}. Spieltag</option>
                                ))}
                            </select>
                        )}
                        {mode === 'team' && (
                            <div style={s.teamSearchRow}>
                                <input
                                    style={s.input}
                                    type="text"
                                    placeholder="Teamname…"
                                    value={teamSearch}
                                    onChange={e => setTeamSearch(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && fetchData()}
                                />
                                <button style={s.fetchBtn} onClick={() => fetchData()}>Suchen</button>
                            </div>
                        )}
                    </div>
                )}

                {!selectedLeague && !loading && (
                    <div style={s.emptyState}>
                        <div style={s.emptyIcon}>⚽</div>
                        <p style={s.emptyTitle}>Keine aktive Liga in der Whitelist konfiguriert</p>
                    </div>
                )}

                {loading && <p style={s.loadingMsg}>Lädt Daten…</p>}
                {error && <p style={s.errorMsg}>{error}</p>}

                {!loading && !error && data && (
                    <div style={s.dataWrap}>
                        {mode === 'tabelle' && <Tabelle data={data} />}
                        {mode === 'spieltag' && <Spiele data={data} />}
                        {mode === 'team' && <Spiele data={data} />}
                        {mode === 'torjaeger' && <Torjaeger data={data} />}
                    </div>
                )}
            </main>
        </div>
    );
}

export default SportScorings;