import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment/moment';

export function Bill(props) {
    let timestamp = moment(props.item.filtered_date).format('DD MMM');

    const bill_status = (props) => {
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
                            Senate {'>'} House {'>'} To President {'>'}
                            <Text style={{ color: '#953c51' }}> Vetoed</Text>
                        </Text>
                    );
                }
                case 'enacted': {
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            Senate {'>'} House {'>'} To President {'>'}
                            <Text style={{ color: '#49853e' }}> Became Law</Text>
                        </Text>
                    );
                }
                case 'house':
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            Senate {'>'} House {'>'}
                            <Text style={{ color: '#988940' }}> To President</Text>
                            <Text style={{ color: '#565e66' }}> {'>'} Became Law</Text>
                        </Text>
                    );
                default:
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            Senate {'>'}
                            <Text style={{ color: '#5597af' }}> House</Text>
                            <Text style={{ color: '#565e66' }}>
                                {' '}
                                {'>'} To President {'>'} Became Law
                            </Text>
                        </Text>
                    );
            }
        } else {
            switch (props.item.filtered_type) {
                case 'vetoed': {
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            House {'>'} Senate {'>'} To President {'>'}
                            <Text style={{ color: '#953c51' }}> Vetoed</Text>
                        </Text>
                    );
                }
                case 'enacted': {
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            House {'>'} Senate {'>'} To President {'>'}
                            <Text style={{ color: '#49853e' }}> Became Law</Text>
                        </Text>
                    );
                }
                case 'senate': {
                    return (
                        <Text style={{ color: '#a7aaae' }}>
                            House {'>'} Senate {'>'}
                            <Text style={{ color: '#988940' }}> To President</Text>
                            <Text style={{ color: '#565e66' }}> {'>'} Became Law</Text>
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
                                {'>'} To President {'>'} Became Law
                            </Text>
                        </Text>
                    );
            }
        }
    };

    return (
        <View style={{ marginVertical: 15 }}>
            <View style={styles.container}>
                <View style={{ alignItems: 'center', flex: 2 }}>
                    <Text style={{ color: '#565e66', fontSize: 24, textAlign: 'center' }}>
                        {timestamp}
                    </Text>
                </View>
                <View style={{ flex: 7 }}>
                    <Text style={{ color: '#a7aaae', fontSize: 24 }}>{props.item.number}</Text>
                    <Text style={{ color: '#a7aaae' }}>{props.item.title}</Text>
                    <Text style={{ color: '#a7aaae', paddingTop: 15 }}>{bill_status(props)}</Text>
                </View>
            </View>
            <View style={styles.boxContainer}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#343e48',
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        padding: 5,
        marginHorizontal: 15,
    },
    boxContainer: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: 10,
        marginHorizontal: 15,
        width: 75,
    },
});
