import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { votePoll } from '../pollSlice836';
import usePollTimer from '../hooks/usePollTimer';
import { Clock } from 'lucide-react';

const PollCard = ({ poll }) => {
  const dispatch = useDispatch();
  // Pass 300 seconds (5 minutes) normally, though initial predefined polls use 300 as default
  const { timeLeft, isExpired } = usePollTimer(poll.id, 300);

  /*
   * LIMITATION NOTE:
   * useRef resets when the PollCard component unmounts and remounts,
   * meaning a user could vote again if the component is removed and re-added
   * to the DOM (e.g., after sorting). This is a session-memory limitation
   * of useRef — it does not persist across re-mounts unlike localStorage or Redux.
   */
  const hasVoted = useRef(false);

  const handleVote = (optionId) => {
    if (hasVoted.current || isExpired || poll.status === 'closed') return;
    hasVoted.current = true;
    dispatch(votePoll({ pollId: poll.id, optionId }));
  };

  const formatTime = (seconds) => {
    if (seconds <= 0) return "00:00";
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="poll-card glass-panel flip-animation">
      <span className="poll-badge">{poll.category}</span>
      <h3 className="poll-question">{poll.question}</h3>
      
      <div className="poll-options">
        {poll.options.map(opt => {
          const percentage = poll.totalVotes === 0 ? 0 : Math.round((opt.votes / poll.totalVotes) * 100);
          
          return (
            <button
              key={opt.id}
              className="vote-option"
              onClick={() => handleVote(opt.id)}
              disabled={hasVoted.current || isExpired || poll.status === 'closed'}
            >
              {/* Progress Bar Background */}
              <div 
                className="vote-progress" 
                style={{ width: `${percentage}%` }}
              ></div>
              
              {/* Foreground Content */}
              <div className="vote-content">
                <span>{opt.label}</span>
                <span>{percentage}% ({opt.votes})</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="poll-footer">
        <span>Total Votes: {poll.totalVotes}</span>
        <div className={`poll-timer ${isExpired || poll.status === 'closed' ? 'expired' : ''}`}>
          <Clock size={14} />
          {poll.status === 'closed' || isExpired ? (
            <span>00:00 (Closed)</span>
          ) : (
            <span>Ends In: {formatTime(timeLeft)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollCard;
