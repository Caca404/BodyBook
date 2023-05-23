import { View, Text } from "react-native";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import styles from "./styles";

export default function Logo(){

    return (
        <View style={styles.header}>
            <FontAwesomeIcon icon={faDumbbell} color="yellow"  size={32}/>
                <Text style={styles.titleApp}> BodyBook </Text>
            <FontAwesomeIcon icon={faDumbbell} color="yellow" size={32}/>
        </View>
    )
}