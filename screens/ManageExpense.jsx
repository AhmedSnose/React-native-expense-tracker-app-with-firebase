import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, removeExpense } from "../store/redux/expenses-slice";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {
  deleteExpense,
  storeExpense,
  updateExpense,
} from "../services/expenseService";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default ({ route, navigation }) => {
  const dispatch = useDispatch();
  const expenses = useSelector(({ expensesSlice }) => expensesSlice.expenses);
  const [isLoading, setIsLoading] = useState(false);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const selectedExpense = expenses.find((item) => item.id == expenseId);
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    try {
      await deleteExpense(expenseId);
      dispatch(removeExpense({ id: expenseId }));
      navigation.goBack();
    } catch (error) {
      setError("Faild in fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmHandler = async (expense) => {
    setIsLoading(true);
    if (isEditing) {

      const _expense = { ...expense, id: expenseId };
      await updateExpense(expenseId, _expense);
      dispatch(addExpense({ expense: _expense }));

    } else {
      const id = await storeExpense(expense);
      dispatch(addExpense({ expense: { ...expense, id: id } }));
    }

    navigation.goBack();
  };

  if (isLoading) return <LoadingOverlay />;
  if (error && !isLoading) return <ErrorOverlay message={error} />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  //   button:{
  //     backgroundColor:'#fff'
  //   },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
