import { SafeAreaView, Pressable, Keyboard, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { IMAGENAME } from '../../components/images';
import { useEffect } from 'react';

export default function Registrar() {


    useEffect(() => {
        async function lookCookies(){
            console.log(await AsyncStorage.getItem('cookies'));
        }

        lookCookies();

    }, []);

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.containerPressable}>
			<SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.header}>
                        <View style={styles.titleAppHalter}>
                            <FontAwesomeIcon icon={faDumbbell} color="yellow" size={32}/>
                            <Text style={styles.titleApp}> BodyBook </Text>
                            <FontAwesomeIcon icon={faDumbbell} color="yellow" size={32}/>
                        </View>
                        <Text style={styles.title}> Preencha seus dados! :D </Text>
                    </View>
                    <View style={styles.formLogin}>
                        <TouchableOpacity style={styles.buttonImageInput}>
                            <Image style={styles.imageInput} source={IMAGENAME}/>
                            <FontAwesomeIcon icon={faPlusCircle} style={styles.textImageInput} color='yellow' size={32}/>
                        </TouchableOpacity>

                        <Text style={styles.formLabel}>Nome de usuário</Text>
                        <TextInput style={styles.formInput} returnKeyType="next" 
                            ref={(input) => { this.secondTextInput = input; }}
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }} 
                            blurOnSubmit={false}/>

                        <Text style={styles.formLabel}>Email</Text>
                        <TextInput style={styles.formInput} returnKeyType="next" 
                            keyboardType='email-address'
                            ref={(input) => { this.thirdTextInput = input; }}
                            onSubmitEditing={() => { this.fourthTextInput.focus(); }} 
                            blurOnSubmit={false}/>

                        <Text style={styles.formLabel}>Senha</Text>
                        <TextInput style={styles.formInput}
                            ref={(input) => { this.fourthTextInput = input; }}
                            secureTextEntry={true}
                            onSubmitEditing={() => {}}/>

                        <TouchableOpacity style={styles.formSubmitRegister}>
                            <Text style={styles.formTextSubmit}>Criar Conta</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </Pressable>
    );
}