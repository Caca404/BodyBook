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
        marginHorizontal: 12,
        marginTop: 60
    }
});

export default styles;