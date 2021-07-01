import React, { useState, useEffect, useRef } from 'react'
import { Alert, Modal, StyleSheet, Text, View, Button } from "react-native";
import { ListItem,Avatar } from 'react-native-elements'
import appColors from '../../shared/colors';

export const RenderConversation = ({item,user,fromUser}) => {
  const [date, showDate] = useState(false)
  const timer = useRef(null)
  const [showLPModal, setShowLPModal] = useState(false)//LPModal === longPressModal
  const received = item.sentBy !== user.username

  const toggleDate = () => {
    showDate(!date)
    timer.current
  }
  useEffect(() => {
    timer.current = setTimeout(() => {
      showDate(false)
    }, 4000)
    return () => {
      clearTimeout(timer.current)
    }
  },[])

  const handleDelete = () => {
    console.log(`Id: ${item.id} From: ${fromUser.username} User: ${user.username}`)
    // dispatch(deleteMessage(item.id)
  }
  
  
  return(
    <View>
      <View>
        <Modal
          animationType="slide"
          visible={showLPModal}
          transparent={true}
          onRequestClose={() => {
            setShowLPModal(!showLPModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{margin: 10}}>
                <Button title="Copy" color={appColors.secondary.light} />
              </View>
              <View style={{margin: 10}}>
                <Button onPress={handleDelete} title="Delete" color={appColors.secondary.light} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <ListItem onLongPress={() => setShowLPModal(!showLPModal)} onPress={toggleDate} style={{backgroundColor: "gray"}} >
      {received && <Avatar source={{uri: "https://randomuser.me/api/portraits/lego/6.jpg"}}/>}
      <ListItem.Content style={{alignItems: received ? "flex-start" : "flex-end"}}>
          <ListItem.Title >{item.info.content}</ListItem.Title>
          {date && <ListItem.Subtitle>{item.info.date}</ListItem.Subtitle>}
        </ListItem.Content>
      </ListItem>
    </View>
  )
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});


export default RenderConversation