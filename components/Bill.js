import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment/moment';

export function Bill(props) {
    const timestamp = moment(props.item.filtered_date).format('DD MMM');

    const billStatus = (props) => {
        if (
            props.item.bill_type == 's' ||
            props.item.bill_type == 'sconres' ||
            props.item.bill_type == 'sjres' ||
            props.item.bill_type == 'sres'
        ) {
            switch (props.item.filtered_type) {
                case 'vetoed': {
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            Senate {'>'} House {'>'} President {'>'}
                            <Text style={{ color: '#953c51' }}> Vetoed</Text>
                        </Text>
                    );
                }
                case 'enacted': {
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            Senate {'>'} House {'>'} President {'>'}
                            <Text style={{ color: '#49853e' }}> Law</Text>
                        </Text>
                    );
                }
                case 'house':
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            Senate {'>'} House {'>'}
                            <Text style={{ color: '#988940' }}> President</Text>
                            <Text style={{ color: '#565e66' }}> {'>'} Law</Text>
                        </Text>
                    );
                default:
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            Senate {'>'}
                            <Text style={{ color: '#5597af' }}> House</Text>
                            <Text style={{ color: '#565e66' }}>
                                {' '}
                                {'>'} President {'>'} Law
                            </Text>
                        </Text>
                    );
            }
        } else {
            switch (props.item.filtered_type) {
                case 'vetoed': {
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            House {'>'} Senate {'>'} President {'>'}
                            <Text style={{ color: '#953c51' }}> Vetoed</Text>
                        </Text>
                    );
                }
                case 'enacted': {
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            House {'>'} Senate {'>'} President {'>'}
                            <Text style={{ color: '#49853e' }}> Law</Text>
                        </Text>
                    );
                }
                case 'senate': {
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            House {'>'} Senate {'>'}
                            <Text style={{ color: '#988940' }}> President</Text>
                            <Text style={{ color: '#565e66' }}> {'>'} Law</Text>
                        </Text>
                    );
                }
                default:
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            House {'>'}
                            <Text style={{ color: '#735a48' }}> Senate</Text>
                            <Text style={{ color: '#565e66' }}>
                                {' '}
                                {'>'} President {'>'} Law
                            </Text>
                        </Text>
                    );
            }
        }
    };

    const tabBackground = (props) => {
        switch (props.item.filtered_type) {
            case 'vetoed': {
                return '#953c51';
            }
            case 'enacted': {
                return '#49853e';
            }
            case 'senate': {
                return '#5597af';
            }
            default: {
                return '#735a48';
            }
        }
    };

    return (
        <View style={{ marginVertical: 15 }}>
            <View style={styles.itemContainer}>
                <View style={{ alignItems: 'center', flex: 2 }}>
                    <Text style={{ color: '#565e66', fontSize: 24, textAlign: 'center' }}>
                        {timestamp}
                    </Text>
                </View>
                <View style={{ flex: 7 }}>
                    <Text style={{ color: '#a7aaae', fontSize: 24 }}>{props.item.number}</Text>
                    <Text style={{ color: '#a7aaae' }}>{props.item.short_title}</Text>
                    <Text style={{ color: '#a7aaae', paddingTop: 15 }}>{billStatus(props)}</Text>
                </View>
            </View>
            <View style={[styles.boxContainer, { backgroundColor: tabBackground(props) }]}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#343e48',
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 15,
    },
    boxContainer: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: 15,
        marginHorizontal: 15,
        width: 75,
    },
});
