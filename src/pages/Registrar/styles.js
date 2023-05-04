import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    titleApp:{
      color: "#fff",
      fontWeight: "bold",
      fontSize: 30,
    },
    titleAppHalter:{
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent:'center'
    }, 
    title:{
      color: "#fff",
      fontWeight: "bold",
      fontSize: 22
    },
    header:{
        flexDirection: "column", 
        alignItems: "flex-start",
        marginLeft: 18
    },
    container: {
		flex: 1,
		backgroundColor: '#2b2b2b',
		paddingTop: Platform.OS == "android" ? 40 : 0,
	},
    containerPressable:{
        flex: 1,
		backgroundColor: '#2b2b2b'
    },
    formLogin:{
        width: "100%",
        marginTop: 50,
        height: "auto",
        padding: 15,
        justifyContent:"center"
    },
    formLabel: {
        color: "#fff",
        fontSize: 16,
        paddingLeft: 20,
        fontWeight: 600
    },
    formInput: {
        borderRadius: 10,
        borderColor: "#ffffff",
        backgroundColor: "#3b3b3b",
        color: "#fff",
        height: 40,
        marginHorizontal: 12,
        marginBottom: 15,
        marginTop: 8,
        borderWidth: 2,
        paddingLeft: 10
    },
    formSubmitRegister:{
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3e08bd",
        paddingTop: 14,
        paddingBottom: 14,
        marginHorizontal: 12,
        marginTop: 30
    },
    formTextSubmit:{
        color: "#fff",
        fontSize: 16,
        fontWeight: 900
    },
    buttonImageInput: {
        width: 125,
        height: 125,
        backgroundColor: "#fff",
        borderRadius: 100,
        alignSelf: "center",
        marginBottom: 35
    },
    imageInput:{
        width: 125,
        height: 125
    },
    textImageInput:{
        position: "relative",
        top: '-25%',
        right: '-70%',
        margin: 0,
        zIndex: 11000
    }
});

export default styles;