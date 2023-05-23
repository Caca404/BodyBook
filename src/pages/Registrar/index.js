import { ActivityIndicator, SafeAreaView, Pressable, Keyboard, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import commomStyles from '../../../styles';
import * as SecureStore from 'expo-secure-store';
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
    
    const [nameEmptyError, setNameEmptyError] = useState(false);
    const [emailInvalidError, setEmailInvalidError] = useState(false);
    const [emailEmptyError, setEmailEmptyError] = useState(false);
    const [passEmptyError, setPassEmptyError] = useState(false);

    const [isSubmited, setIsSubmited] = useState(false);

    const handleChoosePhoto = async () => {
        let permissions = (await ImagePicker.getMediaLibraryPermissionsAsync());

        if(permissions.status != "granted"){
            if(!permissions.canAskAgain){
                alert('Permita a manipulação de midia pelas permissões do app.');
                return;
            }

            let getMediaLibraryPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(getMediaLibraryPermissions.status != "granted") return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled){
            console.log(result.assets[0]);
            setPhoto(result.assets[0]);
        }
        
    };

    async function criarConta(){
        setIsSubmited(true);
        
        if(validationAccount())
            await signUp({
                name, 
                email, 
                password, 
                photo
            });

        setIsSubmited(false);
    }

    function validationAccount(){

        if(isSubmited) return false;

        let isValid = true;

        if(name == ""){
            isValid = false;
            setNameEmptyError(true);
        }
        else setNameEmptyError(false);

        if(email == ""){
            isValid = false;
            setEmailEmptyError(true);
        }
        else setEmailEmptyError(false);

        if(password == ""){
            isValid = false;
            setPassEmptyError(true);
        }
        else setPassEmptyError(false);

        return isValid;
    }

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
                                : <Image style={styles.imageInput} source={{uri: photo.uri}}/> 
                            }
                            <FontAwesomeIcon icon={faPlusCircle} style={styles.textImageInput} color='yellow' size={32}/>
                        </TouchableOpacity>

                        <Text style={styles.formLabel}>Nome de usuário</Text>
                        <TextInput style={styles.formInput} returnKeyType="next" 
                            ref={(input) => { this.secondTextInput = input; }}
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }} 
                            blurOnSubmit={false}
                            onChangeText={setName} />
                        { nameEmptyError && 
                            <Text style={commomStyles.errorInput}>
                                Nome de usuário está vazio.
                            </Text>
                        }

                        <Text style={styles.formLabel}>Email</Text>
                        <TextInput style={styles.formInput} returnKeyType="next" 
                            keyboardType='email-address'
                            ref={(input) => { this.thirdTextInput = input; }}
                            onSubmitEditing={() => { this.fourthTextInput.focus(); }} 
                            blurOnSubmit={false}
                            onChangeText={setEmail} />
                        { emailEmptyError && 
                            <Text style={commomStyles.errorInput}>
                                Email está vazio.
                            </Text>
                        }

                        <Text style={styles.formLabel}>Senha</Text>
                        <TextInput style={styles.formInput}
                            ref={(input) => { this.fourthTextInput = input; }}
                            secureTextEntry={true}
                            onSubmitEditing={criarConta}
                            onChangeText={setPass} />
                        { passEmptyError && 
                            <Text style={commomStyles.errorInput}>
                                Nome de usuário está vazio.
                            </Text>
                        }

                        <TouchableOpacity style={styles.formSubmitRegister} onPress={criarConta}>
                            { isSubmited
                                ? <ActivityIndicator color={'white'}/>
                                : <Text style={styles.formTextSubmit}>Criar Conta</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </Pressable>
    );
}