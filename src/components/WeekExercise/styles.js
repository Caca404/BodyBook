import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    body:{
        backgroundColor: '#202020',
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        marginTop: 30,
        marginHorizontal: 18,
        padding: 20
    },
    divTitle:{
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: 'white',
    },
    titleWelcome: {
        fontSize: 20,
        paddingBottom: 5,
        color: "white",
        paddingBottom: 8
    },
    titleWelcomeName:{
        fontStyle: "italic"
    },
    rowSpaced:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    buttonSeeMore: {
        borderColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        padding: 3,
        backgroundColor: '#202020',
        color: "white"
    },
    listedDays: {
        marginTop: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    }

});

export default styles;