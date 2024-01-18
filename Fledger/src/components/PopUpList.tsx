import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onItemPress: (index: number) => void;
  items: { name: string }[];
  navigation: any;
  handleAddChannel: ()=>void; 
};

const PopUpList: React.FC<Props> = ({ navigation, isOpen, onClose, onItemPress, items,  handleAddChannel}: {navigation: any, isOpen:any, onClose:any, onItemPress:any, items:any[], handleAddChannel:any}) => {
  const handleMenuItemPress = (index: number) => {
    console.log("channel clicked");
    onItemPress(index);
    onClose();
  };

  const handleAddChannelClicked = () => {
    console.log("Add  channel clicked");
    handleAddChannel();

    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <View style={styles.menu}>
      {items.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleMenuItemPress(index)}>
          <Text style={styles.menuItem}>{item.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => handleAddChannelClicked()}>
          <Text style={styles.addChannelButton}>Add channel</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 50,
    left: 0,
    //right: 0,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    zIndex: 3,
  },
  menuItem: {
    fontSize: 23,
    paddingVertical: 5,
    paddingHorizontal: 40
  },
  addChannelButton: {
    fontSize: 20,
    paddingTop: 50,
    paddingVertical: 5,
    color: 'green',
    paddingHorizontal: 40
  },
});

export default PopUpList;
