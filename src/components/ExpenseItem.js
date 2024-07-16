import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text>Title: {expense.title}</Text>
      <Text>Description: {expense.description}</Text>
      <Text>Date: {expense.date}</Text>
      <Text>Type: {expense.type}</Text>
      <Text>Amount: {expense.amount}</Text>
      <TouchableOpacity onPress={() => onEdit({ ...expense, title: 'Updated Title' })}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
};

export default ExpenseItem;
