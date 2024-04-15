import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import SQLite from 'react-native-sqlite-storage';
import { useNavigation, useRoute } from "@react-navigation/native";

const db = SQLite.openDatabase({name: 'database.db', createFromLocation: 1});

export default function Detalhes() {
    const navigation = useNavigation();
    const route = useRoute();
    const { detalheSmartphone } = route.params;

    const editarSmartphone = () => {
        navigation.navigate('Edicao', { detalheSmartphone });
    };

    const excluirSmartphone = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM smartphones WHERE id = ?',
                [detalheSmartphone.id],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('Smartphone excluído com sucesso!');
                        navigation.goBack();
                    } else {
                        console.error('Erro ao excluir smartphone.');
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
            <Text>Model: {detalheSmartphone.modelo}</Text>
            <Text>Brand: {detalheSmartphone.marca}</Text>
            <Text>Memory: {detalheSmartphone.memoria}</Text>
            <Text>Storage: {detalheSmartphone.armazenamento}</Text>
            <Text>Release Year: {detalheSmartphone.ano_lancamento}</Text>
            <View style={styles.buttonsContainer}>
                <Button title="Edit" onPress={editarSmartphone} />
                <Button title="Delete" onPress={excluirSmartphone} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 20
    }
});

