import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  polls: [
    {
      id: 1,
      question: "Best programming language to learn in 2025?",
      options: [
        { id: 'a', label: '⚡ JavaScript', votes: 12 },
        { id: 'b', label: '🐍 Python', votes: 18 },
        { id: 'c', label: '☕ Java', votes: 5 },
        { id: 'd', label: '🦀 Rust', votes: 8 },
      ],
      totalVotes: 43,
      status: 'active',
      category: 'Academic',
      createdAt: Date.now() - 100000,
    },
    {
      id: 2,
      question: "Rate today's cafeteria food",
      options: [
        { id: 'a', label: '🤤 Amazing', votes: 30 },
        { id: 'b', label: '🙂 Good', votes: 45 },
        { id: 'c', label: '😐 Meh', votes: 12 },
        { id: 'd', label: '🤢 Terrible', votes: 8 },
      ],
      totalVotes: 95,
      status: 'closed',
      category: 'Food',
      createdAt: Date.now() - 600000,
    }
  ]
};

const pollSlice836 = createSlice({
  name: 'polls_836',
  initialState,
  reducers: {
    createPoll: (state, action) => {
      const newPoll = {
        id: Date.now(),
        question: action.payload.question,
        options: action.payload.options.map((opt, i) => ({
          id: `opt-${i}`,
          label: opt,
          votes: 0
        })),
        totalVotes: 0,
        status: 'active',
        category: action.payload.category || 'General',
        createdAt: Date.now()
      };
      state.polls.push(newPoll);
    },
    votePoll: (state, action) => {
      const { pollId, optionId } = action.payload;
      const poll = state.polls.find(p => p.id === pollId);
      if (poll && poll.status === 'active') {
        const option = poll.options.find(o => o.id === optionId);
        if (option) {
          option.votes += 1;
          poll.totalVotes += 1;
        }
      }
    },
    closePoll: (state, action) => {
      const poll = state.polls.find(p => p.id === action.payload);
      if (poll) {
        poll.status = 'closed';
      }
    },
    sortPolls: (state) => {
      state.polls.sort((a, b) => b.totalVotes - a.totalVotes);
    }
  }
});

export const { createPoll, votePoll, closePoll, sortPolls } = pollSlice836.actions;
export default pollSlice836.reducer;
