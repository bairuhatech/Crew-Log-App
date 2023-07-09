import React, {useCallback, useState} from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import PageLoader from '../../Components/PageLoader';
import COLOR from '../../Config/COLOR';
import API from '../../Config/API';
import {GET} from '../../Utils/ApiCall';
import styles from './styles';
import ListItem from './components/ListItem';

export default function LogScreen() {
  const Auth = useSelector((state: any) => state.Auth.user);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      GetAllData();
    }, []),
  );

  const GetAllData = async () => {
    try {
      let url = `${API.REPORT_BY_USER2}${Auth.emp_id}?order=DESC&page=1&take=200`;
      let data: any = await GET(url, null);
      if (data.status) {
        setReportData(data.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />
      {loading ? (
        <PageLoader />
      ) : (
        <FlatList
          data={reportData}
          renderItem={({item}) => <ListItem item={item.title} />}
          keyExtractor={(item: any) => item.uuid}
        />
      )}
    </View>
  );
}
