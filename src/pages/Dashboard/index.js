import { SafeAreaView, Pressable, Keyboard, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { useEffect } from 'react';

export default function Dashboard() {


    useEffect(() => {
        async function lookCookies(){
            console.log(await AsyncStorage.getItem('cookies'));
        }

        lookCookies();

    }, []);

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.containerPressable}>
			<SafeAreaView style={styles.container}>
                <Text>Olá</Text>
            </SafeAreaView>
        </Pressable>
    );
}