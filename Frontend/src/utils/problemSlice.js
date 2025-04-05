import { createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
  name: "problem",
  initialState: [],
  reducers: {
    addProblems: (state, action) => {
      return action.payload;
    },
    approveProblem: (state, action) => {
      return state.map((problem) =>
        problem._id === action.payload
          ? { ...problem, verificationStatus: "approved" }
          : problem
      );
    },
    rejectProblem: (state, action) => {
      return state.map((problem) =>
        problem._id === action.payload
          ? { ...problem, verificationStatus: "rejected" }
          : problem
      );
    },
  },
});

export const { addProblems, approveProblem, rejectProblem } =
  problemSlice.actions;

export default problemSlice.reducer;
