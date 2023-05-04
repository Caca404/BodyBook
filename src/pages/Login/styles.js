import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2b2b2b',
		paddingTop: Platform.OS == "android" ? 120 : 0,
	},
    containerPressable:{
        flex: 1,
		backgroundColor: '#2b2b2b'
    },
    titleApp:{
      color: "#fff",
      fontWeight: "bold",
      fontSize: 30,
    },
    header:{
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent:'center'
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
    formSubmitLogin:{
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3e08bd",
        paddingTop: 14,
        paddingBottom: 14,
        marginHorizontal: 12,
        marginTop: 60
    },
    formSubmitRegister:{
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        paddingTop: 14,
        paddingBottom: 14,
        marginHorizontal: 12,
        marginTop: 30
    },
    formTextSubmit:{
        color: "#fff",
        fontSize: 16,
        fontWeight: 900
    }
});

export default styles;