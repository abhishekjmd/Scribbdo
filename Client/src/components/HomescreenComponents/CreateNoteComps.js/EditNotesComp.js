import { StyleSheet, View, TextInput, Text, TouchableOpacity, BackHandler, ScrollView, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { GetNotesAsyncThunk, UpdateNotesAsync } from '../../../Redux/Reducers/NotesReducer'
import { useNavigation, useRoute } from '@react-navigation/native'
import Video from 'react-native-video'
import Slider from '@react-native-community/slider'
import Ionicons from 'react-native-vector-icons/Ionicons'

const EditNotesComp = ({ notesId }) => {
    const route = useRoute();
    const Title = route.params?.Title;
    const Notes = route.params?.Notes;
    const video = route.params?.video
    const Id = route.params.Id;
    const image = route.params?.Image
    const [titleValue, setTitleValue] = useState(Title)
    const [notesValue, setNoteValue] = useState(Notes)
    const [paused, setPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [notesID, setNotesID] = useState(Id)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const videoRef = useRef(null);
    notesId(Id);
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
            dispatch(UpdateNotesAsync({ notesID, titleValue, notesValue, image, video }))
            dispatch(GetNotesAsyncThunk())
            navigation.navigate('Home');
        } catch (error) {
            console.log(error)
        }
    };



    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButton
        );

        return () => backHandler.remove();
    }, []);

    const handleBackButton = () => {
        navigation.navigate('Home')
    };

    return (
        <ScrollView style={styles.root} contentContainerStyle={{ alignItems: 'center' }}>
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
                        <Image source={{ uri: image }} style={styles.image} resizeMode='cover' />
                    </View>
                    :
                    null
            }


            <View style={styles.mainContainer}>
                <TextInput placeholder='Title' value={titleValue} multiline={true} onChangeText={(e) => setTitleValue(e)} placeholderTextColor='#8A8A8A' style={styles.textinputStyle} />
                <TextInput placeholder='Note' value={notesValue} multiline={true} onChangeText={(e) => setNoteValue(e)} placeholderTextColor='#8A8A8A' style={styles.textinputStyle} />
            </View>
            <TouchableOpacity style={styles.submitContainer} onPress={handleSubmit} >
                <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.submitText}>submit</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default EditNotesComp

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
        marginTop: '5%'
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
        marginTop: '1%',
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
        // resizeMode: 'contain'
    },
})