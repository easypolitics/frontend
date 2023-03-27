import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, FlatList, StyleSheet } from 'react-native';
import { Bill } from './Bill';

export const Bills = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getBills = async () => {
        try {
            const response = await fetch('http://localhost:8000/v1/bills/');
            const json = await response.json();
            setData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBills();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#a7aaae" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ bill_id }) => bill_id}
                    renderItem={({ item }) => <Bill item={item} />}
                    // Android
                    overScrollMode="never"
                    // iOS
                    indicatorStyle="white"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222932',
        paddingTop: 15,
    },
});
