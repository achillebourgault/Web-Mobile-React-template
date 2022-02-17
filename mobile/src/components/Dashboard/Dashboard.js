import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import HeaderScreen from "./HeaderScreen";

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.main}>
                <HeaderScreen title={"React Native Template"} />
                <Text style={styles.mainTitle}>Let's start to code !</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        padding: 18
    },
    mainTitle: {
        fontSize: 22
    }
})
