import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

function FussballScorings() {
    const [tabelle, setTabelle] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://api.openligadb.de/getbltable/bl2/2025')
            .then(res => res.json())
            .then(data => {
                setTabelle(data);
                setLoading(false);
            });
    }, []);

    return (
        <div style={styles.page}>
            <nav style={styles.nav}>
                <span style={styles.navTitle}>Fussball Scorings</span>
            </nav>

            <div style={styles.container}>
                <button style={styles.back} onClick={() => navigate('/')}>←</button>
                <h1 style={styles.title}>Le le</h1>
                <p style={styles.subTitle}>Bla bla.</p>

                {loading ? (
                    <p style={styles.loading}>Lädt...</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Verein</th>
                            <th style={styles.th}>Spiele</th>
                            <th style={styles.th}>Siege</th>
                            <th style={styles.th}>Unentschieden</th>
                            <th style={styles.th}>Niederlagen</th>
                            <th style={styles.th}>Tore</th>
                            <th style={styles.th}>Punkte</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tabelle.map((team, index) => (
                            <tr key={team.teamInfoId} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.tdTeam}>
                                    <img src={team.teamIconUrl} alt="" style={styles.icon}/>
                                    {team.teamName}
                                </td>
                                <td style={styles.td}>{team.matches}</td>
                                <td style={styles.td}>{team.won}</td>
                                <td style={styles.td}>{team.draw}</td>
                                <td style={styles.td}>{team.lost}</td>
                                <td style={styles.td}>{team.goals}:{team.opponentGoals}</td>
                                <td style={styles.td}><strong style={{color: '#5dcaa5'}}>{team.points}</strong></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#0f0f1a',
        fontFamily: 'sans-serif',
    },
    nav: {
        alignItems: 'center',
        padding: 'clamp(16px, 4vw, 20px) clamp(20px, 5vw, 48px)',
        backgroundColor: '#0f0f1a',
        borderBottom: '1px solid #1a1a2e',
    },
    navTitle: {
        fontSize: 'clamp(1.5rem, 5vw, 2rem)',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    logo: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 'clamp(14px, 3vw, 18px)',
    },
    back: {
        background: 'none',
        border: '3px solid #2a2a4a',
        borderRadius: '8px',
        padding: '6px 12px',
        fontSize: 'clamp(14px, 3vw, 16px)',
        cursor: 'pointer',
        color: '#aaa',
    },
    container: {
        maxWidth: '900px',
        margin: 'clamp(40px, 8vw, 60px) auto',
        padding: '0 clamp(16px, 4vw, 32px) clamp(40px, 8vw, 60px) clamp(16px, 4vw, 32px)',
    },
    title: {
        fontSize: 'clamp(1.5rem, 5vw, 2rem)',
        marginBottom: 'clamp(12px, 2vw, 16px)',
        color: '#fff',
    },
    subTitle: {
        fontSize: 'clamp(0.875rem, 3vw, 1rem)',
        marginBottom: 'clamp(20px, 4vw, 28px)',
        color: '#aaa',
    },
    loading: {
        color: '#aaa',
        fontSize: 'clamp(14px, 3vw, 16px)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '40px',
        fontSize: 'clamp(12px, 2vw, 14px)',
    },
    th: {
        backgroundColor: '#1a1a2e',
        color: '#5dcaa5',
        padding: 'clamp(10px, 2vw, 12px) clamp(8px, 2vw, 16px)',
        textAlign: 'center',
        fontSize: 'clamp(12px, 2.5vw, 14px)',
        fontWeight: '600',
    },
    td: {
        padding: 'clamp(8px, 2vw, 10px) clamp(8px, 2vw, 16px)',
        textAlign: 'center',
        color: '#aaa',
    },
    tdTeam: {
        padding: 'clamp(8px, 2vw, 10px) clamp(8px, 2vw, 16px)',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(6px, 2vw, 10px)',
        color: '#fff',
    },
    rowEven: {backgroundColor: '#0f0f1a'},
    rowOdd: {backgroundColor: '#13131f'},
    icon: {
        width: 'clamp(20px, 4vw, 24px)',
        height: 'clamp(20px, 4vw, 24px)',
        objectFit: 'contain',
        flexShrink: 0,
    },
};

export default FussballScorings;