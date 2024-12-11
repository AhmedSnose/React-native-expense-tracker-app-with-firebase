import { useDispatch, useSelector } from "react-redux";
import ExpensesOutPut from "../components/ExpenseOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";
import { setExpenses } from "../store/redux/expenses-slice";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default () => {
  const expenses = useSelector(({ expensesSlice }) => expensesSlice.expenses);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getAllExpenses() {
      setIsLoading(true);
      try {
        const expenses = await getExpenses();
        dispatch(setExpenses({ expenses }));
      } catch (error) {
        setError("Faild in fetch data");
      } finally {
        setIsLoading(false);
      }
    }

    getAllExpenses();
  }, []);

  const recentExpenses = expenses.filter((item) => {
    const toDay = new Date();
    const date7DaysAgo = getDateMinusDays(toDay, 7);

    return item.date >= date7DaysAgo && item.date <= toDay;
  });

  if (isLoading) return <LoadingOverlay />;
  if (error && !isLoading) return <ErrorOverlay message={error} />;

  return (
    <ExpensesOutPut
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText={"Sorry there is no last 7 days"}
    />
  );
};
