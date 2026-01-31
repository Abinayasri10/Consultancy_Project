import React from 'react';

export default function MetricCard({ title, value, icon: Icon, color, change }) {
  const colorMap = {
    green: '#10b981',
    blue: '#3b82f6',
    orange: '#f59e0b',
    red: '#ef4444',
  };

  return (
    <div className="metric-card" style={{ borderTopColor: colorMap[color] }}>
      <div className="metric-header">
        <h3 className="metric-title">{title}</h3>
        <div className="metric-icon" style={{ color: colorMap[color] }}>
          <Icon size={24} />
        </div>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-change">{change}</div>
    </div>
  );
}
