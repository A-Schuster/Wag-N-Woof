import { useNavigation } from '@react-navigation/core'
import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import {  SearchBar, Icon, Badge } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../shared/baseUrl'
import { FoundComp } from './FoundComponent'

export const Friends = () => {
  const [search, setSearch] = useState('')
  const [found,setFound] = useState([])
  const [users,setUsers] = useState([])
  const [friends,setFriends] = useState([])
  const currUser = useSelector(state => state.user.user)
  const navigation = useNavigation()
  
  
  useEffect(() => {
    fetch(`${baseUrl}users/`)
    .then(response => response.json())
    .then(users => {
      setUsers(users)
      setFriends(users.filter(user => currUser.friends.filter(friend => friend.username === user.username).length >= 1))
    })
  },[currUser])

  const handleRequests = () => {
    navigation.navigate("Requests",{requests: currUser.friendRequests, users: users})
  }

  const handleSearch = search => {
    setSearch(search)
    if(search.length === 0){
      setFound([])
    }
    if(search){
      setFound(users.filter(user => user.username.toUpperCase().includes(search.toUpperCase()) && currUser.username !== user.username))
    }
  }
  return(
    <View>
      <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <View style={{flexDirection: 'row', marginRight: 8}}>
          <Badge containerStyle={{position: 'absolute', top: -4, right: 15 }} value={currUser.friendRequests.filter(fr => fr.received === true).length} status="primary" />
          <Icon onPress={() => handleRequests()} name="user-alt" type="font-awesome-5"/>
        </View>
        <SearchBar containerStyle={{width: "85%"}} lightTheme value={search} placeholder="Search..." onClear={() => setFound([])} onChangeText={handleSearch}/>
      </View>
      {search.length >= 1 && found.map(item => <FoundComp key={item.id + item.username} found={item}/>)}
      {!search && friends.map(friend => <FoundComp key={friend.id + friend.username} found={friend} />)}
      {!search && friends.length <= 0 && 
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text style={{fontSize: 25}}>Get Started Making Friends!</Text>
      </View>}
    </View>
  )
}

export default Friends