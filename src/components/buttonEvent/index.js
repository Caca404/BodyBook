import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity, View } from "react-native";
import { useEffect } from "react";

export default function ButtonEvent({navigation}){

    function addEvent(){
        alert('Olá');
    }

    return (
        <View style={{backgroundColor: '#161616', justifyContent: "center"}}>
            <TouchableOpacity style={{paddingHorizontal: 15}}
                onPress={addEvent}>
                <FontAwesomeIcon icon={faCirclePlus} color='#F7FD00' size={50}/>
            </TouchableOpacity>
        </View>
    );
}