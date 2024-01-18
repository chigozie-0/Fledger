// /* eslint-disable */
import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Button, ScrollView } from "react-native";
import { COLORS } from "./colors";
import Transaction from "../backend/transaction";
import User from "../backend/user";

class Money {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }
}


// const transaction1 = new Transaction(1, new Date(), "Transaction 1", user1, money1, "Location 1", []);
// const transaction2 = new Transaction(2, new Date(), "Transaction 2", user2, money2, "Location 2", []);
// const transaction3 = new Transaction(3, new Date(), "Transaction 3", user3, money3, "Location 3", []);

// const transactionsList = [transaction1, transaction2, transaction3];

export default function TransactionHistory({transactions}: {transactions: Transaction[]}) {
  // const [transactions, setTransactions] = useState(transactionsList);

  const addTransaction = () => {
    // const newTransaction = new Transaction(
    //   transactions.length + 1,
    //   new Date(),
    //   `Transaction ${transactions.length + 1}`,
    //   user1,
    //   new Money(150),
    //   "Location 4",
    //   []
    // );

    // setTransactions([...transactions, newTransaction]);
  };



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {transactions.map((item, index) => (
          <View
            key={index}
            style={[
              styles.card,
              {
                backgroundColor: index % 3 === 0 ? COLORS.black : index % 3 === 1 ? COLORS.purple : COLORS.pink,
                marginBottom: 10,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: index % 3 === 0 ? COLORS.white : index % 3 === 1 ? COLORS.white : COLORS.black }]}>
              {item.note}
            </Text>
            <Text style={[styles.cardText, { color: index % 3 === 0 ? COLORS.white : index % 3 === 1 ? COLORS.white : COLORS.black }]}>
              Amount: {item.amount.amount}
            </Text>
            <Text style={[styles.cardText, { color: index % 3 === 0 ? COLORS.white : index % 3 === 1 ? COLORS.white : COLORS.black }]}>
              Date: {item.dateTime.toLocaleString()}
            </Text>
            <Text style={[styles.cardText, { color: index % 3 === 0 ? COLORS.white : index % 3 === 1 ? COLORS.white : COLORS.black }]}>
              Location: {item.location}
            </Text>
            <Text style={[styles.cardText, { color: index % 3 === 0 ? COLORS.white : index % 3 === 1 ? COLORS.white : COLORS.black }]}>
            Payer: {item.payer.id} {item.payer.name} 
            </Text>
            <Text style={[styles.cardText, { color: index % 3 === 0 ? COLORS.white : index % 3 === 1 ? COLORS.white : COLORS.black }]}>
              <Text style={{ fontWeight: 'bold' }}>Participants:</Text>
              {item.participants.map((participant, participantIndex) => (
                <Text key={participantIndex}>
                  {'\n'}{participant.user.id}: Amount Owed: ${(item.amount.amount * (participant.amount.amount / 100)).toFixed(2)}
                </Text>
              ))}
          </Text>
        </View>
      ))}
    </ScrollView>
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    marginBottom: 20,
    paddingHorizontal: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 2, // Adjust this value based on your button's height and margin
  },
  card: {
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 1,
    marginBottom: 8,
    elevation: 0,
    width: 363,
    borderColor:  'black', // Adds a black border to the card
    borderWidth: 2
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
  },
  addButtonContainer: {
    backgroundColor: '#ff6f61', // You can set your desired button color here
    borderRadius: 25, // Adjust the borderRadius to make the button rounder
    marginHorizontal: 16,
    marginBottom: 0,
    height: 60, // Height of the button
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center' // Center the content horizontally
  },
   addButtonLabel: {
     color: 'white',
     fontSize: 18,
    },
});
