import { useState, useContext } from 'react';
import { ActivityIndicator, SafeAreaView, Pressable, Keyboard, Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import commomStyles from '../../../styles';
import Logo from '../../components/Logo';

export default function Login({navigation, context}) {

    const { signIn } = useContext(context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailEmptyError, setEmailEmptyError] = useState(false);
    const [passEmptyError, setPassEmptyError] = useState(false);

    const [isSubmited, setIsSubmited] = useState(false);

    async function logar(){
        
        setIsSubmited(true);

        if(validationAccount())
            await signIn({email, password});

        setIsSubmited(false);
    }

    function validationAccount(){

        if(isSubmited) return false;

        let isValid = true;

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

    function registrar(){ navigation.navigate('registrar'); }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.containerPressable}>
			<SafeAreaView style={styles.container}>
                <Logo />
                <View style={styles.formLogin}>
                    <Text style={styles.formLabel}>Login</Text>
                    <TextInput style={styles.formInput} returnKeyType="next" 
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailEmptyError(false);
                        }}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }} 
                        blurOnSubmit={false}/>
                    { emailEmptyError &&
                        <Text style={commomStyles.errorInput}>
                            Email está vazio.
                        </Text>
                    }

                    <Text style={styles.formLabel}>Senha</Text>
                    <TextInput style={styles.formInput} 
                        onChangeText={(text) => {
                            setPassword(text);
                            setPassEmptyError(false);
                        }}
                        ref={(input) => { this.secondTextInput = input; }}
                        secureTextEntry={true}
                        onSubmitEditing={logar}/>
                    { passEmptyError &&
                        <Text style={commomStyles.errorInput}>
                            Senha está vazio.
                        </Text>
                    }

                    <TouchableOpacity style={styles.formSubmitLogin} onPress={logar}>
                        { isSubmited
                            ? <ActivityIndicator color={'white'}/>
                            : <Text style={styles.formTextSubmit}>Entrar</Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.formSubmitRegister} onPress={registrar}>
                        <Text style={styles.formTextSubmit}>Fazer uma conta</Text>
                    </TouchableOpacity>
                </View>
			</SafeAreaView>
		</Pressable>
    );
}