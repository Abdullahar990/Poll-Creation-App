import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PollCard from './PollCard';
import { sortPolls } from '../pollSlice836';
import { ArrowUpDown } from 'lucide-react';

const PollList = ({ status, title }) => {
  const dispatch = useDispatch();
  // Part 9 requirement: Single Redux array filtered in component
  const polls = useSelector(state => state.polls_836.polls);
  const filteredPolls = polls.filter(p => p.status === status);

  return (
    <div className="poll-section" style={{ marginBottom: '4rem' }}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {status === 'active' && filteredPolls.length > 0 && (
          <button 
            className="sort-btn"
            onClick={() => dispatch(sortPolls())}
          >
            <ArrowUpDown size={16} /> Sort by Popularity
          </button>
        )}
      </div>
      
      {filteredPolls.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
          No {status} polls at the moment.
        </p>
      ) : (
        <div className="poll-grid">
          {filteredPolls.map(poll => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PollList;
