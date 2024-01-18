/* eslint-disable */
import Server from "../backend/server";
import React, {useContext, useEffect, useState} from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar, TextInput, Pressable, Image, ScrollView, KeyboardAvoidingView
} from "react-native";
import { addTransactionToServer } from "../backend/backend_controller";
import { LocalUserContext, SelectedServerContext, ServersListContext } from "../../App";
import User from "../backend/user";
import Transaction, { Money, TransactionParticipant } from "../backend/transaction";
import user from "../backend/user";
import {Dropdown} from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker"
import {COLORS} from "../components/colors";
import { Route } from "@react-navigation/native";


export default function TransactionInputPage({route, navigation}: {route: any ,navigation: any}) {

  // const {
  //   localUser,
  //   setLocalUser
  // } = useContext(LocalUserContext);
  //
  // const {
  //   userServersList,
  //   setUserServersList
  // } = useContext(ServersListContext);

  const { channelIdx, callback } = route.params;


  const { selectedServer, setSelectedServer } = useContext(SelectedServerContext);

  const createTransaction = async (
    dateTime: Date,
    note: string,
    payer: User | null,
    amount: number,
    location: string,
    participants: TransactionParticipant[]
  ) => {


  // Check if amount is a number
  if (isNaN(amount)) {
    setErr('Enter a valid number as the amount');
    return;
  }

    // @ts-ignore
    const totalPercentage = Object.values(percentages).reduce((a, b) => a + b, 0)
    if (totalPercentage !== 100){
      setErr('Percentages must add up to 100')
      return
    }

    for (let p in percentages){
      // @ts-ignore
      if (percentages[p] > 0){
        let user ;
        let amount ;
        // @ts-ignore
        selectedServer.users.forEach((u) => {
          if (u.id === p){
            user = u
            // @ts-ignore
            amount = new Money(percentages[p])
          }
        })



        // @ts-ignore
        participants.push(new TransactionParticipant(user, amount))
      }
    }
      // @ts-ignore
      console.log(payer.name + ' ' + amount + ' ' + location + ' ' + dateTime + ' ' + note + ' ' + percentages[payer.name])
      // if the amount is not "not a number" create the transaction

      const timestamp = new Date();
      const transaction:Transaction = new Transaction(timestamp.getMilliseconds(), dateTime, note, payer!, new Money(amount), location, participants, payer!);
      console.log("Adding transaction to channel at idx: ", channelIdx);
      const updatedChannel = await addTransactionToServer(selectedServer, channelIdx, transaction);
      callback(updatedChannel);
      navigation.goBack();
    // Bristine
  }

  const userPercentage = {};
  if (selectedServer) {
    selectedServer.users.forEach(user => {
      userPercentage[user.id] = 0;
    });
  }
  // @ts-ignore




  // channel users
  const channelUsers = selectedServer ? selectedServer.users : [];
  const [payer, setPayer] = useState<User | null>(null);

  const formatDate = (inputDate: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return inputDate.toLocaleDateString(undefined, options);
  };

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [amount, setAmount] = useState(0);
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [err, setErr] = useState('');
  const [percentages, setPercentages] = useState(userPercentage);

  const handlePayerSelect = (itemValue: string) => {
    // @ts-ignore
    setPayer(itemValue);
  };
  // @ts-ignore

// @ts-ignore
const AddParticipantCard = ({ name, percentage }) => {
  const [perc, setPerc] = useState("");

  const handlePercentageChange = (name: string, value: string) => {
    const parsedValue = +value; // Convert the input value to a number
    setPercentages((prevPercentages) => {
      const totalExistingPercentage = Object.values(prevPercentages).reduce((a, b) => a + b, 0);
      const updatedPercentages = { ...prevPercentages, [name]: parsedValue };
      const itemsWithPositiveValues = Object.keys(updatedPercentages).filter((key) => updatedPercentages[key] > 0);
      for (let i = 0; i < itemsWithPositiveValues.length; i++) {
        updatedPercentages[itemsWithPositiveValues[i]] = 100 / itemsWithPositiveValues.length;
      }

      const remainingPercentage = 100 - totalExistingPercentage;

      // Distribute the remaining percentage to the new user
      updatedPercentages[name] += remainingPercentage;

      return updatedPercentages;
    });
  };

  return (
    <View style={styles.addParticipantCard}>
      <Text style={styles.participantCardText}>{name}</Text>
      <Text style={{width: 25}}>{Math.round(percentages[name])}</Text>
      <TextInput keyboardType={"numeric"} style={styles.participantCardTextInput} onChangeText={(e) => setPerc(e)} onEndEditing={(e) => setPercentages({...percentages, [name]: +perc})} placeholder={percentage[name]} />
      <Pressable
        style={styles.addParticipantsButton}
        onPress={() => {
          setPercentages((prevPercentages) => {
            const itemsWithPositiveValues = Object.keys(prevPercentages).filter((key) => prevPercentages[key] > 0);
            console.log(itemsWithPositiveValues);
            if (!itemsWithPositiveValues.includes(name)) itemsWithPositiveValues.push(name);
            console.log(itemsWithPositiveValues);

            const updatedPercentages = { ...prevPercentages };

            for (let i = 0; i < itemsWithPositiveValues.length; i++) {
              updatedPercentages[itemsWithPositiveValues[i]] = 100 / itemsWithPositiveValues.length;
            }

            return updatedPercentages;
          });
          console.log(percentages);
        }}
      >
        <Image style={styles.addParticipantsIcon} source={require("../assets/addIcon.png")} />
      </Pressable>
    </View>
  );
}


  // @ts-ignore
  const onChange = (e, selectedDate) => {

    setDate(selectedDate);
    setShow(false)
  };

  // @ts-ignore
  const showMode = (mode) => {
    setShow(true)
    setMode(mode)
  }


  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.errorMessage}>{err}</Text>
        <View style={[styles.payerAndAmountContainer]}>
          <Dropdown
              data={channelUsers}
              labelField={"id"}
              valueField={"id"}

              style={[styles.dropdown, isFocus && { borderColor: 'blue' }, styles.general]}
              placeholder={!isFocus ? 'Select Payer' : '...'}

              value={payer}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                // @ts-ignore
                setPayer(item);

                setIsFocus(false);
              }}/>

          <TextInput keyboardType={'numeric'} style={[styles.amountInput, styles.general]}  placeholder={'Amount               $0'} onChangeText={(text) => {
            if (isNaN(+text)){
              setErr("Enter an integer number as the amount")
            }
            else{
              setAmount(+text)
              setErr('')
            }
          }}/>
        </View>
      <TextInput style={[styles.locationInput, styles.general]} placeholder={'Location'} onChangeText={(text) => setLocation(text)}/>
        <Pressable style={[styles.datePicker, styles.general]} onPress={() => showMode("date")}>
          <Image style={styles.calenderIcon} source={require('../assets/calenderIcon.png')}/>
          <Text style={styles.dateText}>Date</Text>
          <Text>{formatDate(date)}</Text>
        </Pressable>
        {show && (
            <DateTimePicker
                value={date}
                mode={"date"}
                is24Hour={true}
                onChange={onChange}
            />
        )}
      <TextInput style={[styles.notesInput, styles.general]} placeholder={'Note'} onChangeText={(text) => setNote(text)} />
      <Text style={{fontSize: 26, marginLeft: 10, marginBottom: 5}}>Add Participants</Text>
        <ScrollView style={[styles.addParticipants]}>
          {channelUsers.map((user) => (
              <AddParticipantCard key={user.id} name={user.id} percentage={percentages[user.id]} />
          ))}
        </ScrollView>

      <Pressable style={styles.doneButton} onPress={() => createTransaction(date, note, payer, amount, location, [])}>
          <Text>Done</Text>
        </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 8,

  },
  general:{
    marginBottom: 10,
    borderColor: COLORS.darkB,
    paddingLeft: 20,
    paddingRight: 21,
    borderWidth: 1.5,
  },
  dropdown: {
    borderColor: COLORS.darkB,

    color: "white",
    borderRadius: 15,
    borderWidth: 2,
    flex: 1,
    marginRight: 10,
    height: 51,
    paddingLeft: 20,
    paddingRight: 21,
    // backgroundColor: "#cbcbcb"
    backgroundColor: "#ffffff",
  },
  datePicker: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 15,

    borderColor: COLORS.darkB,
    height: 51
  },
  amountInput: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.darkB,
    width: 170,
    height: 51,
  },
  locationInput: {
    borderRadius: 15,
    borderWidth: 1,

  },
  notesInput:{
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.darkB
  },
  payerAndAmountContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 0
  },
  calenderIcon: {
    height: 24,
    width: 24
  },
  doneButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: COLORS.darkB,
    height: 42
  },
  dateText: {
    marginRight: 120,
  },
  errorMessage: {
    color: 'red'
  },
  addParticipants: {
    height: 150,
    marginBottom: 20,
    borderColor: COLORS.darkB,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15

  },
  addParticipantCard: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: 1,
    marginLeft: 1,
    marginBottom: 5,
    height: 50,
    borderColor: COLORS.darkB,
    borderRadius: 15,
    borderWidth: 1.5,
    flexDirection: "row"
  },
  addParticipantsButton: {

  },
  addParticipantsIcon: {
    color: COLORS.darkB,
    height: 20,
    width: 20,
  },
  participantCardText: {
    fontSize: 20,
    width: 90
  },
  participantCardTextInput: {
    borderWidth: 1,
    borderColor: COLORS.darkB,
    borderRadius: 5,
    height: 40,

  }
});
