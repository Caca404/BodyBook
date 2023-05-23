import { SafeAreaView, Pressable, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import styles from './styles';
import Logo from '../../components/Logo';
import WeekExercise from '../../components/WeekExercise';
import api from "../../services/api"; 

export default function Dashboard({navigation}) {

    const [name, setName] = useState("");
    const [weekExercises, setWeekExercises] = useState([]);

    useEffect(() => {
        async function lookCookies(){
            console.log(await SecureStore.getItemAsync('userToken'));
        }

        async function getUserWeekExercises(){
            let axiosConfig = {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					"Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer "+(await SecureStore.getItemAsync('userToken'))
				}
			};


            await api.get("api/userWeekExercises", axiosConfig).
                then(response => {
                    setName(response.data.name);
                    setWeekExercises(response.data.weekExercises);
                }).
                catch(error => console.log(error.response.data));
        }

        lookCookies();

        getUserWeekExercises();

    }, []);

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.containerPressable}>
			<SafeAreaView style={styles.container}>
                <Logo />
                <WeekExercise name={name} exercises={weekExercises} />
            </SafeAreaView>
        </Pressable>
    );
}