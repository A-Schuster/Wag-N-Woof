import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { View,Text, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import { acceptRequest, cancelRequest, postNewConvo, removeFriend, sendRequest } from "../../redux/ActionCreators";
import appColors from "../../shared/colors";
import { baseUrl } from "../../shared/baseUrl";

export const FoundUser = ({found}) => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const showAccept = (user.friendRequests.filter(fr => fr.username === found.username && fr.received).length >= 1)
  const showCancel = (user.friendRequests.filter(fr => fr.username === found.username && !fr.received).length >= 1)
  const showRemove = (user.friends.filter(friend => friend.username === found.username).length >= 1)

  const handleButtonType = () => {
    if(showAccept){
      return <Button buttonStyle={{backgroundColor: appColors.ternary.main}} style={styles.button} onPress={handleAccept} icon={{name: "check", type: "font-awesome-5"}} /> 
    }
    else if(showCancel){
      return (
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={{margin: 10}}>Pending</Text>
          <Button buttonStyle={{backgroundColor: appColors.secondary.light}} style={styles.button} onPress={handleCancel} icon={{name: "times", type: "font-awesome-5"}}/>
        </View>
      )
    }
    else if(showRemove){
      return (
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <View style={{paddingRight: 20}}>
            <Button 
              title="Messages" 
              buttonStyle={{backgroundColor: "rgba(0,0,0,0)"}} 
              titleStyle={{color: appColors.main.main, fontWeight: "bold"}}
              icon={{name: "comment", type: "font-awesome-5"}}
              onPress={() => gotoConversation()}
            />
          </View>
          <Button buttonStyle={{backgroundColor: appColors.secondary.light}} style={styles.button} onPress={handleRemove} icon={{name: "user-slash", type: "font-awesome-5"}} />
        </View>
      )
    }
    else{
      return <Button buttonStyle={{backgroundColor: appColors.ternary.main}} style={styles.button} onPress={handleAdd} icon={{name: "user-plus", type: "font-awesome-5"}} />
    }
  }
  
  const gotoConversation = async () => {
    const previousConversation = user.messages.filter(message => message.from === found.username).length >= 1
    if(previousConversation){
      navigation.navigate('Conversation', { fromUser: found, user: user})
    }
    else if(!previousConversation){
     return fetch(`${baseUrl}users/${found.id}`)
     .then(res => res.json())
     .then(found => dispatch(postNewConvo(user,found,navigation)))
      
    }
  }

  const handleAdd = () => {
    dispatch(sendRequest(user,found))
  }
  const handleAccept = () => {
    dispatch(acceptRequest(user,found))
  }
  const handleCancel = () => {
    dispatch(cancelRequest(user,found))
  }
  const handleRemove = () => {
    dispatch(removeFriend(user,found))
  }

  return(
    <View style={{paddingBottom: 5}}>
      <ListItem style={{backgroundColor: "gray"}} >
        <Avatar source={{uri: "https://randomuser.me/api/portraits/lego/"+ found.id +".jpg"}}/>
        <ListItem.Content>
          <ListItem.Title>{`${found.firstName} ${found.lastName}`}</ListItem.Title>
          <ListItem.Subtitle>{found.username}</ListItem.Subtitle>
        </ListItem.Content>
        {handleButtonType()}
      </ListItem>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    backgroundColor: appColors.secondary.light
  }
})

export default FoundUser