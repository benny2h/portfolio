import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Bundesliga() {
    const [tabelle, setTabelle] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://api.openligadb.de/getbltable/bl1/2024')
            .then(res => res.json())
            .then(data => {
                setTabelle(data);
                setLoading(false);
            });
    }, []);

    return (
        <div style={styles.page}>
            <nav style={styles.nav}>
                <span style={styles.logo}>BH</span>
                <button style={styles.back} onClick={() => navigate('/')}>← Zurück</button>
            </nav>

            <div style={styles.container}>
                <h1 style={styles.title}>Bundesliga Tabelle 2024/25</h1>

                {loading ? (
                    <p style={styles.loading}>Lädt...</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Verein</th>
                            <th style={styles.th}>Sp</th>
                            <th style={styles.th}>S</th>
                            <th style={styles.th}>U</th>
                            <th style={styles.th}>N</th>
                            <th style={styles.th}>Tore</th>
                            <th style={styles.th}>Pkt</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tabelle.map((team, index) => (
                            <tr key={team.teamInfoId} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.tdTeam}>
                                    <img src={team.teamIconUrl} alt="" style={styles.icon} />
                                    {team.teamName}
                                </td>
                                <td style={styles.td}>{team.matches}</td>
                                <td style={styles.td}>{team.won}</td>
                                <td style={styles.td}>{team.draw}</td>
                                <td style={styles.td}>{team.lost}</td>
                                <td style={styles.td}>{team.goals}:{team.opponentGoals}</td>
                                <td style={styles.td}><strong style={{ color: '#5dcaa5' }}>{team.points}</strong></td>
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 48px',
        backgroundColor: '#0f0f1a',
        borderBottom: '1px solid #1a1a2e',
    },
    logo: {
        color: '#fff', fontWeight: '600', fontSize: '18px',
    },
    back: {
        background: 'none',
        border: '1px solid #2a2a4a',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        color: '#aaa',
    },
    container: {
        maxWidth: '900px',
        margin: '60px auto',
        padding: '0 32px',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '32px',
        color: '#fff',
    },
    loading: {
        color: '#aaa',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#1a1a2e',
        color: '#5dcaa5',
        padding: '12px 16px',
        textAlign: 'left',
        fontSize: '14px',
    },
    td: {
        padding: '10px 16px',
        textAlign: 'left',
        color: '#aaa',
    },
    tdTeam: {
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#fff',
    },
    rowEven: { backgroundColor: '#0f0f1a' },
    rowOdd: { backgroundColor: '#13131f' },
    icon: {
        width: '24px', height: '24px', objectFit: 'contain',
    },
};

export default Bundesliga;