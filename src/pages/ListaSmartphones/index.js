
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'database.db', createFromLocation: 1});

export default function ListaSmartphones() {
    const navigation = useNavigation();
    const [smartphones, setSmartphones] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            
            loadSmartphones();
        });
        return unsubscribe;
    }, [navigation]);

    const loadSmartphones = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM smartphones',
                [],
                (tx, results) => {
                    const len = results.rows.length;
                    const tempSmartphones = [];
                    for (let i = 0; i < len; i++) {
                        tempSmartphones.push(results.rows.item(i));
                    }
                    setSmartphones(tempSmartphones);
                },
                (error) => {
                    console.error(error);
                }
            );
        });
    };

    const navigateToDetalhes = (smartphone) => {
        navigation.navigate('Detalhes', { detalheSmartphone: smartphone });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigateToDetalhes(item)}>
            <Text>{item.modelo}</Text>
            <Text>{item.marca}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={smartphones}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC'
    }
});




