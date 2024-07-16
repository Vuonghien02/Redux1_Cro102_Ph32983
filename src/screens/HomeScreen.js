import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem, deleteItem } from '../redux/store';
import { Dialog, Portal, Provider, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.expenses.items);
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', description: '', date: '', type: '', amount: '' });
    const [editId, setEditId] = useState(null);

    const handleAdd = () => {
        if (editId) {
            dispatch(editItem({ id: editId, updates: newItem }));
        } else {
            dispatch(addItem({ ...newItem, id: Date.now().toString() }));
        }
        setVisible(false);
        setNewItem({ title: '', description: '', date: '', type: '', amount: '' });
        setEditId(null);
    };

    const handleDelete = (id) => {
        dispatch(deleteItem(id));
    };

    const filteredItems = items.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <Provider>
            <View style={{ backgroundColor: 'yellow', flex: 1 }}>
                <TextInput
                    placeholder="Tìm kiếm theo tiêu đề"
                    value={search}
                    onChangeText={setSearch}
                    style={{ margin: 10, padding: 10, backgroundColor: 'white', borderRadius: 10, marginTop:20 }}
                />

                <FlatList style={{ padding: 15 }}
                    data={filteredItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', backgroundColor: 'cyan', borderRadius: 10,marginBottom:10 }}>
                            <Text>Tiêu đề: {item.title}</Text>
                            <Text>Mô tả: {item.description}</Text>
                            <Text>Ngày: {item.date}</Text>
                            <Text>Loại: {item.type}</Text>
                            <Text>Số tiền: {item.amount}</Text>
                            <Button onPress={() => { setNewItem(item); setEditId(item.id); setVisible(true); }}>Sửa</Button>
                            <Button onPress={() => handleDelete(item.id)}>Xóa</Button>
                        </View>
                    )}
                />
                <View style={{ flexDirection: 'row',alignItems:'center', padding:20 }}>
                    {/* <Button style={{ backgroundColor: 'green', width: 200, }} onPress={() => setVisible(true)}>Thêm</Button> */}

                    {/* <Button onPress={() => navigation.navigate('Statistics')}>Đi đến thống kê</Button> */}
                    <TouchableOpacity style={{width:300,backgroundColor:'cyan', borderRadius:20 , padding:20, alignItems:'center', marginRight:10}} onPress={() => navigation.navigate('Statistics')}>
                        <Text>XEM THỐNG KÊ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image style={{ width: 50, height: 50 }} source={require('../images/image.png')} />
                    </TouchableOpacity>
                </View>
                <Portal>
                    <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                        <Dialog.Title>{editId ? 'Sửa item' : 'Thêm mục chi tiêu'}</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                placeholder="Tiêu đề"
                                value={newItem.title}
                                onChangeText={(text) => setNewItem({ ...newItem, title: text })}
                                style={{ marginBottom: 10, borderWidth:1 , borderRadius:10, padding:10}}
                            />
                            <TextInput
                                placeholder="Mô tả"
                                value={newItem.description}
                                onChangeText={(text) => setNewItem({ ...newItem, description: text })}
                                style={{ marginBottom: 10 , borderWidth:1 , borderRadius:10, padding:10}}
                            />
                            <TextInput
                                placeholder="Ngày"
                                value={newItem.date}
                                onChangeText={(text) => setNewItem({ ...newItem, date: text })}
                                style={{ marginBottom: 10, borderWidth:1 , borderRadius:10, padding:10 }}
                            />
                            <TextInput
                                placeholder="Loại"
                                value={newItem.type}
                                onChangeText={(text) => setNewItem({ ...newItem, type: text })}
                                style={{ marginBottom: 10, borderWidth:1 , borderRadius:10, padding:10 }}
                            />
                            <TextInput
                                placeholder="Số tiền"
                                value={newItem.amount}
                                onChangeText={(text) => setNewItem({ ...newItem, amount: text })}
                                style={{ marginBottom: 10, borderWidth:1 , borderRadius:10, padding:10 }}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setVisible(false)}>Hủy</Button>
                            <Button onPress={handleAdd}>{editId ? 'Sửa' : 'Thêm'}</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
};

export default HomeScreen;
