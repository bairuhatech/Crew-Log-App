import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import API from '../../config/API';
import {useSelector} from 'react-redux';
import moment from 'moment';
import PageLoader from '../../components/pageLoader';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import COLOR from '../../config/color';
import FONT from '../../config/font';
import Feather from 'react-native-vector-icons/Feather';
import Loader from '../../components/loader';

const ViewUserLogs = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [groupedRData, setGroupedRData] = useState<any>({});
  const User = useSelector((state: any) => state.User.emp_id);
  const [isLoading, setIsLoading] = useState(false);

  // console.log('Auth--> ', Auth);
  const [reportData, setReportData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllData();
  }, []);

  const getAllData = () => {
    setLoading(true);
    let api = `${API.BASE_URL}${API.REPORT_BY_USER2}${Number(
      User,
    )}?order=DESC&page=1&take=200`;
    console.log('------------------------api ---', api);

    fetch(api, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then(report => {
        console.log(report.data);
        const REPORT_DATA = report.data;
        setReportData(REPORT_DATA);
        setLoading(false);
        console.log(REPORT_DATA);
      })
      .catch(error => {
        console.log('Service Error ===>>', error);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getAllData();
    setRefreshing(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <PageLoader />
        </View>
      ) : (
        <View style={{flex: 1, paddingTop: 10, backgroundColor: COLOR.white}}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }>
            {reportData && reportData.length ? (
              reportData.map((data: any) => {
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
      <View style={{padding: 10}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.BackButton}>
          {isLoading ? (
            <Loader color={COLOR.white} />
          ) : (
            <Text style={styles.BtnTxt}>Back</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewUserLogs;

const styles = StyleSheet.create({
  ReportStatus: {
    margin: 10,
    backgroundColor: COLOR.grey10,
    padding: 10,
    // borderWidth: 1.5,
    // borderColor: COLOR.grey3,
    borderRadius: 7,
    marginBottom: 10,
  },

  ReportStatusDate: {
    color: COLOR.grey6,
    fontFamily: FONT.bold,
    fontSize: 15,
    marginBottom: 5,
  },

  ReportStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  ReportStatusTxt1: {
    color: COLOR.grey3,
    fontFamily: FONT.semibold,
    fontSize: 16,
    marginLeft: 20,
    textTransform: 'capitalize',
  },

  ReportStatusTxt2: {
    color: COLOR.grey6,
    fontFamily: FONT.bold,
    fontSize: 17,
    marginLeft: 20,
  },

  ReportStatusItemCol1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ReportStatusItemCol2: {},

  HeaderRow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  BackButton: {
    // backgroundColor: COLOR.primary,
    borderWidth: 1.5,
    borderColor: COLOR.primary,
    height: 45,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  BtnTxt: {
    color: COLOR.primary,
    fontFamily: FONT.semibold,
    fontSize: 14,
  },
});
