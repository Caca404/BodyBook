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
    }
});

export default styles;