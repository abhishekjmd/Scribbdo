import { StyleSheet, View, ToastAndroid, BackHandler } from 'react-native'
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
  const listHandler = () => {
    setTopList(!topList);
  }

  const dispatchFunction = useCallback(() => {
    dispatch(GetArchiveAsyncThunk());
  }, [dispatch])
  useEffect(() => {
    dispatchFunction()
  }, [dispatchFunction])


  const ArchiveData = useSelector((state) => state.Archive.GetArchive)
  const [filteredData, setFilteredData] = useState(ArchiveData)

  const handleSearch = (text) => {
    setSearchTerm(text)
    const searchTermLowercase = text.toLowerCase();
    // const archive = ArchiveData;
    const newData = ArchiveData.filter(item => {
      return item.Note.toLowerCase().includes(searchTermLowercase);
    });
    setFilteredData(newData);
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton
    );

    return () => backHandler.remove();
  }, [backButtonPressed]);

  const handleBackButton = () => {
    if (backButtonPressed === 1) {
      navigation.navigate('Home')
    } else {
      setBackButtonPressed(backButtonPressed + 1);
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      setTimeout(() => setBackButtonPressed(0), 4000);
      return true;
    }
  };


  return (
    <View style={styles.root}>
      <ArchiveTopComp value={searchTerm} onChangeText={handleSearch} onMenuPress={() => { navigation.openDrawer() }} iconName={topList ? 'appstore-o' : 'layout'} listHandler={listHandler} />
      {
        topList
          ?
          <AnotherArchiveListScreen ArchiveData={filteredData} />
          :
          <ArchiveListScreen ArchiveData={filteredData} />
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
})