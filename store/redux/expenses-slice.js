import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expensesSlice",
  initialState: {
    expenses: [
      // {
      //   id: "e1",
      //   description: "A pair of shoes",
      //   amount: 20.22,
      //   date: new Date("2024-11-28"),
      // },
      // {
      //   id: "e2",
      //   description: "Groceries",
      //   amount: 45.67,
      //   date: new Date("2024-11-25"),
      // },
      // {
      //   id: "e3",
      //   description: "Monthly Rent",
      //   amount: 850.0,
      //   date: new Date("2024-09-01"),
      // },
      // {
      //   id: "e4",
      //   description: "Electricity Bill",
      //   amount: 120.15,
      //   date: new Date("2024-11-20"),
      // },
      // {
      //   id: "e5",
      //   description: "New Laptop",
      //   amount: 1200.0,
      //   date: new Date("2024-10-15"),
      // },
      // {
      //   id: "e6",
      //   description: "Gym Membership",
      //   amount: 50.0,
      //   date: new Date("2024-11-10"),
      // },
      // {
      //   id: "e7",
      //   description: "Coffee with Friends",
      //   amount: 15.25,
      //   date: new Date("2024-11-18"),
      // },
      // {
      //   id: "e8",
      //   description: "Car Fuel",
      //   amount: 60.5,
      //   date: new Date("2024-09-22"),
      // },
      // {
      //   id: "e9",
      //   description: "Movie Tickets",
      //   amount: 25.0,
      //   date: new Date("2024-09-23"),
      // },
      // {
      //   id: "e10",
      //   description: "Online Course Subscription",
      //   amount: 200.0,
      //   date: new Date("2024-09-05"),
      // },
    ],
  },
  reducers: {
    setExpenses:(state, action)=>{
      const inverted = action.payload.expenses.reverse();
        state.expenses = inverted;
    },
    add: (state, action) => {
      const existingItemIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.expense.id
      );
      if (existingItemIndex === -1) {
        state.expenses.push(action.payload.expense);
      } else {
        state.expenses[existingItemIndex] = action.payload.expense;
      }
    },
    remove: (state, action) => {      
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
    },
  },
});

export default expensesSlice.reducer;
export const { add: addExpense, remove: removeExpense , setExpenses } = expensesSlice.actions;
