import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topics: {}
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic: (state, action) => {
      const { id, name, icon } = action.payload;
      state.topics[id] = {
        id,
        name,
        icon,
        quizIds: []
      };
    },
    addQuizIdToTopic: (state, action) => {
      const { topicId, quizId } = action.payload;
      state.topics[topicId].quizIds.push(quizId);
    },
    removeTopic: (state, action) => {
      const { topicId } = action.payload;
      delete state.topics[topicId];
    }
  }
});

export const { addTopic, addQuizIdToTopic, removeTopic } = topicsSlice.actions;
export const selectTopics = (state) => state.topics.topics;
export default topicsSlice.reducer;