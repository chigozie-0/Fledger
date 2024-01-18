/* eslint-disable */
import React from "react";
import {View, Text, Pressable, StyleSheet, Dimensions} from "react-native";
import {COLORS} from "./colors";
import ServerChannelPage from "../screens/ServerChannelPage";

// @ts-ignore
export default function ChannelCard({title,  navigation } ){

    const handleButtonPressed = () => {
        
        navigation.navigate( 'channel' )
    };

    return (
        <Pressable style={styles.channelButton} onPress={() => handleButtonPressed()}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
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
    }
})