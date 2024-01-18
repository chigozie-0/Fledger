/* eslint-disable */
import React from "react";
import {View, Image, StyleSheet, Dimensions, Platform} from "react-native";
import {COLORS} from "./colors";

export default function AddTransactionButton(){
    return(

        <View style={styles.addButton}>
            <Image style={styles.addButtonImage} source={require('../assets/addIcon.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: COLORS.darkB,
        width: Dimensions.get('window').width-28,
        height: 44,
        marginLeft: 14,
        marginRight: 14,
        //marginBottom: 20,
        borderRadius: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // position:"absolute",
        // bottom: 15
    },
    addButtonImage: {
        height: 24,
        width: 24,
    }
})