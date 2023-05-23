import { View, Text, TouchableOpacity } from "react-native";
import DayExercise from "../DayExercise";

import styles from "./styles";

export default function WeekExercise(props){


    return (
        <View style={styles.body}>
            <View style={styles.divTitle}>
                <Text style={styles.titleWelcome}>Olá, </Text>
                <Text style={[styles.titleWelcome, styles.titleWelcomeName]}>{props.name}</Text>
            </View>
            <View style={styles.rowSpaced}>
                <Text style={{color: "white"}}>Sua atividade semanal</Text>
                <TouchableOpacity style={styles.buttonSeeMore}>
                    <Text style={{color: "white", fontSize: 10}}>Ver mais</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listedDays}>
                <DayExercise type="N"/>
                <DayExercise type="Y"/>
                <DayExercise type="N"/>
                <DayExercise type="Y"/>
                <DayExercise type="N"/>
                <DayExercise type="P"/>
                <DayExercise/>
            </View>
        </View>
    )
}