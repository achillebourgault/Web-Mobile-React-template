import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import HeaderScreen from '../Dashboard/HeaderScreen';
import {encode} from 'base-64'
import LinearGradient from 'react-native-linear-gradient';

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'John Doe',
                email: 'example@gmail.com',
            }
        }
    }

    render() {
        return (
            <View style={styles.main}>
                <HeaderScreen title={"My profile"} />
                <View style={{margin: 4, padding: 8, paddingLeft: 18}}>
                    <Text style={styles.mainTitle}>Configure your account.</Text>
                </View>

                <LinearGradient
                    colors={['#3c5573', '#173249']}
                    start={{ x: 1.0, y: 0.25 }}
                    end={{ x: 0.2, y: 3.0 }}
                    locations={[0, 0.5]}
                    style={{
                        backgroundColor: '#1d3e5e',
                        borderRadius: 22,
                        borderTopLeftRadius: 65,
                        borderBottomRightRadius: 65,
                        marginTop: 20,
                        marginBottom: 25,
                        marginLeft: 42,
                        marginRight: 42,
                        height: '23%',
                    }}
                >
                    <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: 12, marginBottom: 12}}>
                        <Image
                            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcWa7nAAU9ZdA1poLmbvq_Lv6R49soYzGplA&usqp=CAU'}}
                            style={styles.userIcon}
                        />
                        <Text style={styles.userName}>{this.state.user.name}</Text>
                        <Text style={styles.userEmail}>{this.state.user.email}</Text>
                    </View>
                </LinearGradient>

                <View style={{
                    backgroundColor: 'white',
                    borderTopLeftRadius: 52,
                    borderTopRightRadius: 52,
                    marginTop: 20,
                    marginBottom: 92,
                    height: '100%'
                }}>

                </View>

            </View>
        );
    }

    getToken (webViewState, newNavState) {
        let url = webViewState.url;
        if (url.startsWith('http://fredericlw.me/redditech/') && !codeReceived) {
            console.log(url);
            url = url.substr(50);
        } else {
            return '';
        }
        let authCode = url.substr(0, url.length - 2);
        console.log(authCode)
        let details = {
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: 'http://fredericlw.me/redditech/'
        };
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const toEncode = configs.reddit.clientId + ':' + configs.reddit.clientSecret;
        const basicAuth = 'Basic ' + encode(toEncode);
        fetch(configs.reddit.tokenEndpoint, {
            method: 'POST',
            headers: {
                'X-User-Agent' : 'reddi / 1.0.0 comment',
                'Authorization': basicAuth,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((reply) => reply.json())
            .then((json) => {
                console.log(json)
                configs.reddit.accessToken = json['access_token'];
                configs.reddit.refreshToken = json['refresh_token'];
                console.log(configs.reddit.accessToken)
            })
            .catch((error) => {
                console.error(error);
            })
    }

}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        padding: 18,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: '#04151F'
    },
    mainTitle: {
        fontSize: 16,
        color: '#f0f0f0'
    },
    userIcon: {
        borderRadius: 55,
        height: 68,
        width: 68,
    },
    userName: {
        fontSize: 19,
        color: '#f0f0f0',
        fontWeight: '700',
        marginTop: 12
    },
    userEmail: {
        fontSize: 16,
        color: '#b4b4b4',
        marginTop: 8,
        marginBottom: 2
    },
    servicePan: {
        backgroundColor: 'rgba(180,180,180,0.75)',
        borderRadius: 14,
        padding: 18,
        marginTop: 12,
        flexDirection: 'row'
    },
    serviceContent: {
        marginTop: 4,
        width: '60%',
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexDirection: 'row'
    },
    modal: {
        backgroundColor: '#e0e0e0',
        width: '100%',
        height: '100%',
        zIndex: 3,
        position: 'absolute'
    }
})

export const configs = {
    reddit: {
        clientId: 'VfY-ts6W8kLh3GozH_4kLw',
        clientSecret: 'GXCNNfe21LN1ZfhfvPT0UWxjtzB29Q',
        authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact' +
            '?client_id=VfY-ts6W8kLh3GozH_4kLw' +
            '&response_type=code' +
            '&state=coucou' +
            '&redirect_uri=http://fredericlw.me/redditech/' +
            '&duration=permanent' +
            '&scope=identity mysubreddits account read',
        tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
        accessToken: '',
        refreshToken: ''
    }
};
