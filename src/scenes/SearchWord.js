import React, { useState, useContext } from 'react'
import { View, Text, Content, List, ListItem, Icon, Right, Body, Left } from 'native-base'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import SearchHeader from '../components/molecules/main-layout/SearchHeader'
import { dictStoreContext } from '../contexts'
import { RoutesConstants } from '../navigations/route-constants'
import { InstanceSpeaker } from '../utils/speaker'
import { AsyncStorage } from 'react-native'

const SearchWord = ({ navigation }) => {
  const [key, setKey] = useState('')
  const [wordList, setWordList] = useState([])

  const dictStore = useContext(dictStoreContext)

  const searchByKey = async (text) => {
    const result = await dictStore.findWords(text)
    setWordList(result)
  }

  const onGoToWordView = (word) => {
    navigation.navigate(RoutesConstants.WordView, { word: word })
  }

  const onGoToOnlineTranslation = (text) => {
    navigation.navigate(RoutesConstants.OnlineTranslation, { initText: text })
  }

  const onPressRow = async (word) => {
    try {
      let recentWords = JSON.parse(await AsyncStorage.getItem('recentWords'))
      if (recentWords !== null) {
        recentWords.push(word.word)
        recentWords = [...new Set(recentWords)]
      } else {
        recentWords = []
      }
      await AsyncStorage.setItem('recentWords', JSON.stringify(recentWords))
      console.log(await AsyncStorage.getItem('recentWords'))
      onGoToWordView(word)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      <SearchHeader
        voiceButtonIsVisible={true}
        searchByKey={searchByKey}
        setWordList={setWordList}
        setKey={setKey}
        autoFocus={true}
      ></SearchHeader>
      <ScrollView>
        <List>
          {wordList.length > 0 &&
            wordList.map((word, i) => (
              <ListItem key={i} onPress={() => onPressRow(word)} icon>
                <Left>
                  <Icon name="dictionary" type="MaterialCommunityIcons" />
                </Left>
                <Body>
                  <Text>{word.word}</Text>
                </Body>
                <Right>
                  <TouchableOpacity onPress={() => InstanceSpeaker.speak(word.word)}>
                    <Icon name="volume-high" />
                  </TouchableOpacity>
                </Right>
              </ListItem>
            ))}
          {key !== '' && (
            <ListItem icon onPress={() => onGoToOnlineTranslation(key)}>
              <Left>
                <Icon name="translate" type="MaterialCommunityIcons" />
              </Left>
              <Body>
                <Text>{key}</Text>
              </Body>
            </ListItem>
          )}
        </List>
      </ScrollView>
    </View>
  )
}

export default SearchWord
