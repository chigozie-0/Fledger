import Server from "../backend/server";
import React, { useContext, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  View,
  FlatList
} from "react-native";
import { getServers, joinServer, searchServers } from "../backend/backend_controller";
import { LocalUserContext, ServersListContext } from "../../App";
import User from "../backend/user";

/* 
    Call this function with the serach query (the user input). Returns a Server object
    if search was successful and null if search failed.
    Use the result to determine whether to show an error or to show the server
    and allow adding the user to join. 
    If allowing join, call the join function below and pass in the server object.
*/



// UI

export default function SearchAndJoinPage({navigation}: {navigation: any}) {
  const [searchQuery, setSearchQuery] = useState(""); // To store the user's search query
  const [searchResults, setSearchResults] = useState<Server[]>([]); // To store the search results
  const [searchErrorMessage, setSearchErrorMessage] = useState<string>(""); // To store the error message

  const {
    localUser,
    setLocalUser
  } = useContext(LocalUserContext);

  const {
    userServersList,
    setUserServersList
  } = useContext(ServersListContext);

  async function searchForServer(serverID: string): Promise<Server[]> {
    const results = await searchServers(serverID);
    return results;
  }
  
  async function joinServerClicked(server: Server) {
    await joinServer(server, localUser);
    await getServers(localUser).then((s)=>{setUserServersList(s)})
  }

  const handleSearch = async () => {
    // Implement your search functionality here
    // For this example, we'll just return the entire list of servers for any query
    const results = await searchForServer(searchQuery);

    // Update the search results
    // setSearchResults(results);

    // Check if any servers match the search query (by containing the search string)
    // const matchingServers = results.filter(server => server.serverName.toLowerCase().includes(searchQuery.toLowerCase()));

    // Update the search results or show an error message
    if (results.length > 0) {
      setSearchResults(results);
      setSearchErrorMessage("");
    } else {
      setSearchResults([]);
      setSearchErrorMessage("No matching servers found.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a server..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <Text style={styles.errorMessage}>{searchErrorMessage}</Text>
      <FlatList
        data={searchResults}
        keyExtractor={(server) => server.serverID}
        renderItem={({ item }: { item: Server }) => (
          <View style={styles.serverItem}>
            <View style={styles.serverName}>
              <Text>{item.serverName}</Text>
              <Text>
                ID: {item.serverID}, Type: {item.serverType}{" "}
              </Text>
            </View>
            <View style={styles.joinButton}>
              <Button title="Join" onPress={() => joinServerClicked(item)} />
            </View>
          </View>
        )}
      />
      {/* <Text>{searchErrorMessage}</Text> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginRight: 10
  },
  serverItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16
  },
  serverName: {
    flex: 1 // Takes up available space
  },
  joinButton: {
    flex: 0.5 // Adjust the flex value to control button size
  },
  errorMessage: {
    marginTop: 16, // Add margin to push the message down
    color: "red", // Change color to red or your preferred style
    textAlign: "center", // Center align the message
    fontSize: 16
  }
});
