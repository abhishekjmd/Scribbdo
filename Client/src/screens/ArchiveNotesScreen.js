import { StyleSheet, View, ToastAndroid, BackHandler, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ArchiveTopComp from '../components/ArchiveScreenComp/ArchiveTopComp'
import { useNavigation } from '@react-navigation/native'
import ArchiveListScreen from '../components/ArchiveScreenComp/ArchiveListScreen'
import AnotherArchiveListScreen from '../components/ArchiveScreenComp/AnotherArchiveListScreen'
import { useDispatch, useSelector } from 'react-redux'
import { GetArchiveAsyncThunk } from '../Redux/Reducers/ArchiveReducer'

const ArchiveNotesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('')
  const [topList, setTopList] = useState(false);
  const [backButtonPressed, setBackButtonPressed] = useState(0);
  const [loading, setLoading] = useState(false);

  const listHandler = () => {
    setTopList(!topList);
  }


  
  const dispatchFunction = async () => {
    try {
      setLoading(true);
      await dispatch(GetArchiveAsyncThunk());
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatchFunction();
  }, [])


  const ArchiveData = useSelector((state) => state.Archive.GetArchive)
 
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('Home');
        return true; 
      },
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.root}>
      <ArchiveTopComp  onMenuPress={() => { navigation.openDrawer() }} iconName={topList ? 'appstore-o' : 'layout'} listHandler={listHandler} />
      {
        loading
          ?
          <View style={styles.ActivityIndicatorContainer}>
            <ActivityIndicator size='large' color="#00acee" />
          </View>
          :
          null
      }
      {
        topList
          ?
          <AnotherArchiveListScreen ArchiveData={ArchiveData} />
          :
          <ArchiveListScreen ArchiveData={ArchiveData} />
      }
    </View>
  )
}

export default ArchiveNotesScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#171717'
  },
  ActivityIndicatorContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }

})