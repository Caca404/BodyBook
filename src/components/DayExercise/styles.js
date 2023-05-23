import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    dayOfWeek:{
        borderRadius: 7,
        width: 30,
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    dayOfWeekCode:{
        color: "white",
        fontWeight: 900
    },
    hasntExercise:{
        backgroundColor: '#263CFF'
    },
    hasExercise:{
        backgroundColor: '#00B132'
    },
    pendingExercise:{
        backgroundColor: '#F7FD00'
    },
    notReachedExercise:{
        backgroundColor: '#646464'
    }
});

export default styles;