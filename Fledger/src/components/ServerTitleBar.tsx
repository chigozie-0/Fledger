/* eslint-disable */
import React from "react";
import {View, StyleSheet, Text} from "react-native";
import {COLORS} from "./colors";

type title = { name : string}

export default function ServerTitleBar(props: title){
    return (
        <View style={styles.container}>
            <Text style={styles.serverName}>#{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        height: 57,
        backgroundColor: '#232D3F',
    },
    serverName: {
        color: '#CED4DA'
    }
})