import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const AddPhotoVideoComp = ({ onPhotoCamera, onPhotoGallery, onVideoCamera, onVideoGallery }) => {
    return (
        <View style={styles.root}>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.TakePhotoContainer} onPress={onPhotoCamera}>
                    <FontAwesome name='camera' size={25} style={styles.Icon} />
                    <Text style={styles.TakePhotoText}>Take photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TakePhotoContainer} onPress={onPhotoGallery}>
                    <FontAwesome name='photo' size={25} style={styles.Icon} />
                    <Text style={styles.TakePhotoText}>Choose image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TakePhotoContainer} onPress={onVideoCamera}>
                    <FontAwesome name='camera' size={25} style={styles.Icon} />
                    <Text style={styles.TakePhotoText}>Take video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TakePhotoContainer} onPress={onVideoGallery}>
                    <FontAwesome name='photo' size={25} style={styles.Icon} />
                    <Text style={styles.TakePhotoText}>Choose video</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const ArchiveListScreenComps = () => {
    return (
        <View>
            <Text>ArchiveListScreenComps</Text>
        </View>
    )
}

export default ArchiveListScreenComps

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 210,
        backgroundColor:'#323232',
        position:'absolute',
        bottom:'0.5%',
        zIndex:1
    },
    mainContainer:{
        width:'100%',
        height:'100%',
    },
    TakePhotoContainer:{
        flexDirection:'row',
        width:'100%',
        height:'25%',
        alignItems:'center',
        marginLeft:'5%'
    },
    TakePhotoText:{
        marginLeft:'10%',
        fontSize:18
    },
    
})