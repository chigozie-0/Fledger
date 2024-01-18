/* eslint-disable */
import React, { useContext } from "react";
import {TextInput, Pressable, View, Text, StyleSheet, SafeAreaView, StatusBar} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useState} from "react";
import {COLORS} from "../components/colors";
import {screenArray} from "./Server";
import ServerChannelPage from "./ServerChannelPage";
import { Appbar } from 'react-native-paper';
import { createChannelForServer, getServers, loadSelectedServer } from "../backend/backend_controller";
import { SelectedServerContext } from "../../App";
import { Card } from 'react-native-paper';

export let serverList = []
type server = { channels : []}
// @ts-ignore

export default function AddChannelPage({ navigation, route}){
    const [channel, setChannel] = useState('');
    const {
        selectedServer, 
        setSelectedServer
      } = useContext(SelectedServerContext);
      
    const handleAddChannel = async() => {
        //route.params.addItem(channel);
        
        await createChannelForServer(channel, selectedServer);
        //await getServers(localUser).then((s) => { setUserServersList(s) })
        //setChannel('');
        loadSelectedServer(selectedServer, setSelectedServer);
        navigation.goBack();
    }

    const TitleBar = () => (
        <Appbar.Header>
          <Appbar.Content  titleStyle ={styles.titleText} title="Create Channel" />
        </Appbar.Header>
      );

    return(
      <SafeAreaProvider>
        <SafeAreaView>

            <StatusBar
            // barStyle="black"
            backgroundColor="black"
            />
            <TitleBar/>
            <View style={styles.searchBar}>

                <TextInput style={styles.searchBarInput} placeholder={'name'} 
                onChangeText={newText => setChannel(newText)} defaultValue={channel} value={channel}/>

                <Pressable style={styles.searchButton} onPress={() => handleAddChannel()}> 
            <Text>Add</Text>
          </Pressable>
        </View>

        {/* <SearchResultCard username={searchResult} /> */}

      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

  serverCard: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },

  serverCardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },

  searchBarInput: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 7,
    paddingLeft: 5,
    marginRight: 15
  },
  
  searchButton: {
    backgroundColor: '#ff6f61',
    borderRadius: 7,
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  titleText: {
    textAlign: 'center'
  },

  serverCardTitle: {
    fontSize: 23,
    fontWeight: "bold"
  },

  serverCardContentText: {
    fontSize: 20,
    fontWeight: "normal"
  },

  serverCardContainer:{
    // backgroundColor: 'orange',
    borderRadius: 10,
    margin: 10,
    marginTop: 2,
  },

  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
