import React from 'react';
import { s } from './SportScoringStyles';

export function Tabelle({ data }) {
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
                        <img src={team.teamIconUrl} alt="" style={s.icon} onError={e => e.target.style.display = 'none'} />
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

export function Spiele({ data }) {
    const matches = (Array.isArray(data) ? data : [data]).filter(m => m?.team1);
    if (!matches.length) return <p style={s.empty}>Keine Spiele gefunden.</p>;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {matches.map((m, i) => {
                const res = m.matchResults?.find(r => r.resultTypeID === 2) ?? m.matchResults?.at(-1);
                const score = res ? `${res.pointsTeam1} : ${res.pointsTeam2}` : '– : –';
                const date = new Date(m.matchDateTimeUTC).toLocaleDateString('de-DE', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
                });
                return (
                    <div key={m.matchID ?? i} style={s.matchCard}>
                        <div style={s.matchTeams}>
                            <div style={s.matchTeam}>
                                <img src={m.team1.teamIconUrl} alt="" style={s.matchIcon} onError={e => e.target.style.display = 'none'} />
                                <span>{m.team1.teamName}</span>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={s.matchScore}>{m.matchIsFinished ? score : '– : –'}</div>
                                <span style={m.matchIsFinished ? s.badgeDone : s.badgePlan}>
                                    {m.matchIsFinished ? 'Beendet' : 'Geplant'}
                                </span>
                            </div>
                            <div style={s.matchTeam}>
                                <img src={m.team2?.teamIconUrl} alt="" style={s.matchIcon} onError={e => e.target.style.display = 'none'} />
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

export function Torjaeger({ data }) {
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