import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native'
import { ListItem, Avatar, Button } from 'react-native-elements';

export const FoundUser = ({found}) => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const showAccept = (user.friendRequests.filter(fr => fr.username === found.username && fr.received).length >= 1)
  const showCancel = (user.friendRequests.filter(fr => fr.username === found.username && !fr.received).length >= 1)
  const showAdd = (user.friends.filter(friend => friend.username === found.username).length = 0 && !showAccept && !showCancel)
  const showRemove = (user.friends.filter(friend => friend.username === found.username).length >= 1)
  

  const handleAdd = () => {
    
  }
  const handleAccept = () => {
    
  }
  const handleCancel = () => {
    
  }
  const handleRemove = () => {
    
  }

  return(
    <View>
      <ListItem style={{backgroundColor: "gray"}} >
        <Avatar source={{uri: "https://randomuser.me/api/portraits/lego/"+ found.id +".jpg"}}/>
        <ListItem.Content>
          <ListItem.Title>{`${found.firstName} ${found.lastName}`}</ListItem.Title>
          <ListItem.Subtitle>{found.username}</ListItem.Subtitle>
        </ListItem.Content>
        { showAdd && <Button onPress={handleAdd} icon={{name: "user", type: "font-awesome-5"}} title="Add Friend" />}
        { showAccept && <Button onPress={handleAccept} icon={{name: "check", type: "font-awesome-5"}} title="Accept Request" />}
        { showCancel && <Button onPress={handleCancel} icon={{name: "times", type: "font-awesome-5"}} title="Cancel Request" />}
        { showRemove && <Button onPress={handleRemove} icon={{name: "user-slash", type: "font-awesome-5"}} title="Remove Friend" />}
      </ListItem>
    </View>
  )
}

export default FoundUser