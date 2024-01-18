/* eslint-disable */
import User from "../backend/user";

import { Pressable, TextInput, useColorScheme, StyleSheet, StatusBar, SafeAreaView, View, FlatList, Button, Text} from 'react-native';
import {useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
// You can import supported modules from npm
import { Card } from 'react-native-paper';
import { joinServer, searchFirebaseUser } from "../backend/backend_controller";
// or any files within the Snack

async function searchUser(username: string): Promise<User|null> {
  const user  = await searchFirebaseUser(username);
  if(user == null) return null;

  console.log("Found user: ", user?.name);

  return user;
}



export default function AddUserToServerPage({route, navigation}: {route: any ,navigation: any}) {
  const [text, setText] = useState('');
  const [searchResult, setSearchResult] = useState<User|null>(null);
  const [searchError, setSearchError] = useState<boolean>(false);
  
  const {server, callback} = route.params;
  
  async function addUserToServer(user: User) {
      await joinServer(server, user);
      callback(user);
      navigation.goBack();
  }
  
  function SearchResultCard( {user} : {user:User|null}) {
    if (!user) {
      return null;
    }
    
    return (
      <Card style={styles.userCard}>
        <Card.Content style={styles.userCardContent}>
          <Text style={styles.serverCardTitle}>Username: {user.id}</Text>
          <Pressable style={styles.searchButton} onPress={(username) => {
            addUserToServer(user)
          }}
          > 
            <Text style={styles.searchText}>Add</Text>
          </Pressable>
        </Card.Content>
      </Card>
    );
  }

  
  
  const TitleBar = () => (
    <Appbar.Header>
      <Appbar.Content  titleStyle ={styles.titleText} title="Add User" />
    </Appbar.Header>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView>

        <StatusBar
        // barStyle="black"
        backgroundColor="black"
        />
        <TitleBar/>
        <View style={styles.searchBar}>

          <TextInput style={styles.searchBarInput} 
            placeholder="Username"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
          />

          <Pressable style={styles.searchButton} onPress={() => {
            searchUser(text)
            .then((result) => {
              if(result != null)
              {
                setSearchResult(result);
              }
              else
              {
                setSearchError(true);
              }
            })
            }}
          > 
            <Text style={styles.searchText}>Search</Text>
          </Pressable>
        </View>

      {
      (searchResult != null) &&<SearchResultCard user={searchResult} /> 
      || searchError && <Text style={styles.error}>User does not exist</Text>
      }

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  userCard: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },

  userCardContent: {
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
    backgroundColor: 'green',
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
    fontWeight: "bold",
    paddingHorizontal: 10
  },

  error: {
    fontSize: 23,
    fontWeight: "bold",
    color: "red"
  },

  searchText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white"
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