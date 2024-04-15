
import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'database.db', createFromLocation: 1});

export default function PesquisaSmartphones() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);

    const searchSmartphones = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM smartphones WHERE modelo LIKE ? OR marca LIKE ?',
                [`%${searchTerm}%`, `%${searchTerm}%`],
                (tx, results) => {
                    const len = results.rows.length;
                    const tempResults = [];
                    for (let i = 0; i < len; i++) {
                        tempResults.push(results.rows.item(i));
                    }
                    setSearchResults(tempResults);
                },
                (error) => {
                    console.error(error);
                }
            );
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text>{item.modelo}</Text>
            <Text>{item.marca}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search by model or brand"
                onChangeText={text => setSearchTerm(text)}
                value={searchTerm}
            />
            <Button title="Search" onPress={searchSmartphones} />
            {searchResults.map(item => (
                <View key={item.id} style={styles.resultContainer}>
                    <Text>{item.modelo}</Text>
                    <Text>{item.marca}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: 10,
        marginBottom: 10,
        width: '80%'
    },
    resultContainer: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: 10,
        marginTop: 10,
        width: '80%'
    }
});
