import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import api from './src/services/api';
import moment from 'moment/moment';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import styles from './styles';

import Login from './src/pages/Login';
import Registrar from './src/pages/Registrar';

import Dashboard from './src/pages/Dashboard';
import Perfil from './src/pages/Perfil';
import Wiki from './src/pages/Wiki';
import Event from './src/pages/Event';
import Community from './src/pages/Community';

import ButtonEvent from './src/components/buttonEvent';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

	const AuthContext = React.createContext();

	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						isNewUser: action.newUser,
						userToken: action.token,
						isLoading: false,
					};
				case 'SIGN_UP':
					return {
						...prevState,
						isSignout: false,
						isNewUser: true,
						userToken: action.token,
					};
				case 'SIGN_IN':
					return {
						...prevState,
						isSignout: false,
						isNewUser: action.newUser,
						userToken: action.token,
					};
				case 'SIGN_OUT':
					return {
						...prevState,
						isSignout: true,
						isNewUser: action.newUser,
						userToken: null,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			isNewUser: false,
			userToken: null,
		}
	);

	React.useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let userToken;

			try {
				userToken = await SecureStore.getItemAsync('userToken');

				dispatch({ type: 'RESTORE_TOKEN', token: userToken });
			} catch (e) {
				// Restoring token failed
			}

			// After restoring token, we may need to validate it in production apps

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			
		};

		bootstrapAsync();
	}, []);

	const authContext = React.useMemo(() => ({
		signIn: async (data) => {
			// In a production app, we need to send some data (usually username, password) to server and get a token
			// We will also need to handle errors if sign in failed
			// After getting token, we need to persist the token using `SecureStore`
			// In the example, we'll use a dummy token

			let axiosConfig = {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					"Access-Control-Allow-Origin": "*",
				}
			};
			await api.post('api/login', {email: data.email, password: data.password}, axiosConfig)
				.then(async response => {
					const token = response.data.token;

					await SecureStore.setItemAsync('userToken', token);

					dispatch({ type: 'SIGN_IN', token: token });
				})
				.catch(error => alert(error.response.data));

			
		},
		signOut: async () => {

			let axiosConfig = {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					"Access-Control-Allow-Origin": "*",
					'Authorization': `Bearer ${await SecureStore.getItemAsync('userToken')}`
				}
			};
			await api.get('api/logout', axiosConfig)
				.then(async response => {

					await SecureStore.deleteItemAsync('userToken');

					dispatch({ type: 'SIGN_OUT' });
				})
				.catch(async error => {
					if(error.response.status == 401){
						await SecureStore.deleteItemAsync('userToken');

						dispatch({ type: 'SIGN_OUT' });
					}
					else console.log(error.response.data);
				});
		},
		signUp: async (data) => {
			// In a production app, we need to send user data to server and get a token
			// We will also need to handle errors if sign up failed
			// After getting token, we need to persist the token using `SecureStore`
			// In the example, we'll use a dummy token

			var dataPost = new FormData();
			dataPost.append('name', data.name);
			dataPost.append('email', data.email);
			dataPost.append('password', data.password);

			if(data.photo != null){

				let indexFormatPhoto = data.photo.uri.lastIndexOf('.');
				let formatPhoto = data.photo.uri.substring(indexFormatPhoto);

				dataPost.append('photo', {
					uri: data.photo.uri, 
					name: 'image-'+data.name+'-'+(moment().format('YYYY-MM-DD-HH-mm-ss'))+formatPhoto,
					type: 'image/'+formatPhoto
				});
			}
			else dataPost.append('photo', null);

			let axiosConfig = {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					"Access-Control-Allow-Origin": "*",
					'Content-Type': `multipart/form-data`
				}
			};

			await api.post('api/createUser', dataPost, axiosConfig)
				.then(async response => {

					const token = response.data.token;

					await SecureStore.setItemAsync('userToken', token);

					dispatch({ type: 'SIGN_IN', token: token });
				})
				.catch(error => {
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					}
				});
		},
	}), []);

	const PayScreenComponent = () => {
		return null
	}

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{state.userToken == null ? (
					<Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#2b2b2b' } }}>
						<Stack.Screen name='login'>
							{(props) => <Login {...props} context={AuthContext} />}
						</Stack.Screen>
						<Stack.Screen name='registrar'>
							{(props) => <Registrar {...props} context={AuthContext} />}
						</Stack.Screen>
					</Stack.Navigator>
				) : (
					<Tab.Navigator initialRouteName="dashboard" screenOptions={ ({ route, navigation }) => { 
						return {
							headerShown: false,
							tabBarShowLabel: false,
							tabBarInactiveBackgroundColor: '#161616', 
							tabBarActiveBackgroundColor: '#F7FD00',
							tabBarLabelStyle: navigation.isFocused() ? styles.itemActive :
								styles.itemInactive,
							tabBarStyle: {borderTopWidth: 0, height: 80, alignContent: 'center'}
						}
					}}>
						<Tab.Screen name='dashboard' options={{
							tabBarIcon: ({ focused }) => (
								<View style={{alignItems: 'center', justifyContent: 'center'}}>
									<FontAwesomeIcon icon={faHouse} size={26}
										color={focused ? 'black' : 'white'} />
									<Text style={
										{color: focused ? 'black' : 'white', fontSize: 10, marginTop: 5}}
									>Home</Text>
								</View>
							)
						}}>
							{(props) => <Dashboard {...props} context={AuthContext} />}
						</Tab.Screen>
						<Tab.Screen name="wiki" options={{
							tabBarLabel: "Wiki",
							tabBarIcon: ({ focused }) => (
								<View style={{alignItems: 'center', justifyContent: 'center'}}>
									<FontAwesomeIcon icon={faBook} size={26}
										color={focused ? 'black' : 'white'} />
									<Text style={
										{color: focused ? 'black' : 'white', fontSize: 10, marginTop: 5}}
									>Wiki</Text>
								</View>
							)
						}}>
							{(props) => <Wiki {...props} context={AuthContext} />}
						</Tab.Screen>
						<Tab.Screen name="event" component={PayScreenComponent} options={{
							tabBarButton: (props) => (<ButtonEvent {...props} context={AuthContext} />)
						}} />
						<Tab.Screen name="community" options={{
							tabBarLabel: "Comunidade",
							tabBarIcon: ({ focused }) => (
								<View style={{alignItems: 'center', justifyContent: 'center'}}>
									<FontAwesomeIcon icon={faUsers} size={30}
										color={focused ? 'black' : 'white'} />
									<Text style={
										{color: focused ? 'black' : 'white', fontSize: 10, marginTop: 5}}
									>Comunidade</Text>
								</View>
							)
						}}>
							{(props) => <Community {...props} context={AuthContext} />}
						</Tab.Screen>
						<Tab.Screen name='perfil' options={{
							tabBarLabel: "Perfil",
							tabBarIcon: ({focused}) => (
								<View style={{alignItems: 'center', justifyContent: 'center'}}>
									<FontAwesomeIcon icon={faUser} size={26}
										color={focused ? 'black' : 'white'} />
									<Text style={{color: focused ? 'black' : 'white', fontSize: 10, marginTop: 5}}>Perfil</Text>
								</View>
							)
						}}>
							{(props) => <Perfil {...props} context={AuthContext} />}
						</Tab.Screen>
					</Tab.Navigator>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
}