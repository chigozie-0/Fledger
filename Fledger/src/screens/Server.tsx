/* eslint-disable */
import { createDrawerNavigator } from '@react-navigation/drawer';
import ServerChannelPage from "./ServerChannelPage";
import {Dimensions, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, View,} from "react-native";
import AddChannelPage from "./AddChannelPage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChannelCard from "../components/ChannelCard";

import HomePage from "./HomePage";
import {serverList} from "./AddChannelPage";
import { useHeaderHeight } from "react-native-screens/native-stack";
import React, { useContext, useState, useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../components/colors';
import { SelectedServerContext } from '../../App';

export let screenArray = [{ route: 'General', component: ServerChannelPage }, { route: 'friends', component: ServerChannelPage }];

export default function Server({ navigation }) {
  const [channel, setChannel] = useState('');
  const [channelList, setChannelList] = useState([]);

  const {
    selectedServer,
    setSelectedServer,
  } = useContext(SelectedServerContext);

  const handleAddChannel = () => {
    // @ts-ignore
    setChannelList([...channelList, channel]);
    console.log(channelList);
    setChannel('');
  };

  useEffect(() => {
    // Fetch and set the selected server with users when the component mounts or when the server changes.
    // You may need to modify this based on how you fetch server data.
    // Assuming your server object has a 'users' property.
    const fetchSelectedServer = async () => {
      // Example: fetch the selected server data including users from Firebase
      const fetchedServer = await fetchServerData(selectedServer.serverID);
      setSelectedServer(fetchedServer);
    };

    fetchSelectedServer();
  }, [selectedServer]); // Dependency on selectedServer to refetch when it changes

  return (
    <View>
      <ChannelCard title={'undefined'} navigation={useNavigation()} />
      <View>
        {channelList.map((name, index) => (
          <ChannelCard key={index} navigation={useNavigation()} title={name} />
        ))}
      </View>

      <KeyboardAvoidingView style={styles.addChannelWrapper} keyboardVerticalOffset={47}>
        <TextInput
          placeholder={'Add channel'}
          style={styles.addChannelInput}
          onChangeText={(text) => setChannel(text)}
          value={channel}
        />
        <Pressable style={styles.addButton} onPress={() => handleAddChannel()}>
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
    channelButton: {
        backgroundColor: COLORS.darkB,
        width: Dimensions.get('window').width-28,
        height: 44,
        marginLeft: 14,
        marginRight: 14,
        //marginBottom: 20,
        borderRadius: 15,
        marginBottom: 5,
        display: "flex",
        justifyContent: "center"
    },
    buttonText: {
        color: COLORS.displayText,
        marginLeft: 15
    },
    addChannelInput: {
        paddingVertical: 10,
        width: 250,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 60,

    },
    addChannelWrapper: {

        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

    },
    addText: {
        color: COLORS.displayText,
        fontSize: 30,
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        backgroundColor: COLORS.darkB,
        alignItems: "center"
    }


})