import axios from "axios";

const BASE_URL = "https://expense-9653d-default-rtdb.firebaseio.com";

export async function storeExpense(data) {
  const response = await axios.post(BASE_URL + "/expense.json", data);
  return response.data.name;
}

export async function getExpenses() {
  const response = await axios.get(BASE_URL + "/expense.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export const updateExpense = (id,expense) => {
  return axios.put(`${BASE_URL}/expense/${id}.json` , expense);
}

export const deleteExpense = (id) => {
  return axios.delete(`${BASE_URL}/expense/${id}.json`);
}