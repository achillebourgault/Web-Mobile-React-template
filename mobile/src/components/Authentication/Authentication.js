import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

const actionColor = "#04151F";

export default class Authentication extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentView: 'login',
            email: '',
            password: '',
            username: '',
            errorMsg: '',
            serverAddress: '',
            serverIsReachable: false
        }
    }

    onRequestRegister = async () => {
        if (this.state.email == '' || this.state.password == '' || this.state.username == '') {
            this.setState({errorMsg: 'You must provide credentials.'})
            return;
        }

        await fetch("http://"+ this.state.serverAddress +":8080/users/create", {
            method: "POST",
            body: JSON.stringify(
                {
                    "email": this.state.email,
                    "password": this.state.password,
                    "username": this.state.username
                },),
            headers: {
                'X-User-Agent': 'area / 1.0.0',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.text())
            .then((reply) => {
                const data = JSON.parse(reply);
                if (data['uuid'] != null) {
                    console.log('User uuid is: ' + data['uuid'])
                    this.props.update(data['uuid']);
                } else
                    this.setState({errorMsg: 'Oops :('})
            })
    }

    onRequestConnect = async () => {
        if (this.state.email == '' || this.state.password == '') {
            this.setState({errorMsg: 'You must provide credentials.'})
            return;
        }

        await fetch("http://"+ this.state.serverAddress +":8080/users/login", {
            method: "POST",
            body: JSON.stringify(
                {
                    "email": this.state.email,
                    "password": this.state.password
                },),
            headers: {
                'X-User-Agent': 'area / 1.0.0',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.text())
            .then((reply) => {
                const data = JSON.parse(reply);
                if (data['uuid'] != null) {
                    console.log('User uuid is: ' + data['uuid'])
                    this.props.update(data['uuid']);
                } else
                    this.setState({errorMsg: 'Canno\'t connect, check your credentials'})
            })
    }

    render() {
        return (
            <View style={styles.authenthBg}>
                <Text style={styles.firstLabel}>React Native Template</Text>

                {
                    this.state.currentView == 'login' ?
                        <View style={styles.loginSection}>

                            <View style={styles.headerSection}>
                                <Text style={styles.sectionDescription}>Please login to your account.</Text>
                            </View>

                            <View style={styles.formSection}>
                                <TextInput
                                    onChangeText={newEmail => this.setState({email: newEmail})}
                                    style={styles.input}
                                    placeholder={"Email"} />
                                <TextInput
                                    onChangeText={newPassword => this.setState({password: newPassword})}
                                    style={styles.input}
                                    placeholder={"Password"} />

                                {this.state.errorMsg != '' ? <Text style={{color: 'red'}}>{this.state.errorMsg}</Text> : <View />}

                                <View style={styles.footerSection}>
                                    <View style={{backgroundColor: actionColor, width: 300, height: 60, marginBottom: 30, borderRadius: 52, display: 'flex', justifyContent: 'center'}}>
                                        <Pressable onPress={this.onRequestConnect}><Text style={styles.labelAction}>Connect</Text></Pressable>
                                    </View>
                                    <View>
                                        <Pressable onPress={() => this.setState({currentView: 'register'})}>
                                            <Text style={styles.secondaryAction}>Don't have an account ? <Text style={{color: actionColor, fontWeight: '500'}}>Create one here</Text></Text>
                                        </Pressable>
                                    </View>
                                </View>

                            </View>
                        </View>
                        :
                        <View style={styles.registerSection}>

                            <View style={styles.headerSection}>
                                <Text style={styles.sectionDescription}>Create an account</Text>
                            </View>

                            <View style={styles.formSection}>
                                <TextInput
                                    onChangeText={newUsername => this.setState({username: newUsername})}
                                    style={styles.input}
                                    placeholder={"Username"} />
                                <TextInput
                                    onChangeText={newEmail => this.setState({email: newEmail})}
                                    style={styles.input}
                                    placeholder={"Email"} />
                                <TextInput
                                    onChangeText={newPassword => this.setState({password: newPassword})}
                                    style={styles.input}
                                    placeholder={"Password"} />

                                <View style={styles.footerSection}>
                                    <View style={{backgroundColor: actionColor, width: 300, height: 60, marginBottom: 30, borderRadius: 52, display: 'flex', justifyContent: 'center'}}>
                                        <Pressable onPress={this.onRequestRegister}><Text style={styles.labelAction}>Create my account</Text></Pressable>
                                    </View>
                                    <View>
                                        <Pressable onPress={() => this.setState({currentView: 'login'})}>
                                            <Text style={styles.secondaryAction}>Already have an account ? <Text style={{color: actionColor, fontWeight: '500'}}>Connect here</Text></Text>
                                        </Pressable>
                                    </View>
                                </View>

                            </View>

                        </View>
                }

            </View>
        );
    }

}

const styles = StyleSheet.create({
    authenthBg: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        backgroundColor: actionColor
    },
    firstLabel: {
        fontSize: 55,
        fontWeight: "500",
        color: "#F0F0F0",
        marginTop: 50,
        marginBottom: 20

    },
    headerSection: {
        marginTop: 20,
        padding: 35,
        paddingBottom: 0
    },
    formSection: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 25
    },
    sectionDescription: {
        fontSize: 19,
        fontWeight: "400",
        textAlign: "left",
        color: actionColor
    },
    loginSection: {
        backgroundColor: 'white',
        borderRadius: 60,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: '100%',
        height: '100%',
        marginTop: 25,
    },
    registerSection: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 60,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: '100%',
        height: '100%',
        marginTop: 25
    },
    input: {
        marginTop: 18,
        marginBottom: 18,
        backgroundColor: "#F0F0F0",
        width: 320,
        height: 60,
        borderRadius: 12,
        paddingLeft: 15,
        paddingRight: 15,
    },
    labelAction: {
        textAlign: "center",
        color: 'white',
        fontWeight: '500',
    },
    secondaryAction: {
        textAlign: "center",
    },
    footerSection: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 40
    }


})
