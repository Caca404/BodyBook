import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from 'expo-secure-store';
import api from './src/services/api';
import moment from 'moment/moment';

import Login from './src/pages/Login';
import Registrar from './src/pages/Registrar';
import Dashboard from './src/pages/Dashboard';

const Stack = createNativeStackNavigator();

export default function App() {

	const AuthContext = React.createContext();

	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case 'SIGN_IN':
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					};
				case 'SIGN_OUT':
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
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
				.catch(error => console.log(error));

			
		},
		signOut: async() => {

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
				.catch(error => console.log(error));
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
					<Stack.Navigator initialRouteName="dashboard" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#2b2b2b' } }}>
						<Stack.Screen name='dashboard'>
							{(props) => <Dashboard {...props} context={AuthContext} />}
						</Stack.Screen>
					</Stack.Navigator>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
}