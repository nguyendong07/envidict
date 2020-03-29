import React from 'react'
import { StyleSheet, ProgressBarAndroid } from 'react-native'
import { View, Text, Grid, Col, Button, Icon } from 'native-base'
import { Colors } from '../../../styles'

const CurrentVocabularies = () => {
  return (
    <View>
      <Text style={styles.tittle}>Từ vựng phỏng vấn, xin việc</Text>
      <View style={styles.card}>
        <Text style={styles.lessonName}>Bài 1: Job search</Text>
        <Grid>
          <Col size={60}>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={0.7}
            ></ProgressBarAndroid>
          </Col>
          <Col size={40}>
            <Text style={styles.information}>Đã thuộc: 7/10</Text>
          </Col>
        </Grid>
        <View style={styles.buttons}>
          <Button style={buttonStyle} small>
            <Text uppercase={false}>Xem trước</Text>
          </Button>
          <Button style={buttonStyle} small>
            <Text uppercase={false}>Học ngay</Text>
          </Button>
          <Button style={buttonStyle} small>
            <Text uppercase={false}>Luyện tập</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tittle: {
    marginLeft: 10,
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.BLUE_TITLE
  },
  card: {
    padding: 10,
    borderRadius: 2,
    backgroundColor: Colors.WHITE,
    margin: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: Colors.BLACK,
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5
  },
  lessonName: {
    color: Colors.BLUE_DARK,
    fontWeight: 'bold',
    fontSize: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  information: {
    color: Colors.BLUE_DARK,
    alignSelf: 'flex-end'
  }
})

const buttonStyle = {
  marginRight: 5,
  backgroundColor: Colors.BLUE_DARK
}

export default CurrentVocabularies