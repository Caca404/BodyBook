import { SafeAreaView, Pressable, Keyboard, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IMAGENAME } from '../../components/images';
import { useContext, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function Registrar({navigation, context}) {

    const {signUp} = useContext(context);

    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        setPhoto(result.assets[0].uri);
    };

    useEffect(() => {
        async function lookCookies(){
            console.log(await SecureStore.getItemAsync('userToken'));
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
                        <TouchableOpacity style={styles.buttonImageInput} onPress={handleChoosePhoto}>
                            {
                                !photo ? <Image style={styles.imageInput} source={IMAGENAME}/> 
                                : <Image style={styles.imageInput} source={{uri: photo}}/> 
                            }
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