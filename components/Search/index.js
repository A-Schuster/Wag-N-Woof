import React, {useState} from 'react'
import { View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../shared/baseUrl'
import { FoundComp } from './FoundComponent'

export const Search = () => {
  const [search, setSearch] = useState('')
  const [found,setFound] = useState([])
  const currUser = useSelector(state => state.user.user)

  const handleSearch = search => {
    setSearch(search)
    if(search){
      return fetch(`${baseUrl}users/`)
      .then(response => response.json())
      .then(users => setFound(users.filter(user => user.username.toUpperCase().includes(search.toUpperCase()) && currUser.username !== user.username)))
    }
  }


  return(
    <View>
      <SearchBar lightTheme value={search} placeholder="Search..." onChangeText={handleSearch} />
      {found.map(item => <FoundComp key={item.id + item.username} found={item}/>)}
    </View>
  )
}