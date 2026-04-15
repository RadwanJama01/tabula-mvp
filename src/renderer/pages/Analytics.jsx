import React, { useState, useEffect } from 'react';

/**
 * Practice Analytics — firm-wide performance dashboard.
 * Revenue tracking, case throughput, practice breakdown, monthly trends.
 * This is the kind of page that makes $3k/mo feel justified.
 */

const PRACTICE_LABELS = {
  bankruptcy: 'Bankruptcy',
  personal_injury: 'Personal Injury',
  general: 'General',
};

export default function Analytics({ navigate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      window.tabula.analytics.firmOverview(),
      window.tabula.stats.overview(),
    ]).then(([analytics, stats]) => {
      setData({ ...analytics, stats });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-muted">Loading analytics...</p>
      </div>
    );
  }

  const revenueGrowth = data.lastMonthRevenue > 0
    ? ((data.thisMonthRevenue - data.lastMonthRevenue) / data.lastMonthRevenue * 100).toFixed(0)
    : null;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Practice Analytics</h1>
          <p className="page-subtitle">Firm performance, revenue tracking, and case throughput</p>
        </div>
      </div>

      {/* Revenue Row */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value" style={{ color: 'var(--sage)' }}>
            ${Math.round(data.totalRevenue).toLocaleString()}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">This Month</div>
          <div className="stat-value">
            ${Math.round(data.thisMonthRevenue).toLocaleString()}
          </div>
          {revenueGrowth !== null && (
            <div style={{
              fontFamily: 'var(--mono)', fontSize: '0.72rem', marginTop: 4,
              color: parseInt(revenueGrowth) >= 0 ? 'var(--sage)' : 'var(--accent)',
            }}>
              {parseInt(revenueGrowth) >= 0 ? '+' : ''}{revenueGrowth}% vs last month
            </div>
          )}
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Fee / Case</div>
          <div className="stat-value">
            ${Math.round(data.avgFee).toLocaleString()}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Hours</div>
          <div className="stat-value">{data.totalHours.toFixed(1)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Cases</div>
          <div className="stat-value" style={{ color: 'var(--blue)' }}>
            {data.stats.total}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Practice Breakdown */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Cases by Practice Area</span>
          </div>
          <div className="card-body">
            {(data.casesByPractice || []).length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {data.casesByPractice.map((p, i) => {
                  const pct = data.stats.total > 0 ? (p.count / data.stats.total * 100) : 0;
                  const colors = ['var(--sage)', 'var(--blue)', 'var(--amber)', 'var(--accent)'];
                  return (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span className="text-sm" style={{ fontWeight: 500 }}>
                          {PRACTICE_LABELS[p.practice_type] || p.practice_type}
                        </span>
                        <span className="text-sm text-mono">{p.count} cases ({pct.toFixed(0)}%)</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, backgroundColor: 'rgba(10,10,10,0.04)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, backgroundColor: colors[i % colors.length], borderRadius: 3, transition: 'width 0.5s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted">No cases yet.</p>
            )}
          </div>
        </div>

        {/* Pipeline Status */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Pipeline Status</span>
          </div>
          <div className="card-body">
            {(data.casesByStatus || []).map((s, i) => {
              const pct = data.stats.total > 0 ? (s.count / data.stats.total * 100) : 0;
              const statusColors = { intake: 'var(--blue)', in_progress: 'var(--amber)', ready: 'var(--sage)', filed: 'var(--accent)' };
              const statusLabels = { intake: 'Intake', in_progress: 'In Progress', ready: 'Ready to File', filed: 'Filed' };
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < (data.casesByStatus.length - 1) ? '1px solid rgba(10,10,10,0.04)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: statusColors[s.status] || 'var(--warm-gray)' }} />
                    <span className="text-sm">{statusLabels[s.status] || s.status}</span>
                  </div>
                  <span className="text-sm text-mono" style={{ fontWeight: 500 }}>{s.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Monthly Trends</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {(data.casesByMonth || []).length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 20px', fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--warm-gray)', borderBottom: '1px solid rgba(10,10,10,0.06)' }}>Month</th>
                  <th style={{ textAlign: 'right', padding: '12px 20px', fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--warm-gray)', borderBottom: '1px solid rgba(10,10,10,0.06)' }}>Cases</th>
                  <th style={{ textAlign: 'right', padding: '12px 20px', fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--warm-gray)', borderBottom: '1px solid rgba(10,10,10,0.06)' }}>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {data.casesByMonth.map((m, i) => (
                  <tr key={i}>
                    <td style={{ padding: '12px 20px', fontSize: '0.87rem', fontWeight: 500, borderBottom: '1px solid rgba(10,10,10,0.04)' }}>{m.month}</td>
                    <td style={{ padding: '12px 20px', fontSize: '0.87rem', textAlign: 'right', fontFamily: 'var(--mono)', borderBottom: '1px solid rgba(10,10,10,0.04)' }}>{m.count}</td>
                    <td style={{ padding: '12px 20px', fontSize: '0.87rem', textAlign: 'right', fontFamily: 'var(--mono)', color: 'var(--sage)', fontWeight: 500, borderBottom: '1px solid rgba(10,10,10,0.04)' }}>${Math.round(m.revenue).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state" style={{ padding: 40 }}>
              <p className="text-sm text-muted">No data yet. Track fees on cases to see trends.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
