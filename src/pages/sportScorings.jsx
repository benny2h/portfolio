import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

const MODES = [
    { id: 'tabelle',   label: 'Tabelle',   icon: '📊' },
    { id: 'spieltag',  label: 'Spieltag',  icon: '📅' },
    { id: 'torjaeger', label: 'Torjäger',  icon: '⚽' },
    { id: 'team',      label: 'Teamsuche', icon: '🔍' },
];

const MAX_MATCHDAY = 34;

// ─── Main Component ───────────────────────────────────────────────────────────

function SportScorings() {
    const navigate = useNavigate();

    // League picker state
    const [allLeagues, setAllLeagues]         = useState([]);
    const [leaguesLoading, setLeaguesLoading] = useState(true);
    const [selectedSport, setSelectedSport]   = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedLeague, setSelectedLeague] = useState(null);

    // Data mode state
    const [mode, setMode]             = useState('tabelle');
    const [matchday, setMatchday]     = useState(1);
    const [teamSearch, setTeamSearch] = useState('Bayern');

    // Result state
    const [data, setData]       = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);

    // ── Load all leagues once ──
    useEffect(() => {
        fetch('https://api.openligadb.de/getavailableleagues')
            .then(r => r.json())
            .then(d => { setAllLeagues(d); setLeaguesLoading(false); })
            .catch(() => setLeaguesLoading(false));
    }, []);

    // ── Derived lists ──
    const sports = useMemo(() => {
        const map = {};
        allLeagues.forEach(l => {
            if (!map[l.sport.sportId]) map[l.sport.sportId] = l.sport.sportName;
        });
        return Object.entries(map)
            .map(([id, name]) => ({ id: Number(id), name }))
            .sort((a, b) => a.id - b.id);
    }, [allLeagues]);

    const seasons = useMemo(() => {
        if (!selectedSport) return [];
        const set = new Set(
            allLeagues.filter(l => l.sport.sportId === selectedSport).map(l => l.leagueSeason)
        );
        return [...set].sort((a, b) => Number(b) - Number(a));
    }, [allLeagues, selectedSport]);

    const leagues = useMemo(() => {
        if (!selectedSport || !selectedSeason) return [];
        return allLeagues
            .filter(l => l.sport.sportId === selectedSport && l.leagueSeason === selectedSeason)
            .sort((a, b) => a.leagueName.localeCompare(b.leagueName));
    }, [allLeagues, selectedSport, selectedSeason]);

    // ── Handlers ──
    const handleSportChange = (sportId) => {
        setSelectedSport(sportId); setSelectedSeason(null); setSelectedLeague(null); setData(null);
    };
    const handleSeasonChange = (season) => {
        setSelectedSeason(season); setSelectedLeague(null); setData(null);
    };
    const handleLeagueChange = (league) => {
        setSelectedLeague(league); setData(null);
    };

    // ── Fetch data ──
    const fetchData = useCallback(async (overrideMode, overrideTeam) => {
        if (!selectedLeague) return;
        const m    = overrideMode ?? mode;
        const team = overrideTeam ?? teamSearch;
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

    const sportName  = sports.find(sp => sp.id === selectedSport)?.name;
    const seasonLabel = selectedSeason
        ? `${selectedSeason}/${String(Number(selectedSeason) + 1).slice(-2)}`
        : null;

    return (
        <div style={s.root}>
            {/* ══════════════ LEFT SIDEBAR ══════════════ */}
            <aside style={s.sidebar}>
                {/* Back button */}
                <button style={s.backBtn} onClick={() => navigate('/')}>
                    <span style={s.backArrow}>←</span>
                    <span>Zurück zu all meinen Projekten</span>
                </button>

                <div style={s.sidebarDivider} />

                {leaguesLoading ? (
                    <p style={s.sideLoadingMsg}>Lädt Ligen…</p>
                ) : (
                    <>
                        {/* Sport */}
                        <SideSection label="Sportart">
                            {sports.map(sp => (
                                <SideItem
                                    key={sp.id}
                                    label={sp.name}
                                    active={selectedSport === sp.id}
                                    onClick={() => handleSportChange(sp.id)}
                                />
                            ))}
                        </SideSection>

                        {/* Season */}
                        {selectedSport && (
                            <SideSection label="Saison">
                                {seasons.map(season => (
                                    <SideItem
                                        key={season}
                                        label={`${season}/${String(Number(season) + 1).slice(-2)}`}
                                        active={selectedSeason === season}
                                        onClick={() => handleSeasonChange(season)}
                                    />
                                ))}
                            </SideSection>
                        )}

                        {/* League */}
                        {selectedSeason && (
                            <SideSection label="Liga">
                                {leagues.map(l => (
                                    <SideItem
                                        key={l.leagueId}
                                        label={l.leagueName}
                                        sublabel={l.leagueShortcut}
                                        active={selectedLeague?.leagueId === l.leagueId}
                                        onClick={() => handleLeagueChange(l)}
                                    />
                                ))}
                            </SideSection>
                        )}

                        {/* Mode */}
                        {selectedLeague && (
                            <SideSection label="Ansicht">
                                {MODES.map(m => (
                                    <SideItem
                                        key={m.id}
                                        label={`${m.icon}  ${m.label}`}
                                        active={mode === m.id}
                                        onClick={() => { setMode(m.id); setData(null); }}
                                    />
                                ))}
                            </SideSection>
                        )}
                    </>
                )}
            </aside>

            {/* ══════════════ RIGHT CONTENT ══════════════ */}
            <main style={s.main}>
                {/* Top bar */}
                <div style={s.topBar}>
                    <div style={s.breadcrumb}>
                        {sportName && <><span style={s.crumb}>{sportName}</span><span style={s.crumbSep}>/</span></>}
                        {seasonLabel && <><span style={s.crumb}>{seasonLabel}</span><span style={s.crumbSep}>/</span></>}
                        {selectedLeague && <span style={{ ...s.crumb, color: '#fff' }}>{selectedLeague.leagueName}</span>}
                    </div>

                    {/* Sub-controls (Spieltag / Team) */}
                    {selectedLeague && mode === 'spieltag' && (
                        <select
                            style={s.select}
                            value={matchday}
                            onChange={e => setMatchday(Number(e.target.value))}
                        >
                            {Array.from({ length: MAX_MATCHDAY }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}. Spieltag</option>
                            ))}
                        </select>
                    )}
                    {selectedLeague && mode === 'team' && (
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

                {/* Empty state */}
                {!selectedLeague && !loading && (
                    <div style={s.emptyState}>
                        <div style={s.emptyIcon}>⚽</div>
                        <p style={s.emptyTitle}>Wähle eine Liga aus</p>
                        <p style={s.emptySubtitle}>Sportart → Saison → Liga</p>
                    </div>
                )}

                {loading && <p style={s.loadingMsg}>Lädt…</p>}
                {error   && <p style={s.errorMsg}>{error}</p>}

                {!loading && !error && data && (
                    <div style={s.dataWrap}>
                        {mode === 'tabelle'  && <Tabelle   data={data} />}
                        {mode === 'spieltag' && <Spiele    data={Array.isArray(data) ? data : [data]} />}
                        {mode === 'team'     && <Spiele    data={Array.isArray(data) ? data : [data]} />}
                        {mode === 'torjaeger'&& <Torjaeger data={data} />}
                    </div>
                )}
            </main>
        </div>
    );
}

// ─── Sidebar helpers ──────────────────────────────────────────────────────────

function SideSection({ label, children }) {
    return (
        <div style={s.sideSection}>
            <p style={s.sideSectionLabel}>{label}</p>
            <div style={s.sideSectionItems}>{children}</div>
        </div>
    );
}

function SideItem({ label, sublabel, active, onClick }) {
    return (
        <button
            style={{ ...s.sideItem, ...(active ? s.sideItemActive : {}) }}
            onClick={onClick}
        >
            <span style={s.sideItemLabel}>{label}</span>
            {sublabel && <span style={s.sideItemSub}>{sublabel}</span>}
            {active && <span style={s.sideItemDot} />}
        </button>
    );
}

// ─── Data display components ──────────────────────────────────────────────────

function Tabelle({ data }) {
    if (!data?.length) return <p style={s.empty}>Keine Tabellendaten verfügbar.</p>;
    return (
        <table style={s.table}>
            <thead>
            <tr>
                {['#', 'Verein', 'Sp', 'S', 'U', 'N', 'Tore', 'Pkt'].map(h => (
                    <th key={h} style={{ ...s.th, textAlign: h === 'Verein' ? 'left' : 'center' }}>{h}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((team, i) => (
                <tr key={team.teamInfoId ?? i} style={i % 2 === 0 ? s.rowEven : s.rowOdd}>
                    <td style={{ ...s.td, color: '#555', fontSize: '12px' }}>{i + 1}</td>
                    <td style={s.tdTeam}>
                        <img src={team.teamIconUrl} alt="" style={s.icon}
                             onError={e => e.target.style.display = 'none'} />
                        {team.teamName}
                    </td>
                    {[team.matches, team.won, team.draw, team.lost].map((v, j) => (
                        <td key={j} style={{ ...s.td, textAlign: 'center' }}>{v}</td>
                    ))}
                    <td style={{ ...s.td, textAlign: 'center' }}>{team.goals}:{team.opponentGoals}</td>
                    <td style={{ ...s.td, textAlign: 'center' }}>
                        <strong style={{ color: '#5dcaa5' }}>{team.points}</strong>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function Spiele({ data }) {
    const matches = (Array.isArray(data) ? data : [data]).filter(m => m?.team1);
    if (!matches.length) return <p style={s.empty}>Keine Spiele gefunden.</p>;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {matches.map((m, i) => {
                const res   = m.matchResults?.find(r => r.resultTypeID === 2) ?? m.matchResults?.at(-1);
                const score = res ? `${res.pointsTeam1} : ${res.pointsTeam2}` : '– : –';
                const date  = new Date(m.matchDateTimeUTC).toLocaleDateString('de-DE', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                });
                return (
                    <div key={m.matchID ?? i} style={s.matchCard}>
                        <div style={s.matchTeams}>
                            <div style={s.matchTeam}>
                                <img src={m.team1.teamIconUrl} alt="" style={s.matchIcon}
                                     onError={e => e.target.style.display = 'none'} />
                                <span>{m.team1.teamName}</span>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={s.matchScore}>{m.matchIsFinished ? score : '– : –'}</div>
                                <span style={m.matchIsFinished ? s.badgeDone : s.badgePlan}>
                                    {m.matchIsFinished ? 'Beendet' : 'Geplant'}
                                </span>
                            </div>
                            <div style={s.matchTeam}>
                                <img src={m.team2?.teamIconUrl} alt="" style={s.matchIcon}
                                     onError={e => e.target.style.display = 'none'} />
                                <span>{m.team2?.teamName}</span>
                            </div>
                        </div>
                        <div style={s.matchMeta}>{date} · {m.group?.groupName}</div>
                    </div>
                );
            })}
        </div>
    );
}

function Torjaeger({ data }) {
    if (!data?.length) return <p style={s.empty}>Keine Torjäger-Daten verfügbar.</p>;
    const sorted = [...data].sort((a, b) => b.goalCount - a.goalCount).slice(0, 20);
    return (
        <div style={s.scorerList}>
            {sorted.map((g, i) => (
                <div key={i} style={s.scorerRow}>
                    <span style={s.scorerRank}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                        <div style={s.scorerName}>{g.goalGetterName}</div>
                        {g.teamName && <div style={s.scorerTeam}>{g.teamName}</div>}
                    </div>
                    <span style={s.scorerGoals}>{g.goalCount}</span>
                </div>
            ))}
        </div>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const SIDEBAR_W = '260px';
const ACCENT    = '#5dcaa5';
const BG        = '#0b0b15';
const SURFACE   = '#13131f';
const BORDER    = '#1e1e30';

const s = {
    // ── Layout ──
    root: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: BG,
        fontFamily: "'Geist Mono', 'SF Mono', 'Fira Code', monospace",
        color: '#ccc',
    },

    // ── Sidebar ──
    sidebar: {
        width: SIDEBAR_W,
        minWidth: SIDEBAR_W,
        maxWidth: SIDEBAR_W,
        backgroundColor: SURFACE,
        borderRight: `1px solid ${BORDER}`,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
        height: '100vh',
        padding: '0 0 40px',
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'none',
        border: 'none',
        padding: '20px 18px 16px',
        cursor: 'pointer',
        color: '#aaa',
        fontSize: '11px',
        textAlign: 'left',
        lineHeight: 1.4,
        width: '100%',
        transition: 'color 0.15s',
    },
    backArrow: {
        fontSize: '16px',
        color: ACCENT,
        flexShrink: 0,
    },
    sidebarDivider: {
        height: '1px',
        backgroundColor: BORDER,
        margin: '0 0 8px',
    },
    sideLoadingMsg: {
        fontSize: '12px',
        color: '#555',
        padding: '16px 18px',
    },
    sideSection: {
        marginBottom: '4px',
        padding: '0 0 8px',
        borderBottom: `1px solid ${BORDER}`,
    },
    sideSectionLabel: {
        fontSize: '10px',
        fontWeight: '700',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#444',
        padding: '12px 18px 6px',
        margin: 0,
    },
    sideSectionItems: {
        display: 'flex',
        flexDirection: 'column',
    },
    sideItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'none',
        border: 'none',
        padding: '7px 18px',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        position: 'relative',
        transition: 'background 0.1s',
    },
    sideItemActive: {
        backgroundColor: 'rgba(93,202,165,0.08)',
    },
    sideItemLabel: {
        fontSize: '12px',
        color: '#ddd',
        flex: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    sideItemSub: {
        fontSize: '10px',
        color: '#444',
        fontFamily: 'monospace',
        flexShrink: 0,
    },
    sideItemDot: {
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        backgroundColor: ACCENT,
        flexShrink: 0,
    },

    // ── Main panel ──
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        padding: '0',
    },
    topBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '20px 32px',
        borderBottom: `1px solid ${BORDER}`,
        backgroundColor: BG,
        position: 'sticky',
        top: 0,
        zIndex: 10,
    },
    breadcrumb: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        flexWrap: 'wrap',
    },
    crumb: {
        fontSize: '13px',
        color: '#555',
    },
    crumbSep: {
        fontSize: '13px',
        color: '#333',
    },

    // ── Sub-controls ──
    select: {
        padding: '6px 12px',
        borderRadius: '6px',
        border: `1px solid ${BORDER}`,
        background: SURFACE,
        color: '#ccc',
        fontSize: '12px',
        fontFamily: 'inherit',
    },
    teamSearchRow: {
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
    },
    input: {
        padding: '6px 12px',
        borderRadius: '6px',
        border: `1px solid ${BORDER}`,
        background: SURFACE,
        color: '#ccc',
        fontSize: '12px',
        fontFamily: 'inherit',
        width: '180px',
    },
    fetchBtn: {
        padding: '6px 14px',
        borderRadius: '6px',
        border: `1px solid ${BORDER}`,
        background: 'none',
        color: ACCENT,
        fontSize: '12px',
        fontFamily: 'inherit',
        cursor: 'pointer',
    },

    // ── Empty / loading / error ──
    emptyState: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 32px',
        gap: '12px',
    },
    emptyIcon:     { fontSize: '48px', opacity: 0.2 },
    emptyTitle:    { fontSize: '18px', color: '#555', margin: 0 },
    emptySubtitle: { fontSize: '13px', color: '#333', margin: 0 },
    loadingMsg:    { color: '#555', fontSize: '13px', padding: '40px 32px' },
    errorMsg:      { color: '#f06b6b', fontSize: '13px', padding: '40px 32px' },
    empty:         { color: '#555', fontSize: '13px', padding: '40px 0', textAlign: 'center' },

    dataWrap: {
        padding: '28px 32px',
        flex: 1,
        overflowY: 'auto',
    },

    // ── Table ──
    table:   { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
    th:      { backgroundColor: SURFACE, color: ACCENT, padding: '10px 14px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: `1px solid ${BORDER}` },
    td:      { padding: '10px 14px', color: '#aaa', borderBottom: `1px solid ${BORDER}` },
    tdTeam:  { padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', borderBottom: `1px solid ${BORDER}` },
    rowEven: { backgroundColor: 'transparent' },
    rowOdd:  { backgroundColor: 'rgba(255,255,255,0.015)' },
    icon:    { width: '20px', height: '20px', objectFit: 'contain', flexShrink: 0 },

    // ── Match cards ──
    matchCard:   { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '14px 18px' },
    matchTeams:  { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' },
    matchTeam:   { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '500', color: '#ddd', flex: 1, textAlign: 'center' },
    matchIcon:   { width: '28px', height: '28px', objectFit: 'contain' },
    matchScore:  { fontSize: '22px', fontWeight: '600', color: '#fff', minWidth: '60px', textAlign: 'center' },
    matchMeta:   { fontSize: '11px', color: '#444', marginTop: '10px', textAlign: 'center' },
    badgePlan:   { display: 'inline-block', padding: '2px 8px', borderRadius: '99px', fontSize: '10px', fontWeight: '600', background: 'rgba(93,202,165,0.1)', color: ACCENT },
    badgeDone:   { display: 'inline-block', padding: '2px 8px', borderRadius: '99px', fontSize: '10px', fontWeight: '600', background: BORDER, color: '#555' },

    // ── Top scorers ──
    scorerList:  { display: 'flex', flexDirection: 'column' },
    scorerRow:   { display: 'flex', alignItems: 'center', gap: '14px', padding: '11px 0', borderBottom: `1px solid ${BORDER}` },
    scorerRank:  { fontSize: '12px', color: '#444', width: '24px', textAlign: 'center', fontVariantNumeric: 'tabular-nums' },
    scorerName:  { fontSize: '14px', color: '#ddd' },
    scorerTeam:  { fontSize: '11px', color: '#555', marginTop: '2px' },
    scorerGoals: { fontSize: '18px', fontWeight: '600', color: ACCENT, width: '40px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
};

export default SportScorings;