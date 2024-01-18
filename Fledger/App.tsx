import 'react-native-gesture-handler';
/* eslint-disable */
import React, { createContext, useState } from "react";
import {SafeAreaView} from "react-native";
import ServerChannelPage from "./src/screens/ServerChannelPage";
import {NavigationContainer} from "@react-navigation/native";
import ServerPage from "./src/screens/Server";
import ChannelNavigation from "./src/screens/ChannelNavigation";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomePage from './src/screens/HomePage';
import AuthenticationSignUpPage from './src/screens/AuthenticationSignUpPage';
import AuthenticationLoginPage from './src/screens/AuthenticationLoginPage';
import CreateServerPage from './src/screens/CreateServerPage';
import SearchAndJoinPage from './src/screens/SearchAndJoinPage';
import Server from './src/backend/server';
import { LocalUser } from './src/backend/user';
import AddChannelPage from './src/screens/AddChannelPage';
import TransactionInputPage from "./src/screens/TransactionInputPage";
import AddUserToServerPage from "./src/screens/AddUserToServerPage";
import UsersListPage from './src/screens/UsersListPage'; // Adjust the path based on your project structure

const Stack = createNativeStackNavigator()

let ServersListContext = createContext<Server[]|any>(null);
// let LocalUserContext = createContext<{ localUser: null, setLocalUser: React.Dispatch<React.SetStateAction<LocalUser>>|null}>();
let LocalUserContext = createContext<LocalUser|any>(null);
let SelectedServerContext = createContext<Server|any>(null);



export default function App(){
    const [localUser, setLocalUser] = useState(null);
    const [userServersList, setUserServersList] = useState<Server[]>([]);
    const [selectedServer, setSelectedServer] = useState<Server|null>(null);
    return (
      <NavigationContainer>
        <SelectedServerContext.Provider value={{ selectedServer, setSelectedServer }}>
          <LocalUserContext.Provider value={{ localUser, setLocalUser }}>
            <ServersListContext.Provider value={{ userServersList, setUserServersList }}>
              <Stack.Navigator>
                <Stack.Screen name={"SignIn"} component={AuthenticationLoginPage} options={{headerBackVisible: false, headerShown: false}}/>
                <Stack.Screen name={"Home"} component={HomePage} options={{headerBackVisible: false, headerShown: false}}/>
                <Stack.Screen name={"SignUp"} component={AuthenticationSignUpPage}/>
                <Stack.Screen name={"channelList"} component={ServerPage}/>
                <Stack.Screen name={"ServerChannelPage"} component={ServerChannelPage}/>
                <Stack.Screen name={"AddChannelPage"} component={AddChannelPage}/>
                <Stack.Screen name={"CreateServer"} component={CreateServerPage}/>
                <Stack.Screen name={"SearchServer"} component={SearchAndJoinPage}/>
                <Stack.Screen name={"TransactionInputPage"} component={TransactionInputPage} initialParams={{ channelIdx: 0 }}/>
                <Stack.Screen name={"InviteUserPage"} component={AddUserToServerPage} />
                <Stack.Screen name={"UsersListPage"} component={UsersListPage} />
            </Stack.Navigator>
          </ServersListContext.Provider>
        </LocalUserContext.Provider>
      </SelectedServerContext.Provider>
    </NavigationContainer>
  );
}

export {ServersListContext, LocalUserContext, SelectedServerContext}