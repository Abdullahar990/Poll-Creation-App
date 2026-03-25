import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart3, Clock, CheckCircle, Users } from 'lucide-react';

const StatisticsDashboard = () => {
  const polls = useSelector(state => state.polls_836.polls);
  
  const totalPolls = polls.length;
  const activePolls = polls.filter(p => p.status === 'active').length;
  const closedPolls = polls.filter(p => p.status === 'closed').length;
  const totalVotes = polls.reduce((sum, poll) => sum + poll.totalVotes, 0);

  return (
    <div className="dashboard-grid">
      <div className="stat-card glass-panel">
        <div className="stat-value">{totalPolls}</div>
        <div className="stat-label">
          <BarChart3 size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Total Polls
        </div>
      </div>
      <div className="stat-card glass-panel">
        <div className="stat-value">{activePolls}</div>
        <div className="stat-label">
          <Clock size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Active Polls
        </div>
      </div>
      <div className="stat-card glass-panel">
        <div className="stat-value">{closedPolls}</div>
        <div className="stat-label">
          <CheckCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Closed Polls
        </div>
      </div>
      <div className="stat-card glass-panel">
        <div className="stat-value">{totalVotes}</div>
        <div className="stat-label">
          <Users size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Total Votes Cast
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
