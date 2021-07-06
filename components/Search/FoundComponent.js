import React from 'react';
import { View,Text } from 'react-native'
import FoundUser from './FoundUser';

export const FoundComp = (props) => {
  const {found} = props
  if(found.username){
    return <FoundUser found={found} />
  }
  return(
    <View>
      <Text>
        Nothing Found
      </Text>
    </View>
  )
}