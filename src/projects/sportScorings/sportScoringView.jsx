import React from 'react';
import './sportScorings.css';

export function Tabelle({ data }) {
    if (!data?.length) return <p className="empty">Keine Tabellendaten verfügbar.</p>;
    return (
        <table className="table">
            <thead>
            <tr>
                {['#', 'Verein', 'Sp', 'S', 'U', 'N', 'Tore', 'Pkt'].map(h => (
                    <th key={h} className="th" style={{ textAlign: h === 'Verein' ? 'left' : 'center' }}>{h}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((team, i) => (
                <tr key={team.teamInfoId ?? i} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                    <td className="td" style={{ color: '#555', fontSize: '11px', textAlign: 'center', fontFamily: 'var(--mono)' }}>{i + 1}</td>
                    <td className="td-team">
                        <img src={team.teamIconUrl} alt="" className="icon" onError={e => e.target.style.display = 'none'} />
                        {team.teamName}
                    </td>
                    {[team.matches, team.won, team.draw, team.lost].map((v, j) => (
                        <td key={j} className="td" style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>{v}</td>
                    ))}
                    <td className="td" style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>{team.goals}:{team.opponentGoals}</td>
                    <td className="td" style={{ textAlign: 'center' }}>
                        <strong style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontWeight: 500 }}>{team.points}</strong>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export function Spiele({ data }) {
    const matches = (Array.isArray(data) ? data : [data]).filter(m => m?.team1);
    if (!matches.length) return <p className="empty">Keine Spiele gefunden.</p>;
    return (
        <div className="matches-list">
            {matches.map((m, i) => {
                const res   = m.matchResults?.find(r => r.resultTypeID === 2) ?? m.matchResults?.at(-1);
                const score = res ? `${res.pointsTeam1} : ${res.pointsTeam2}` : '– : –';
                const date  = new Date(m.matchDateTimeUTC).toLocaleDateString('de-DE', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
                });
                return (
                    <div key={m.matchID ?? i} className="match-card">
                        <div className="match-teams">
                            <div className="match-team">
                                <img src={m.team1.teamIconUrl} alt="" className="match-icon" onError={e => e.target.style.display = 'none'} />
                                <span>{m.team1.teamName}</span>
                            </div>
                            <div className="match-center">
                                <div className="match-score">{m.matchIsFinished ? score : '– : –'}</div>
                                <span className={m.matchIsFinished ? 'badge-done' : 'badge-plan'}>
                                    {m.matchIsFinished ? 'Beendet' : 'Geplant'}
                                </span>
                            </div>
                            <div className="match-team">
                                <img src={m.team2?.teamIconUrl} alt="" className="match-icon" onError={e => e.target.style.display = 'none'} />
                                <span>{m.team2?.teamName}</span>
                            </div>
                        </div>
                        <div className="match-meta">{date}{m.group?.groupName ? ` · ${m.group.groupName}` : ''}</div>
                    </div>
                );
            })}
        </div>
    );
}

export function Torjaeger({ data }) {
    if (!data?.length) return <p className="empty">Keine Torjäger-Daten verfügbar.</p>;
    const sorted = [...data].sort((a, b) => b.goalCount - a.goalCount).slice(0, 20);
    return (
        <div className="scorer-list">
            {sorted.map((g, i) => (
                <div key={i} className="scorer-row">
                    <span className="scorer-rank">{i + 1}</span>
                    <div style={{ flex: 1 }}>
                        <div className="scorer-name">{g.goalGetterName}</div>
                        {g.teamName && <div className="scorer-team">{g.teamName}</div>}
                    </div>
                    <span className="scorer-goals">{g.goalCount}</span>
                </div>
            ))}
        </div>
    );
}