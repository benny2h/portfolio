import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { SportsEnum, MODES, MAX_MATCHDAY, ALLOWED_PROFESSIONAL_SHORTCUTS } from './sportScoringConfig';
import { Tabelle, Spiele, Torjaeger } from './sportScoringView';
import './sportScorings.css';

const LEAGUES_CACHE_KEY = 'sport_scoring_leagues';

export default function SportScorings() {
    const navigate = useNavigate();

    const [allLeagues, setAllLeagues]       = useState([]);
    const [leaguesLoading, setLeaguesLoading] = useState(true);

    const [selectedSport, setSelectedSport]   = useState(SportsEnum.FUSSBALL);
    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedLeague, setSelectedLeague] = useState(null);

    const [mode, setMode]           = useState('tabelle');
    const [matchday, setMatchday]   = useState(1);
    const [teamSearch, setTeamSearch] = useState('');

    const [data, setData]     = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]   = useState(null);

    /* ── league filtering ── */
    const professionalLeaguesBySport = useMemo(() => {
        if (!selectedSport) return [];
        const allowed = ALLOWED_PROFESSIONAL_SHORTCUTS[selectedSport] || [];
        return allLeagues.filter(l => {
            const matchesSport    = l.sport.sportName.toLowerCase() === selectedSport.toLowerCase();
            const matchesShortcut = allowed.includes(l.leagueShortcut.toLowerCase());
            const name            = l.leagueName.toLowerCase();
            const isDummy         = ['brinkwerth','dummy','test','alt'].some(d => name.includes(d));
            return matchesSport && matchesShortcut && !isDummy;
        });
    }, [allLeagues, selectedSport]);

    const availableSeasons = useMemo(() => {
        const seasons = professionalLeaguesBySport.map(l => l.leagueSeason);
        return [...new Set(seasons)].sort((a, b) => Number(b) - Number(a));
    }, [professionalLeaguesBySport]);

    const filteredLeagues = useMemo(() => {
        if (!selectedSeason) return [];
        return professionalLeaguesBySport
            .filter(l => l.leagueSeason === selectedSeason)
            .sort((a, b) => a.leagueName.localeCompare(b.leagueName));
    }, [professionalLeaguesBySport, selectedSeason]);

    /* ── data fetching ── */
    useEffect(() => {
        const cached = sessionStorage.getItem(LEAGUES_CACHE_KEY);
        if (cached) { setAllLeagues(JSON.parse(cached)); setLeaguesLoading(false); return; }
        fetch('https://api.openligadb.de/getavailableleagues')
            .then(r => r.json())
            .then(d => { setAllLeagues(d); sessionStorage.setItem(LEAGUES_CACHE_KEY, JSON.stringify(d)); setLeaguesLoading(false); })
            .catch(() => setLeaguesLoading(false));
    }, []);

    useEffect(() => {
        if (availableSeasons.length > 0) setSelectedSeason(availableSeasons[0]);
        else setSelectedSeason('');
    }, [availableSeasons]);

    useEffect(() => {
        if (availableSeasons.length > 0 && !availableSeasons.includes(selectedSeason))
            setSelectedSeason(availableSeasons[0]);
    }, [availableSeasons, selectedSeason]);

    useEffect(() => {
        setSelectedLeague(filteredLeagues.length > 0 ? filteredLeagues[0] : null);
    }, [filteredLeagues]);

    const fetchData = useCallback(async (overrideMode, overrideTeam) => {
        if (!selectedLeague) return;
        const m    = overrideMode  ?? mode;
        const team = overrideTeam  ?? teamSearch;
        const { leagueShortcut, leagueSeason } = selectedLeague;

        setLoading(true); setError(null); setData(null);
        try {
            let url;
            if      (m === 'tabelle')   url = `https://api.openligadb.de/getbltable/${leagueShortcut}/${leagueSeason}`;
            else if (m === 'spieltag')  url = `https://api.openligadb.de/getmatchdata/${leagueShortcut}/${leagueSeason}/${matchday}`;
            else if (m === 'torjaeger') url = `https://api.openligadb.de/getgoalgetters/${leagueShortcut}/${leagueSeason}`;
            else if (m === 'team')      url = `https://api.openligadb.de/getmatchdata/${leagueShortcut}/${leagueSeason}/${encodeURIComponent(team)}`;
            const res = await fetch(url);
            setData(await res.json());
        } catch {
            setError('Daten konnten nicht geladen werden.');
        } finally {
            setLoading(false);
        }
    }, [selectedLeague, mode, matchday, teamSearch]);

    useEffect(() => { if (selectedLeague) fetchData(); }, [fetchData, selectedLeague, mode, matchday]);

    /* ── helpers ── */
    const handleSportChange = (sport) => { setSelectedSport(sport); setData(null); };
    const handleModeChange  = (id)    => { setMode(id); setData(null); };
    const handleLeagueChange = (id)   => {
        const l = filteredLeagues.find(l => l.leagueId === Number(id));
        setSelectedLeague(l || null); setData(null);
    };

    const seasonLabel = (s) => `${s}/${String(Number(s) + 1).slice(-2)}`;

    /* ── derived display info ── */
    const leagueName   = selectedLeague?.leagueName  ?? '—';
    const activeMode   = MODES.find(m => m.id === mode);

    /* ── split-pane layout: spieltag shows two panes, rest single ── */
    const isSplit = mode === 'spieltag';

    return (
        <div className="root">

            {/* ═══ HERO HEADER ═══ */}
            <header className="hero-header">

                {/* Left: back + league identity */}
                <div className="hero-identity">
                    <button className="back-btn" onClick={() => navigate('/')} title="Zurück">←</button>
                    <span>Test</span>
                    <div className="hero-text">
                        <p className="hero-league-name">{leaguesLoading ? 'Lädt…' : leagueName}</p>
                        <div className="hero-meta">
                            <span>{selectedSport}</span>
                            {selectedSeason && <>
                                <span className="hero-meta-sep">·</span>
                                <span>{seasonLabel(selectedSeason)}</span>
                            </>}
                            {activeMode && <>
                                <span className="hero-meta-sep">·</span>
                                <span>{activeMode.label}</span>
                            </>}
                        </div>
                    </div>
                </div>

                {/* Center: sport tabs */}
                {!leaguesLoading && (
                    <nav className="hero-sport-tabs">
                        {Object.values(SportsEnum).map(sport => (
                            <button
                                key={sport}
                                className={`sport-tab${selectedSport === sport ? ' active' : ''}`}
                                onClick={() => handleSportChange(sport)}
                            >
                                {sport}
                            </button>
                        ))}
                    </nav>
                )}

                {/* Right: dropdowns + mode tabs */}
                <div className="hero-controls">
                    {!leaguesLoading && (
                        <div className="hero-dropdowns">
                            {availableSeasons.length > 0 && (
                                <select
                                    className="select-compact"
                                    value={selectedSeason}
                                    onChange={e => { setSelectedSeason(e.target.value); setData(null); }}
                                >
                                    {availableSeasons.map(s => (
                                        <option key={s} value={s}>{seasonLabel(s)}</option>
                                    ))}
                                </select>
                            )}
                            {filteredLeagues.length > 0 && (
                                <select
                                    className="select"
                                    value={selectedLeague?.leagueId ?? ''}
                                    onChange={e => handleLeagueChange(e.target.value)}
                                >
                                    {filteredLeagues.map(l => (
                                        <option key={l.leagueId} value={l.leagueId}>{l.leagueName}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}

                    <nav className="mode-tabs">
                        {MODES.map(m => (
                            <button
                                key={m.id}
                                className={`mode-tab${mode === m.id ? ' active' : ''}`}
                                disabled={!selectedLeague}
                                onClick={() => handleModeChange(m.id)}
                            >
                                {m.icon} {m.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            {/* ═══ SUB-BAR (spieltag / team) ═══ */}
            {selectedLeague && (mode === 'spieltag' || mode === 'team') && (
                <div className="sub-bar">
                    {mode === 'spieltag' && (
                        <select className="select" value={matchday} onChange={e => setMatchday(Number(e.target.value))}>
                            {Array.from({ length: MAX_MATCHDAY }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}. Spieltag</option>
                            ))}
                        </select>
                    )}
                    {mode === 'team' && (
                        <div className="team-search-row">
                            <input
                                className="input"
                                type="text"
                                placeholder="Teamname…"
                                value={teamSearch}
                                onChange={e => setTeamSearch(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && fetchData()}
                            />
                            <button className="fetch-btn" onClick={() => fetchData()}>Suchen</button>
                        </div>
                    )}
                </div>
            )}

            {/* ═══ EMPTY / LOADING / ERROR ═══ */}
            {!selectedLeague && !leaguesLoading && (
                <div className="empty-state">
                    <div className="empty-icon">⚽</div>
                    <p className="empty-title">Keine aktive Liga in der Whitelist konfiguriert</p>
                </div>
            )}
            {loading && <p className="loading-msg">Lädt Daten…</p>}
            {error   && <p className="error-msg">{error}</p>}

            {/* ═══ CONTENT ═══ */}
            {!loading && !error && data && (
                <>
                    {isSplit ? (
                        /* Spieltag: two-pane split */
                        <div className="content-split">
                            <div className="split-pane">
                                <div className="pane-header">
                                    <p className="pane-title">Spielpaarungen</p>
                                    <span className="pane-badge">{matchday}. Spieltag</span>
                                </div>
                                <div className="pane-body">
                                    <Spiele data={data} />
                                </div>
                            </div>
                            <div className="split-pane">
                                <div className="pane-header">
                                    <p className="pane-title">Ergebnisse</p>
                                </div>
                                <div className="pane-body">
                                    <Spiele data={data} scoresOnly />
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* All other modes: full-width */
                        <div className="content-full">
                            {mode === 'tabelle'   && <Tabelle  data={data} />}
                            {mode === 'torjaeger' && <Torjaeger data={data} />}
                            {mode === 'team'      && <Spiele   data={data} />}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}