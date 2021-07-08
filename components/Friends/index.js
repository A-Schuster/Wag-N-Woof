import React, {useState, useEffect} from 'react'
import { View,Text } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../shared/baseUrl'
import { FoundComp } from './FoundComponent'

export const Friends = () => {
  const [search, setSearch] = useState('')
  const [found,setFound] = useState([])
  const [users,setUsers] = useState([])
  const [friends,setFriends] = useState([])
  const currUser = useSelector(state => state.user.user)
  
  
  useEffect(() => {
    fetch(`${baseUrl}users/`)
    .then(response => response.json())
    .then(users => {
      setUsers(users)
      setFriends(users.filter(user => currUser.friends.filter(friend => friend.username === user.username).length >= 1))
    })
  },[currUser])

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
      <SearchBar lightTheme value={search} placeholder="Search..." onClear={() => setFound([])} onChangeText={handleSearch} />
      {search.length >= 1 && found.map(item => <FoundComp key={item.id + item.username} found={item}/>)}
      {!search && friends.map(friend => <FoundComp key={friend.id + friend.username} found={friend} />)}
      {!search && !friends && <Text>Get Started Making Friends!</Text>}
    </View>
  )
}

export default Friends