import { useSelector } from "react-redux";
import ExpensesOutPut from "../components/ExpenseOutput/ExpensesOutput";

export default () => {
  const expenses = useSelector(({ expensesSlice }) => expensesSlice.expenses);

  return <ExpensesOutPut expensesPeriod="Total" expenses={expenses} fallbackText={'Sorry there is no all'} />;
};
