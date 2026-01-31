import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2b2b2b',
      paddingTop: Platform.OS == "android" ? 40 : 0,
    },
    containerPressable:{
        flex: 1,
		backgroundColor: '#2b2b2b'
    },
    body:{
        backgroundColor: '#202020',
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        marginHorizontal: 18,
        padding: 20
    },
    textCenter:{
        display: "flex",
        alignItems: "center"
    },
    configCog:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    photo:{
        width: 125,
        height: 125
    },
    divPhoto: {
        marginTop: 10,
        width: 125,
        height: 125,
        backgroundColor: "#fff",
        borderRadius: 100,
        alignSelf: "center",
        marginBottom: 15
    },
    addImageButton:{
        position: "relative",
        top: '-25%',
        right: '-70%',
        margin: 0,
        zIndex: 11000
    },
    perfilStatus:{
        borderBottomColor: "white", 
        borderBottomWidth: 1, 
        color: "white",
        marginTop: 20,
        fontSize: 16,
        fontWeight: 600
    },
    formTextSubmit:{
        color: "#fff",
        fontSize: 16,
        fontWeight: 900
    },
    formSubmitLogin:{
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3e08bd",
        paddingTop: 14,
        paddingBottom: 14,
        marginTop: 60
    },
    valueBodyStatus:{
        color: 'white', 
        fontSize: 12
    },
    titleBodyStatus: {
        color: 'white', 
        fontSize: 15, 
        fontWeight: 500
    }
});

export default styles;