import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Ionicons from "react-native-vector-icons/Ionicons";

const actionColor = "#04151F";

export default class HeaderScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{marginTop: 2, display: 'flex', flexDirection: 'row', width: '100%'}}>

                <View style={{display: 'flex', justifyContent: 'flex-start', width: '58%', paddingLeft: 16}}>
                    <Text style={styles.mainTitle}>{this.props.title}</Text>
                </View>

                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'flex-end',
                    width: '50%',
                    flexDirection: 'row'
                }}>
                    <Pressable>
                        <View
                            style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', width: '90%'}}>
                            <View style={{display: 'flex', justifyContent: 'center', marginRight: 10}}>
                                <Text style={{fontWeight: "600", color: 'white'}}>My Account</Text>
                            </View>
                            <View style={{display: 'flex', justifyContent: 'center', marginRight: 20}}>
                                <Ionicons name={'ios-person-circle-sharp'} size={40} color={'#04A777'}/>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    main: {
        margin: 12,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        borderRadius: 18,
    },
    mainBg: {
        display: 'flex',
        marginTop: 20,
        borderRadius: 18,
        opacity: 0.95,
        height: '89%',
    },
    mainTitle: {
        fontFamily: 'Roboto',
        fontWeight: "500",
        color: '#f0f0f0',
        textAlign: 'left',
        fontSize: 22,
        margin: 2
    },
    UserPostsView: {
        padding: 30,
        paddingTop: 2,
        position: "absolute",
        top: 70,
        right: 0,
        left: 0,
        bottom: 0,
        paddingLeft: 25,
        paddingRight: 25,
        height: 600,
    },
    subView: {
        backgroundColor: 'rgba(135,141,134,0.58)',
        marginBottom: 13,
        padding: 25,
        borderRadius: 8,
    },
})
