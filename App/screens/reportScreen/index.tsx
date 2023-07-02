import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../config/color';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import API from '../../config/API';
import {useSelector} from 'react-redux';
import moment from 'moment';
import PageLoader from '../../components/pageLoader';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';

const ReportScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [groupedRData, setGroupedRData] = useState<any>({});
  const Auth = useSelector((state: any) => state.Auth.user);

  // console.log('Auth--> ', Auth);
  const [reportData, setReportData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.HeaderRow}>
          <TouchableOpacity onPress={() => getAllData()}>
            <Feather size={20} color={COLOR.grey1} name="refresh-cw" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    getAllData();
  }, [navigation]);

  // const getAllData = () => {
  //   setLoading(true);
  //   let api = `${API.BASE_URL}${API.REPORT_BY_USER}${Auth.emp_id}?order=ASC&page=1&take=10`;
  //   fetch(api)
  //     .then(response => {
  //       if (!response.status) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data.data.rows);
  //       const REPORT_DATA = data.data.rows;
  //       setReportData(REPORT_DATA);
  //       setLoading(false);

  //       const groupedData: any = {};

  //       REPORT_DATA.forEach((obj: any) => {
  //         const createdDate = obj.createdAt.slice(0, 10); // Extract the date from the createdAt field
  //         if (createdDate in groupedData) {
  //           groupedData[createdDate].push(obj);
  //         } else {
  //           groupedData[createdDate] = [obj];
  //         }
  //       });

  //       for (const date in groupedData) {
  //         console.log(`Date: ${date}`);
  //         groupedData[date].forEach((obj: any) =>
  //           console.log('obj-------------> ', obj),
  //         );
  //         console.log();
  //       }

  //       console.log('groupedObjects --------> ', groupedData);
  //       const _data = Object.entries(groupedData).map(([date, entries]) => ({
  //         date,
  //         entries,
  //       }));
  //       setGroupedRData(_data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // };

  const handleRefresh = () => {
    setRefreshing(true);
    getAllData();
    setRefreshing(false);
  };

  const getAllData = () => {
    setLoading(true);
    let api = `${API.BASE_URL}${API.REPORT_BY_USER2}${Auth.emp_id}?order=ASC&page=1&take=10`;
    fetch(api)
      .then(response => {
        if (!response.status) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(report => {
        console.log(report.data);
        const REPORT_DATA = report.data;
        setReportData(REPORT_DATA);
        setLoading(false);

        // const groupedData: any = {};

        // REPORT_DATA.forEach((obj: any) => {
        //   const createdDate = obj.createdAt.slice(0, 10); // Extract the date from the createdAt field
        //   if (createdDate in groupedData) {
        //     groupedData[createdDate].push(obj);
        //   } else {
        //     groupedData[createdDate] = [obj];
        //   }
        // });

        // for (const date in groupedData) {
        //   console.log(`Date: ${date}`);
        //   groupedData[date].forEach((obj: any) =>
        //     console.log('obj-------------> ', obj),
        //   );
        //   console.log();
        // }

        // console.log('groupedObjects --------> ', groupedData);
        // const _data = Object.entries(groupedData).map(([date, entries]) => ({
        //   date,
        //   entries,
        // }));
        // setGroupedRData(_data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <PageLoader />
        </View>
      ) : (
        <View style={{flex: 1, paddingTop: 10}}>
          {/* <FlatList
            data={groupedRData}
            renderItem={renderItem}
            keyExtractor={item => item.date}
          /> */}

          {/* <ScrollView>
            {reportData &&
              reportData.map((data: any) => {
                return (
                  <View style={styles.ReportStatus}>
                    <Text style={styles.ReportStatusDate}>
                      {moment(data.time).format('MMM Do YYYY')}
                    </Text>
                    <View style={styles.ReportStatusItem}>
                      <View style={styles.ReportStatusItemCol1}>
                        <Feather
                          name={data.type === 'checkin' ? 'log-in' : 'log-out'}
                          size={20}
                          color={
                            data.type === 'checkin'
                              ? COLOR.success
                              : COLOR.warning
                          }
                        />
                        <Text style={styles.ReportStatusTxt1}>{data.type}</Text>
                      </View>
                      <View style={styles.ReportStatusItemCol2}>
                        <Text style={styles.ReportStatusTxt2}>
                          {moment(
                            data.checkin_time
                              ? data.checkin_time
                              : data.checkout_time,
                          ).format('h:mm:ss A')}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.ReportStatusItem}>
                      <View style={styles.ReportStatusItemCol1}>
                        <Feather
                          name="log-out"
                          size={20}
                          color={COLOR.warning}
                        />
                        <Text style={styles.ReportStatusTxt1}>{data.type}</Text>
                      </View>
                      <View style={styles.ReportStatusItemCol2}>
                        <Text style={styles.ReportStatusTxt2}>
                          {moment(data.time).format('h:mm:ss A')}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView> */}

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }>
            {reportData &&
              reportData.map((data: any) => {
                return (
                  <>
                    <View style={styles.ReportStatus}>
                      <Text style={styles.ReportStatusDate}>
                        {/* {moment(data.time).format('MMM Do YYYY')} */}
                        {moment(data[0]?.time).format('MMM Do YYYY')}
                      </Text>
                      <View style={styles.ReportStatusItem}>
                        <View style={styles.ReportStatusItemCol1}>
                          <Feather
                            name="log-in"
                            size={20}
                            color={COLOR.success}
                          />
                          <Text style={styles.ReportStatusTxt1}>
                            {data[0]?.type}
                          </Text>
                        </View>
                        <View style={styles.ReportStatusItemCol2}>
                          <Text style={styles.ReportStatusTxt2}>
                            {moment(data[0]?.checkin_time).format('h:mm:ss A')}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.ReportStatusItem}>
                        <View style={styles.ReportStatusItemCol1}>
                          <Feather
                            name="log-out"
                            size={20}
                            color={COLOR.warning}
                          />
                          <Text style={styles.ReportStatusTxt1}>
                            {data[1]?.type}
                          </Text>
                        </View>
                        <View style={styles.ReportStatusItemCol2}>
                          <Text style={styles.ReportStatusTxt2}>
                            {moment(data[1]?.checkout_time).format('h:mm:ss A')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                );
              })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ReportScreen;
