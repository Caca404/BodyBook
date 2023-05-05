import { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Pressable, Keyboard, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons/faDumbbell';
import styles from './styles';

export default function Login({navigation, context}) {

    const { signIn } = useContext(context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function logar(){
        signIn({email, password});
    }

    function registrar(){ navigation.navigate('registrar'); }

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
                        onChangeText={(text) => setEmail(text)}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }} 
                        blurOnSubmit={false}/>

                    <Text style={styles.formLabel}>Senha</Text>
                    <TextInput style={styles.formInput} 
                        onChangeText={(text) => setPassword(text)}
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