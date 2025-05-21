import React from 'react';

const AIInsightsPanel = ({ suggestions, onRefresh }) => (
  <div className="ai-panel">
    <h3>💡 AI Suggestions</h3>
    <button onClick={onRefresh} className="glow-button" style={{ marginBottom: '10px' }}>🔄 Refresh</button>
    <div style={{ whiteSpace: 'pre-wrap' }}>
      {suggestions ? suggestions : "No suggestions yet. Click refresh to get AI insights."}
    </div>
  </div>
);

export default AIInsightsPanel;
