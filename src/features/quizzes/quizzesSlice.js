import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizzes: {}
};

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      const { id, name, topicId, cardIds } = action.payload;
      state.quizzes[id] = {
        id,
        name,
        topicId,
        cardIds
      };
    },
    removeQuiz: (state, action) => {
      const { quizId } = action.payload;
      delete state.quizzes[quizId];
    }
  }
});

export const { addQuiz, removeQuiz } = quizzesSlice.actions;
export const selectQuizzes = (state) => state.quizzes.quizzes;
export default quizzesSlice.reducer;