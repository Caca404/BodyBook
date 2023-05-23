import { SafeAreaView, Pressable, Keyboard, Text, TouchableOpacity } from 'react-native';
import { useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import styles from './styles';

export default function Event({navigation, context}) {

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.containerPressable}>
			<SafeAreaView style={styles.container}>
                <Text style={{color: 'white'}}>Olá, Perfil</Text>
                <TouchableOpacity style={styles.formSubmitLogin} onPress={() => { signOut() }}>
                    <Text style={styles.formTextSubmit}>Sair</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Pressable>
    );
};