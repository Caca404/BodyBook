import { faBed, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text } from "react-native";

import styles from "./styles";

export default function DayExercise(props){

    let typeDay;

    switch (props.type) {
        case 'N':
            typeDay = (
                <View>
                    <Text style={styles.dayOfWeekCode}>{props.dayOfWeek ?? "N/A"}</Text>
                    <View style={[styles.hasntExercise, styles.dayOfWeek]}>
                        <FontAwesomeIcon icon={faBed} color={'white'} size={20} />
                    </View>
                </View>
            );
            break;
        case 'Y':
            typeDay = (
                <View>
                    <Text style={styles.dayOfWeekCode}>{props.dayOfWeek ?? "N/A"}</Text>
                    <View style={[styles.hasExercise, styles.dayOfWeek]}>
                        <FontAwesomeIcon icon={faCheck} color={'white'} size={20} />
                    </View>
                </View>
            );
            break;

        case 'P':
            typeDay = (
                <View>
                    <Text style={styles.dayOfWeekCode}>{props.dayOfWeek ?? "N/A"}</Text>
                    <View style={[styles.pendingExercise, styles.dayOfWeek]}>
                        <FontAwesomeIcon icon={faClock} color={'black'} size={20} />
                    </View>
                </View>
            );
            break;
    
        default:
            typeDay = (
                <View>
                    <Text style={styles.dayOfWeekCode}>{props.dayOfWeek ?? "N/A"}</Text>
                    <View style={[styles.notReachedExercise, styles.dayOfWeek]}></View>
                </View>
            );
            break;
    }

    return typeDay;
}