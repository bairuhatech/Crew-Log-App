import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import COLOR from '../../config/color';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import API from '../../config/API';
import {useSelector} from 'react-redux';
import moment from 'moment';
import PageLoader from '../../components/pageLoader';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import FONT from '../../config/font';

const ReportScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [groupedRData, setGroupedRData] = useState<any>({});
  const Auth = useSelector((state: any) => state.Auth.user);
  const EmpID = useSelector((state: any) => state.User.emp_id);
  console.log('----- EmpID -----> ', EmpID);
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

  useFocusEffect(
    useCallback(() => {
      // const unsubscribe = setRoleID(props.user.SELECTED_ROLE.id);
      // return () => unsubscribe();
      console.log('----------------------current----------------------');
      setLoading(true);
      getAllData();
    }, []),
  );

  // React.useLayoutEffect(() => {
  //   console.log('-----------current------------'); // <-- this logs an old value because this runs first!
  // });

  const handleRefresh = () => {
    setRefreshing(true);
    getAllData();
    setRefreshing(false);
  };

  const getAllData = () => {
    setLoading(true);
    let api = `${API.BASE_URL}${API.REPORT_BY_USER2}${Auth.emp_id}?order=DESC&page=1&take=200`;
    console.log(api);

    fetch(api, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then(report => {
        // console.log(report.data);
        const REPORT_DATA = report.data;
        setReportData(REPORT_DATA);
        setLoading(false);
        // console.log(REPORT_DATA);
      })
      .catch(error => {
        console.log('Service Error ===>>', error);
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
          <Text>{EmpID + '----' + Auth.emp_id}</Text>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }>
            {reportData && reportData.length ? (
              reportData.map((data: any, i: any) => {
                return (
                  <>
                    <View style={styles.ReportStatus}>
                      <Text style={styles.ReportStatusDate}>
                        {moment(data[0]?.time).format('MMM Do YYYY')}
                      </Text>

                      {data?.map((val: any) => {
                        return (
                          <View style={styles.ReportStatusItem}>
                            <View style={styles.ReportStatusItemCol1}>
                              <Feather
                                name={
                                  val.type === 'checkin' ? 'log-in' : 'log-out'
                                }
                                size={20}
                                color={
                                  val.type === 'checkin'
                                    ? COLOR.success
                                    : COLOR.warning
                                }
                              />
                              <Text style={styles.ReportStatusTxt1}>
                                {val && val.type}
                              </Text>
                            </View>
                            <View style={styles.ReportStatusItemCol2}>
                              <Text style={styles.ReportStatusTxt2}>
                                {val.checkin_time
                                  ? moment(val.checkin_time).format('h:mm:ss A')
                                  : moment(val.checkout_time).format(
                                      'h:mm:ss A',
                                    )}
                              </Text>
                            </View>
                          </View>
                        );
                      })}

                      {/* <View style={styles.ReportStatusItem}>
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
                      </View> */}
                      {/* <View style={styles.ReportStatusItem}>
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

                        {data[1] ? (
                          <View style={styles.ReportStatusItemCol2}>
                            <Text style={styles.ReportStatusTxt2}>
                              {moment(data[1]?.checkout_time).format(
                                'h:mm:ss A',
                              )}
                            </Text>
                          </View>
                        ) : null}
                      </View> */}
                    </View>
                  </>
                );
              })
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50,
                }}>
                <Text
                  style={{
                    color: COLOR.grey9,
                    fontFamily: FONT.semibold,
                    fontSize: 13,
                  }}>
                  No Data Found
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ReportScreen;
