import { SafeAreaView, Pressable, Keyboard, Text, TouchableOpacity,Image, View } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import styles from './styles';
import { IMAGENAME } from '../../components/images';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';
import moment from 'moment/moment';

export default function Perfil({navigation, context}) {

    const { signOut } = useContext(context);

    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [neck, setNeck] = useState(0);
    const [waist, setWaist] = useState(0);
    const [hip, setHip] = useState(0);
    const [imc, setIMC] = useState(0);
    const [bodyFat, setBodyFat] = useState(0);

    function rangeIMC(imc){
        if(imc < 18.5) return "Baixo Peso";
        else if(imc > 40) return "Obesidade Mórbida";
        else if(imc >= 18.5 && imc < 25) return "Peso Normal";
        else if(imc >= 25 && imc < 30) return "Sobrepeso";
        else if(imc >= 30 && imc < 35) return "Obesidade Grau I";
        else return "Obesidade severa";
    }

    function calcBodyFat(height, neck, waist, hip){
        let masculineBodyFat = 1.0324 - 0.19077*Math.log10(waist-neck)+0.15456*Math.log10(height);
        masculineBodyFat = (495/masculineBodyFat)-450;

        return (masculineBodyFat).toFixed(2);
    }

    function rangeBodyFat(bodyFat){
        if(bodyFat < 6) return "Essential fat";
        else if(bodyFat >= 25) return "Obese";
        else if(bodyFat >= 18 && bodyFat < 25) return "Average";
        else if(bodyFat >= 14 && bodyFat < 18) return "Fitness";
        else return "Athletes";
    }

    useEffect(() => {

        async function getLastBodyStatus(){
            let axiosConfig = {
				headers: {
					"Access-Control-Allow-Origin": "*",
					'Content-Type': 'application/json;charset=UTF-8',
					'Authorization': `Bearer ${await SecureStore.getItemAsync('userToken')}`
				}
			};

            await api.get('api/lastBodyStatus', axiosConfig)
                .then(response => {
                    let respostaData = response.data;

                    setName(respostaData.name);
                    setBirthDate(respostaData.birthDate);

                    setHeight(respostaData.statusBody[0].height);
                    setWeight(respostaData.statusBody[0].weight);
                    setNeck(respostaData.statusBody[0].neck);
                    setWaist(respostaData.statusBody[0].waist);
                    setHip(respostaData.statusBody[0].hip);

                    setIMC((weight/Math.pow(height, 2)).toFixed(2));
                    setBodyFat(calcBodyFat(height, neck, waist, hip));
                })
                .catch(error => console.log(error.response.data));
        }

        getLastBodyStatus();
    }, []);

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.containerPressable}>
			<SafeAreaView style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.configCog}>
                        <FontAwesomeIcon icon={faCog} color='white' size={20} />
                    </View>
                    <View style={styles.divPhoto}>
                        <Image style={styles.photo} source={IMAGENAME} />
                        <FontAwesomeIcon icon={faPlusCircle} style={styles.addImageButton} color='yellow' size={32}/>
                    </View>
                    <View style={styles.textCenter}>
                        <Text style={{color: "white", fontSize: 20}}>{name}</Text>
                        <Text style={{color: "white", fontSize: 10, fontStyle: "italic"}}>
                            Ciclismo: 1300 horas
                        </Text>
                    </View>
                    <Text style={styles.perfilStatus}>Status do Corpo</Text>
                    <View style={{marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: "space-around"}}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleBodyStatus}>
                                Altura 
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                {height} cm
                            </Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleBodyStatus}>
                                Peso 
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                {weight} Kg
                            </Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleBodyStatus}>
                                Idade 
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                {moment().diff(birthDate, 'years')} anos
                            </Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleBodyStatus}>
                                IMC 
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                {rangeIMC(imc)} 
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                {imc}
                            </Text>
                        </View>
                    </View>
                    <View style={{marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: "space-around"}}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleBodyStatus}>
                                Pescoço 
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                {neck} cm
                            </Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleBodyStatus}>
                                Cintura 
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                {waist} cm
                            </Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleBodyStatus}>
                                Quadril 
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                {hip} cm
                            </Text>
                        </View>
                    </View>
                    <View style={{marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: "space-around"}}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleBodyStatus}>
                                Body Fat (%) 
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                {rangeBodyFat(bodyFat)}
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                ({bodyFat} %)
                            </Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleBodyStatus}>
                                Body Fat 
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                {((bodyFat/100)*weight).toFixed(2)} Kg
                            </Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleBodyStatus}>
                                Lean Mass 
                            </Text>
                            <Text style={styles.valueBodyStatus}>
                                {(weight - (bodyFat/100)*weight).toFixed(2)} Kg
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.formSubmitLogin} onPress={() => { signOut() }}>
                        <Text style={styles.formTextSubmit}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Pressable>
    );
};