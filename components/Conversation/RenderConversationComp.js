import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../../redux/ActionCreators';
import { Alert, StyleSheet, View} from "react-native";
import { ListItem, Avatar, Button, Icon, Overlay } from 'react-native-elements'
import appColors from '../../shared/colors';


export const RenderConversation = ({item,user,fromUser}) => {
  const [date, showDate] = useState(false)
  const timer = useRef(null)
  const [showLPModal, setShowLPModal] = useState(false)//LPModal === longPressModal
  const received = item.sentBy !== user.username
  const dispatch = useDispatch()

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
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this message?",
      [
        {
          text: "Delete",
          onPress: () => dispatch(deleteMessage(item.id,user,fromUser)),
          style: "destructive"
        }
      ],
      {
        cancelable: true,
        onDismiss: () => setShowLPModal(!showLPModal)
      }
    )
  }

  const handleCopy = () => {
    console.log("Copied")
  }
  
  
  return(
    <View>
      <View>
        <Overlay
          animationType="fade"
          isVisible={showLPModal}
          onRequestClose={() => {
            setShowLPModal(!showLPModal);
          }}
          onBackdropPress={() => setShowLPModal(!showLPModal)}
          overlayStyle={{height: 200, backgroundColor: appColors.main.main, width: 200, borderRadius: 15}}
        >
          <View style={styles.centeredView}>
            <View style={{margin: 10}}>
            <Button onPress={handleCopy} buttonStyle={{backgroundColor: appColors.secondary.dark}} titleStyle={{color:"darkgray"}} iconRight icon={<Icon color={appColors.ternary.main} name="copy-sharp" type="ionicon" />} title="Copy" color={appColors.secondary.light} />
            </View>
            <View style={{margin: 10}}>
              <Button onPress={handleDelete} buttonStyle={{backgroundColor: appColors.secondary.dark}} titleStyle={{color:"darkgray"}} iconRight icon={<Icon color={appColors.ternary.main} name="trash-sharp" type="ionicon" />} title="Delete" color={appColors.secondary.light} />
            </View>
          </View>
        </Overlay>
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
  },
  modalView: {
    margin: 20,
    backgroundColor: appColors.main.main,
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
  },
  modalButton: {

  }
});


export default RenderConversation