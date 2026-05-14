import {useEffect, useState} from 'react';

function Bundesliga() {
    const [tabelle, setTabelle] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.openligadb.de/getbltable/bl1/2025')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTabelle(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p style={{padding: '32px'}}>Lädt...</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Aktuelle Bundesliga Tabelle 2025/26</h1>
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
                        <td style={styles.td}><strong>{team.points}</strong></td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '900px',
        margin: '60px auto',
        padding: '0 32px',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '32px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#1a1a2e',
        color: 'white',
        padding: '12px 16px',
        textAlign: 'left',
    },
    td: {
        padding: '10px 16px',
        textAlign: 'left',
    },
    tdTeam: {
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    rowEven: {
        backgroundColor: '#f9f9f9',
    },
    rowOdd: {
        backgroundColor: 'white',
    },
    icon: {
        width: '24px',
        height: '24px',
        objectFit: 'contain',
    }
};

export default Bundesliga;