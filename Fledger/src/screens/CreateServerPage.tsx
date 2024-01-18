import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { createNewServer, getServers } from '../backend/backend_controller';
import { LocalUserContext, ServersListContext } from '../../App';

/*
    Call createServer(name, type) with user input to create a server
    
*/

async function createServer(serverName: string, serverType: string): Promise<boolean> {
  await createNewServer(serverName, serverType);
  return true
}

const CreateServerPage = ({navigation}: {navigation:any}) => {
  const [serverName, setServerName] = useState('');
  const [serverType, setServerType] = useState('');
  const [createdServer, setCreatedServer] = useState(null);
  const {
    userServersList,
    setUserServersList
  } = useContext(ServersListContext);
  const {
    localUser,
    setLocalUser
  } = useContext(LocalUserContext);


  const handleCreateServer = async() => {
    const newServer = {
      name: serverName,
      type: serverType,
      prevState: null
    };
    //setCreatedServer(newServer);
    await createServer(serverName, serverType);
    getServers(localUser).then((s)=>{setUserServersList(s)})
  
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageName}>Create Server</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Server Name"
          value={serverName}
          onChangeText={setServerName}
        />
        <TextInput
          style={styles.input}
          placeholder="Server Type"
          value={serverType}
          onChangeText={setServerType}
        />
        <Button title="Create" onPress={handleCreateServer} />
      </View>
      {createdServer && (
        <View style={styles.result}>
          <Text>Created Server:</Text>
          {/* <Text>Name: {createdServer.name}</Text> */}
          {/* <Text>Type: {createdServer.type}</Text> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7', // Light background color
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5, // Shadow effect for Android
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  pageName: {
    fontSize: 36,
    color: '#333', // Dark text color
    marginBottom: 30,
  },
  result: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default CreateServerPage;