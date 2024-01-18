/* eslint-disable */
// import React from "react";
// import {SafeAreaView, StyleSheet, Dimensions, Platform} from "react-native";
// import ServerTitleBar from "../components/ServerTitleBar";
// import AddTransactionButton from "../components/AddTransactionButton";
// import {COLORS} from "../components/colors";
// import AppData from "../backend/backend_controller";
// import Channel from "../backend/channel";

/*
    use AppData.currentServer which is a Server object.
    it is the current server the user is in.
*/



/* use this to store the current channel. Default value is channels[0] which is the general channel
    just display a loading text or icon if it's value is null
*/
//let currentChannel: Channel| null = AppData.currentServer?.channels[0]

// type channel = { index : number }

// export default function ServerChannelPage(){

//     return(
//         <SafeAreaView style={styles.container}>
//             <AddTransactionButton/>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: COLORS.background,
//         height: '100%',
//     }
// })

import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import PopupList from '../components/PopUpList';
import { SelectedServerContext } from '../../App';
import ChannelCard from '../components/ChannelCard';
import { useNavigation } from '@react-navigation/native';
import AddTransactionButton from "../components/AddTransactionButton";
import TransactionHistory from '../components/TransactionHistory'
import UsersListPage from '../screens/UsersListPage'; // Adjust the path based on your project structure
import { Button } from "react-native-paper";
import Channel from '../backend/channel';
import User from '../backend/user';

type Props = {
  navigation: any;
};

let SelectedChannelContext = createContext<Channel | any>(null);

// @ts-ignore
const ServerChannelPage: React.FC<Props> = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [usersInServer, setUsersInServer] = useState<User[]>([]);

  const {
    selectedServer,
    setSelectedServer
  } = useContext(SelectedServerContext);

  useEffect(() => {
    console.log("Selected server EFFECT called: ", selectedServer)
    if (selectedServer != null) {
      setSelectedChannel(selectedServer.channels[0]);
      setUsersInServer(selectedServer.users);
    }
  }, [selectedServer])

  const handleMenuPress = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemPress = (index: number) => {
    setSelectedChannel(selectedServer.channels[index]);
    setSelectedItemIndex(index);
  };

  const handlePopupClose = () => {
    setIsMenuOpen(false);
  };

  const addChannel = () => {
    navigation.navigate("AddChannelPage");
  };

  const channelUpdateCallback = (newChannel: Channel) => {
    setSelectedChannel(newChannel)
  };

  const addUserToLocalServer = (newUser: User) => {
    const oldUsers = usersInServer;
    oldUsers.push(newUser);
    setUsersInServer(oldUsers);
  };

  const handleAddTransaction = () => {
    navigation.navigate("TransactionInputPage",
      {
        channelIdx: selectedItemIndex,
        callback: channelUpdateCallback,
      }
    )
  };

  const handleShowUsers = async () => {
    try {
      if (selectedServer) {
        const users = selectedServer.users;
        setUsersInServer(users);
        console.log('Users in Server:', users);
  
        // Navigate to UsersListPage with the list of users
        navigation.navigate('UsersListPage', { users: usersInServer });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    ((selectedServer != null) && (selectedChannel != null)) && (
      <SelectedChannelContext.Provider value={{ selectedChannel, setSelectedChannel }}>
        <SafeAreaView style={styles.container}>
          {/* Top Bar (Channels Bar) */}
          <View style={styles.appbar}>
            <TouchableOpacity onPress={handleMenuPress}>
              <Text style={styles.titleText}>{selectedChannel.name}</Text>
            </TouchableOpacity>
            <Button
              style={styles.inviteButton}
              onPress={() => {
                navigation.navigate('InviteUserPage', {
                  server: selectedServer,
                  callback: addUserToLocalServer,
                });
              }}
            >
              invite
            </Button>
            {/* New Show Users Button */}
            <Button style={styles.showUsersButton} onPress={handleShowUsers}>
              Users
            </Button>
          </View>
  
          {/* Popup List */}
          <PopupList
            isOpen={isMenuOpen}
            onClose={handlePopupClose}
            onItemPress={handleMenuItemPress}
            items={selectedServer.channels}
            navigation={useNavigation()}
            handleAddChannel={addChannel}
          />
  
          {/* Transaction History */}
          <TransactionHistory transactions={selectedChannel.transactions} />
          <Text style={styles.text}> Transactions </Text>
  
          {/* Add Transaction Button */}
          <Pressable style={styles.addTButton} onPress={handleAddTransaction}>
            <AddTransactionButton />
          </Pressable>
        </SafeAreaView>
      </SelectedChannelContext.Provider>
    ) || (
      // Loading state
      <Text style={styles.text}> Loading... </Text> && (selectedServer == null)
    )
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#ff6f61',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    zIndex: 1,
  },
  text: {
    fontSize: 20,
    marginTop: 10,
  },
  titleText: {
    fontSize: 30,
    marginTop: 8,
    color: 'white',
    paddingBottom: 1,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  addTButton: {
    position: "absolute",
    bottom: 15
  },
  inviteButton: {
    backgroundColor: 'white',
    position: "absolute",
    right: 5,
  },
  showUsersButton: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 5,
  },
});

export default ServerChannelPage;