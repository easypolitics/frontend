import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Bill } from './Bill';

export const Bills = () => {
    const [bills, setBills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [exhausted, setExhausted] = useState(false);
    const [error, setError] = useState(true);

    const fetchBills = async (currentPage) => {
        try {
            const response = await fetch(`http://192.168.1.39:8000/v1/bills/?page=${currentPage}`);
            const json = await response.json();
            return json.results;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMore = async () => {
        if (exhausted == false) {
            setLoadingMore(true);

            const nextPage = currentPage + 1;
            const newBills = await fetchBills(nextPage);

            setCurrentPage(nextPage);
            setBills((prevBills) => [...prevBills, ...newBills]);
            setLoadingMore(false);

            if (newBills.length < 20) {
                setExhausted(true);
            }
        }
    };

    const refreshBills = async () => {
        setRefreshing(true);
        setExhausted(false);

        const defaultPage = 1;
        const defaultBills = await fetchBills(defaultPage);

        setCurrentPage(defaultPage);
        setBills(() => defaultBills);
        setRefreshing(false);
    };

    const renderFooter = () => {
        if (loadingMore) {
            return <ActivityIndicator style={styles.footer} size="large" color="#a7aaae" />;
        }
    };

    const renderItem = useCallback(({ item }) => <Bill item={item} />, []);

    useEffect(() => {
        fetchBills(currentPage).then((data) => setBills(data));
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#a7aaae" />
            ) : (
                <View>
                    <FlatList
                        data={bills}
                        keyExtractor={({ bill_id }) => bill_id}
                        renderItem={renderItem}
                        onEndReachedThreshold={1}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={refreshBills}
                                tintColor={'white'}
                            />
                        }
                        onEndReached={fetchMore}
                        // Android
                        overScrollMode="never"
                        // iOS
                        indicatorStyle="white"
                    />
                    {renderFooter()}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222932',
        flex: 1,
        justifyContent: 'center',
    },
    footer: {
        paddingBottom: 50,
    },
});
