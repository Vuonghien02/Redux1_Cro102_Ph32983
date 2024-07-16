import React from 'react';
import { View, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const StatisticsScreen = ({ navigation }) => {
    const expenses = useSelector(state => state.expenses.items);
    const searchQuery = useSelector(state => state.expenses.searchQuery) || '';

    const filteredExpenses = expenses.filter(exp => exp.title && exp.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const totalIncome = filteredExpenses
        .filter(exp => exp.type === 'thu')
        .reduce((total, exp) => total + (parseFloat(exp.amount) || 0), 0);

    const totalExpense = filteredExpenses
        .filter(exp => exp.type === 'chi')
        .reduce((total, exp) => total + (parseFloat(exp.amount) || 0), 0);

    return (
        <View style={{ padding: 16, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'red' }}>Tổng thu: {totalIncome.toFixed(2)}</Text>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'blue' }}>Tổng chi: {totalExpense.toFixed(2)}</Text>
            <TouchableOpacity style={{backgroundColor:'cyan', padding:20,borderRadius:20,marginTop:100}} onPress={() => navigation.navigate('Home')}>
                <Text>Quay lại danh sách</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StatisticsScreen;
