import { StyleSheet, View, TextInput, BackHandler, TouchableOpacity, Text, Image } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GetNotesAsyncThunk, NotesAyncThunk } from '../../../Redux/Reducers/NotesReducer'
import { useNavigation, useRoute } from '@react-navigation/native'
import Slider from '@react-native-community/slider'
import Video from 'react-native-video'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler'

const MiddleCreateNotesComp = ({ notesID }) => {
  const [titleValue, setTitleValue] = useState('')
  const [notesValue, setNoteValue] = useState('')
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const route = useRoute()
  const videoRef = useRef(null);
  const image = route.params?.Image
  const video = route.params?.video
  const onSliderValueChange = (value) => {
    setCurrentTime(value);
  };

  const onSliderSlidingComplete = (value) => {
    videoRef.current.seek(value);
  };

  const onVideoLoad = (data) => {
    setDuration(data.duration);
  };

  const onVideoProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const togglePlay = () => {
    setPaused(!paused)
  }

  const handleSubmit = async () => {
    try {
      dispatch(NotesAyncThunk({ titleValue, notesValue, image, video }))
      navigation.navigate('Home');
      dispatch(GetNotesAsyncThunk())
    } catch (error) {
      console.log(error)
    }
  };


  return (

    <ScrollView style={styles.root} contentContainerStyle={{ alignItems: 'center' }} >
      {video
        ?
        <View style={styles.main}>
          <View>
            <View style={styles.videoContainer}>
              <Video
                source={{ uri: video }}
                style={styles.videoPlayer}
                repeat={true}
                ref={videoRef}
                paused={paused}
                resizeMode={'cover'}
                onLoad={onVideoLoad}
                onProgress={onVideoProgress}
              />
            </View>
          </View>
          <View style={styles.controlContainer}>
            <Slider
              style={styles.progressContainer}
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              onValueChange={onSliderValueChange}
              onSlidingComplete={onSliderSlidingComplete}
              thumbTintColor="white"
              minimumTrackTintColor='white'
              maximumTrackTintColor='#fff'
            />
            {/* 
        <Text style={{ marginLeft: 5 }}> {Math.floor(currentTime / 60).toString()}:{(currentTime % 60).toString().slice(0, 2)} / {Math.floor(duration / 60)}:{(duration % 60).toString().slice(0, 2)} </Text>
       */}
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={togglePlay} style={styles.playpause}>
              {paused
                ?
                <Ionicons name='play' size={50} color='white' style={styles.playpauseIcon} />
                :
                <Ionicons name='pause' size={50} color='white' style={styles.playpauseIcon} />
              }
            </TouchableOpacity>
          </View>
        </View>
        :
        null
      }

      {
        image
          ?
          <View style={styles.main}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          :
          null
      }

      <View style={styles.mainContainer}>
        <TextInput placeholder='Title' multiline={true} value={titleValue} onChangeText={(e) => setTitleValue(e)} placeholderTextColor='#8A8A8A' style={styles.titleStyle} />
        <TextInput placeholder='Note' multiline={true} value={notesValue} onChangeText={(e) => setNoteValue(e)} placeholderTextColor='#8A8A8A' style={styles.textinputStyle} />
      </View>
      <TouchableOpacity style={styles.submitContainer} onPress={handleSubmit} >
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.submitText}>submit</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default MiddleCreateNotesComp

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    width: '98%',
    marginLeft: '6%',
    marginTop: '20%',
  },
  titleStyle: {
    fontSize: 20,
    width: '100%',
    color: 'white'
  },
  textinputStyle: {
    fontSize: 18,
    width: '100%',
    color: 'white'
  },
  submitContainer: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E2E2E',
    borderRadius: 15,
  },
  submitText: {
    fontSize: 18,
    width: '100%',
    color: 'white',
  },
  main: {
    width: '95%',
    height: 280,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#36454F',
    borderRadius: 15,
  },
  videoContainer: {
    width: '100%',
    height: '96%',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    borderColor: '#36454F',
    borderWidth: 1
  },
  controlContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    width: 350,
    height: 40,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  playpause: {
    width: '14%',
    borderColor: '#36454F',
    borderRadius: 15,
    borderWidth: 1,
  },
  playpauseIcon: {
    marginLeft: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    borderColor: '#36454F',
    borderWidth: 1,
    resizeMode: 'contain'
  },
})