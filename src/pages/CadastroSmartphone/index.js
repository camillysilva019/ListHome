import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'database.db', createFromLocation: 1});

export default function CadastroSmartphone() {
    const [modelo, setModelo] = React.useState('');
    const [marca, setMarca] = React.useState('');
    const [memoria, setMemoria] = React.useState('');
    const [armazenamento, setArmazenamento] = React.useState('');
    const [ano_lancamento, setAnoLancamento] = React.useState('');

    const cadastrarSmartphone = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO smartphones (modelo, marca, memoria, armazenamento, ano_lancamento) VALUES (?, ?, ?, ?, ?)',
                [modelo, marca, memoria, armazenamento, ano_lancamento],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('Smartphone cadastrado com sucesso!');
                        
                        setModelo('');
                        setMarca('');
                        setMemoria('');
                        setArmazenamento('');
                        setAnoLancamento('');
                    } else {
                        console.error('Erro ao cadastrar smartphone.');
                    }
                },
                (error) => {
                    console.error(error);
                }
            );
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Model"
                onChangeText={text => setModelo(text)}
                value={modelo}
            />
            <TextInput
                style={styles.input}
                placeholder="Brand"
                onChangeText={text => setMarca(text)}
                value={marca}
            />
            <TextInput
                style={styles.input}
                placeholder="Memory"
                onChangeText={text => setMemoria(text)}
                value={memoria}
            />
            <TextInput
                style={styles.input}
                placeholder="Storage"
                onChangeText={text => setArmazenamento(text)}
                value={armazenamento}
            />
            <TextInput
                style={styles.input}
                placeholder="Release Year"
                onChangeText={text => setAnoLancamento(text)}
                value={ano_lancamento}
            />
            <Button title="Register" onPress={cadastrarSmartphone} />
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
    }
});

