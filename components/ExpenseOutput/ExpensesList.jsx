import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem({ item }) {
  const props = {
    amount: item.amount,
    id: item.id,
    description: item.description,
    date: item.date,
  };
  return <ExpenseItem {...props} />;
}
export default ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};
