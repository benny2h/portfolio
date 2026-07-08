import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { SportsEnum, MODES, MAX_MATCHDAY, ALLOWED_PROFESSIONAL_SHORTCUTS } from './sportScoringConfig';
import { Tabelle, Spiele, Torjaeger } from './sportScoringView';

const LEAGUES_CACHE_KEY = 'sport_scoring_leagues';

const selectClasses = 'cursor-pointer rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-neutral-300 outline-none transition-colors hover:border-neutral-500 focus:border-accent';

export default function SportScorings() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    return (
        <div className="relative flex h-screen overflow-hidden bg-[#000000] font-['DM_Sans',_system-ui,_sans-serif] text-white">
            <div className="pointer-events-none absolute -right-32 -top-32 z-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(230,165,88,0.10)_0%,transparent_70%)]" />
            <div className="pointer-events-none absolute -bottom-40 -left-32 z-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(230,165,88,0.06)_0%,transparent_70%)]" />

            {/* ═══ MOBILE BACKDROP ═══ */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* ═══ SIDEBAR ═══ */}
            <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-white/[0.06] bg-[#0a0a0a] transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
                    <button
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] text-accent transition-colors hover:bg-accent/10"
                        onClick={() => navigate('/')}
                        title="Zurück"
                    >
                        ←
                    </button>
                    <div className="min-w-0">
                        <p className="m-0 truncate text-sm font-bold tracking-tight text-white">Sport Scorings</p>
                        <p className="m-0 truncate font-mono text-[10px] uppercase tracking-wider text-neutral-600">OpenLigaDB</p>
                    </div>
                    <button
                        className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-white/[0.06] lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                {leaguesLoading ? (
                    <div className="flex flex-1 items-center justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/[0.06] border-t-accent" />
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col overflow-y-auto px-5 py-5">
                        <p className="m-0 mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-600">Sportart</p>
                        <nav className="mb-6 flex flex-wrap gap-1.5">
                            {Object.values(SportsEnum).map(sport => (
                                <button
                                    key={sport}
                                    className={`rounded-full px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider transition-colors ${
                                        selectedSport === sport
                                            ? 'bg-accent/15 text-accent'
                                            : 'text-neutral-500 hover:bg-white/[0.06] hover:text-neutral-300'
                                    }`}
                                    onClick={() => handleSportChange(sport)}
                                >
                                    {sport}
                                </button>
                            ))}
                        </nav>

                        {availableSeasons.length > 0 && (
                            <>
                                <p className="m-0 mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-600">Saison</p>
                                <select
                                    className={`${selectClasses} mb-6 w-full`}
                                    value={selectedSeason}
                                    onChange={e => { setSelectedSeason(e.target.value); setData(null); }}
                                >
                                    {availableSeasons.map(s => (
                                        <option key={s} value={s}>{seasonLabel(s)}</option>
                                    ))}
                                </select>
                            </>
                        )}

                        {filteredLeagues.length > 0 && (
                            <>
                                <p className="m-0 mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-600">Wettbewerb</p>
                                <div className="flex flex-col gap-1">
                                    {filteredLeagues.map(l => (
                                        <button
                                            key={l.leagueId}
                                            className={`truncate rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors ${
                                                selectedLeague?.leagueId === l.leagueId
                                                    ? 'bg-accent/10 text-accent'
                                                    : 'text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200'
                                            }`}
                                            onClick={() => { handleLeagueChange(l.leagueId); setSidebarOpen(false); }}
                                        >
                                            {l.leagueName}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </aside>

            {/* ═══ MAIN ═══ */}
            <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">
                <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-md">
                    <div className="flex items-center gap-3 px-4 py-4 sm:px-8">
                        <button
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] text-neutral-400 transition-colors hover:bg-white/[0.06] lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                            title="Menü"
                        >
                            ☰
                        </button>
                        <div className="min-w-0 flex-1">
                            <p className="m-0 truncate text-base font-bold tracking-tight text-white sm:text-lg">
                                {leaguesLoading ? 'Lädt…' : leagueName}
                            </p>
                            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-accent">
                                <span>{selectedSport}</span>
                                {selectedSeason && <>
                                    <span className="text-neutral-700">·</span>
                                    <span>{seasonLabel(selectedSeason)}</span>
                                </>}
                                {activeMode && <>
                                    <span className="text-neutral-700">·</span>
                                    <span>{activeMode.label}</span>
                                </>}
                            </div>
                        </div>
                    </div>

                    {/* Mode segmented control */}
                    <nav className="flex gap-1.5 overflow-x-auto px-4 pb-4 sm:px-8">
                        {MODES.map(m => (
                            <button
                                key={m.id}
                                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                                    mode === m.id
                                        ? 'bg-accent text-[#0a0a0a]'
                                        : 'bg-white/[0.04] text-neutral-400 hover:bg-white/[0.08] hover:text-neutral-200'
                                }`}
                                disabled={!selectedLeague}
                                onClick={() => handleModeChange(m.id)}
                            >
                                <span className="mr-1.5">{m.icon}</span>{m.label}
                            </button>
                        ))}
                    </nav>
                </header>

                {/* ═══ SUB-BAR (spieltag / team) ═══ */}
                {selectedLeague && (mode === 'spieltag' || mode === 'team') && (
                    <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.06] bg-[#000000]/90 px-4 py-3 backdrop-blur-md sm:px-8">
                        {mode === 'spieltag' && (
                            <select className={selectClasses} value={matchday} onChange={e => setMatchday(Number(e.target.value))}>
                                {Array.from({ length: MAX_MATCHDAY }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}. Spieltag</option>
                                ))}
                            </select>
                        )}
                        {mode === 'team' && (
                            <div className="flex items-center gap-2">
                                <input
                                    className="rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-white outline-none transition-colors focus:border-accent"
                                    type="text"
                                    placeholder="Teamname…"
                                    value={teamSearch}
                                    onChange={e => setTeamSearch(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && fetchData()}
                                />
                                <button
                                    className="rounded-lg border border-accent bg-accent/10 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-accent transition-colors hover:bg-accent/20"
                                    onClick={() => fetchData()}
                                >
                                    Suchen
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* ═══ EMPTY / LOADING / ERROR ═══ */}
                {!selectedLeague && !leaguesLoading && (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-20">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#0a0a0a] text-3xl opacity-40">⚽</div>
                        <p className="m-0 text-base font-medium text-neutral-600">Keine aktive Liga in der Whitelist konfiguriert</p>
                    </div>
                )}
                {loading && (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/[0.06] border-t-accent" />
                        <p className="m-0 font-mono text-xs uppercase tracking-wider text-neutral-600">Lädt Daten…</p>
                    </div>
                )}
                {error && (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-20">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/[0.06] text-2xl">⚠️</div>
                        <p className="m-0 text-sm font-medium text-red-400">{error}</p>
                    </div>
                )}

                {/* ═══ CONTENT ═══ */}
                {!loading && !error && data && (
                    <div className="flex flex-1 flex-col overflow-y-auto p-4 sm:p-8">
                        <div className="mx-auto w-full max-w-4xl">
                            {mode === 'tabelle'   && <Tabelle  data={data} />}
                            {mode === 'spieltag'  && <Spiele   data={data} />}
                            {mode === 'torjaeger' && <Torjaeger data={data} />}
                            {mode === 'team'      && <Spiele   data={data} />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
