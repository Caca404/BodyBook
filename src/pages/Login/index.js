import { useEffect, useState, useContext, createContext } from 'react';
import { SafeAreaView, Pressable, Keyboard, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons/faDumbbell';
import styles from './styles';

export default function Login({navigation, context}) {

    const { signIn } = useContext(context);

    const [getCRSFToken, updateToken] = useState(true);

    useEffect(() => {

        async function getCRSFTokenFunction(){

            await AsyncStorage.clear();

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            };
            await api.get('sanctum/csrf-cookie', axiosConfig)
                .then(async response => {
                    await addCookieList(response["request"]["_lowerCaseResponseHeaders"]["set-cookie"]);
                    updateToken(false);
                })
                .catch(error => console.log(error));
        }

        getCRSFTokenFunction();

    }, [getCRSFToken]);

    function filterCookies(cookieString){
        var cookieList = [];
        var cookieResult = "";

        cookieString.split(',').forEach((cookie, index) => {
            
            cookieResult += cookie;

            if(index % 2 != 0){
                cookieList.push(cookieResult.trim());
                cookieResult = "";
            }
            else cookieResult += ",";

        });

        return cookieList;
    }

    async function addCookieList(cookieString){
        var cookies = filterCookies(cookieString);
        var cookiesSaved = await AsyncStorage.getItem('cookies');
        if(cookiesSaved)
            await AsyncStorage.setItem("cookies", JSON.stringify([...cookies, ...JSON.parse(cookiesSaved)]));
        else
            await AsyncStorage.setItem("cookies", JSON.stringify(cookies));
    }

    async function logar(){
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        await api.post('api/login', {email: "ara72@example.com", password: "password"}, axiosConfig)
            .then(async response => {
                await addCookieList(response["request"]["_lowerCaseResponseHeaders"]["set-cookie"]);
                navigation.navigate('dashboard');
            })
            .catch(error => console.log(error));
    }

    function registrar(){
        navigation.navigate('registrar');
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.containerPressable}>
			<SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <FontAwesomeIcon icon={faDumbbell} color="yellow"  size={32}/>
                    <Text style={styles.titleApp}> BodyBook </Text>
                    <FontAwesomeIcon icon={faDumbbell} color="yellow" size={32}/>
                </View>
                <View style={styles.formLogin}>
                    <Text style={styles.formLabel}>Login</Text>
                    <TextInput style={styles.formInput} returnKeyType="next" 
                        onSubmitEditing={() => { this.secondTextInput.focus(); }} 
                        blurOnSubmit={false}/>

                    <Text style={styles.formLabel}>Senha</Text>
                    <TextInput style={styles.formInput} 
                        ref={(input) => { this.secondTextInput = input; }}
                        secureTextEntry={true}
                        onSubmitEditing={logar}/>

                    <TouchableOpacity style={styles.formSubmitLogin} onPress={logar}>
                        <Text style={styles.formTextSubmit}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.formSubmitRegister} onPress={registrar}>
                        <Text style={styles.formTextSubmit}>Fazer uma conta</Text>
                    </TouchableOpacity>
                </View>
			</SafeAreaView>
		</Pressable>
    );
}