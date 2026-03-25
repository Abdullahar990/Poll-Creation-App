import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPoll } from '../pollSlice836';
import { PlusCircle } from 'lucide-react';

const PollCreator = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }
    if (options.some(opt => !opt.trim())) {
      alert("Please fill in all 4 options.");
      return;
    }

    dispatch(createPoll({
      question,
      options,
      category: 'General'
    }));

    // Reset form
    setQuestion('');
    setOptions(['', '', '', '']);
  };

  return (
    <div className="creator-section glass-panel">
      <h2>Create New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Poll Question</label>
          <input
            type="text"
            className="form-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Best course this semester?"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Options (Must provide exactly 4)</label>
          <div style={{ display: 'grid', gap: '10px' }}>
            {options.map((opt, index) => (
              <input
                key={index}
                type="text"
                className="form-input"
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          <PlusCircle size={20} /> Deploy Poll
        </button>
      </form>
    </div>
  );
};

export default PollCreator;
