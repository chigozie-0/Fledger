import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  BackHandler, // Add TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Server from '../backend/server';
import AppData, { authenticateUserLogin, getServers, loadSelectedServer, populateTestData } from '../backend/backend_controller';
import { Appbar, Card, Button } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LocalUserContext, SelectedServerContext, ServersListContext } from '../../App';

function HomePage({navigation}: {navigation: any}): JSX.Element {


  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
        // Anything in here is fired on component unmount.
    }
  }, [])

  const handleBackButton = ():boolean=> {
    BackHandler.exitApp();
    return true;
  }

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const handleCardClick = (server: Server) => {
    console.log(`Card clicked: ${server.serverName}`);
    // setSelectedServer(server);
    loadSelectedServer(server, setSelectedServer);
    navigation.navigate("ServerChannelPage");
  };

  const {
    localUser,
    setLocalUser
  } = useContext(LocalUserContext);

  const {
    userServersList,
    setUserServersList
  } = useContext(ServersListContext);

  const {
    selectedServer,
    setSelectedServer
  } = useContext(SelectedServerContext);

  let renderServer = ({ item }: { item: Server }) => (
    <TouchableOpacity onPress={() => handleCardClick(item)}>
      <Card style={styles.serverCardContainer}>
        <Card.Content>
          <Text style={styles.serverCardTitle}>{item.serverName}</Text>
          <Text style={styles.serverCardContentText}>Type: {item.serverType}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  ///authenticateUserLogin("totallyawesomeme", "SuperSecretPassword");

  const getServersOnFirstRender = async () => {
    await getServers(localUser).then((s) => { setUserServersList(s) })
  }

  // const [serversState, setServersState] = useState<Server[]>([]);

  useEffect(() => {
    getServersOnFirstRender();
  }, [])

  const TitleBar = () => (
    <Appbar.Header style={styles.header}>
      <Appbar.Content
      title="Servers"
      titleStyle={{ ...styles.titleText, textAlign: 'center', width: '120%' }}
    />
      <Button
        onPress={() => {
          // Example: Navigate to a search screen or perform a search action
          navigation.navigate("SearchServer");

        }}
        style={styles.searchButton}
      >
        Search
      </Button>
    </Appbar.Header>
  );

  const bottomBar = (
    <View style={styles.bottomBar}>
      <Button
        mode="contained"
        onPress={() => {
          // Example: Navigate to an "Add Server" screen or show a modal to add a server
          console.log("Add Server button clicked. Adding a server...");
          navigation.navigate("CreateServer");
        }}
        style={styles.addButton}
      >
        Add Server
      </Button>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={{ flex: 1 }}>
          <TitleBar />
          <FlatList
            style={{ marginTop: 8 }}  // Margin for the title bar
            data={userServersList}
            renderItem={renderServer}
            keyExtractor={(item) => item.serverID.toString()}
          />
          {bottomBar}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

HomePage.navigationOptions = {
  headerTitle: 'Homepage',
  headerLeft: () => {
    return null;
  },
};

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'justify',
    fontWeight: "bold",
  },

  header: {
    backgroundColor: '#8A2BE2',
  },

  serverCardTitle: {
    fontSize: 23,
    fontWeight: "bold",
  },

  serverCardContentText: {
    fontSize: 20,
    fontWeight: "normal",
  },

  searchButton: {
    marginLeft: 'auto',
    backgroundColor: '#FFFFFF',
    tintColor: '#000000',
  },

  serverCardContainer: {
    borderRadius: 10,
    margin: 10,
    marginTop: 2,
    backgroundColor: '#ff6f61',
  },

  cardButton: {
    backgroundColor: '#8A2BE2', // Button color for entire card
  },

  bottomBar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A2BE2',
  },

  addButton: {
    backgroundColor: '#FF5733',
  },
});

export default HomePage;
