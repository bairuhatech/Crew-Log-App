import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import API from '../../Config/API';
import moment from 'moment';
import PageLoader from '../../Components/PageLoader';
import COLOR from '../../Config/COLOR';
import FONT from '../../Config/Fonts';
import Feather from 'react-native-vector-icons/Feather';

const UserViseLogs = (props: any) => {
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
      props.route.params.emp_id,
    )}?order=ASC&page=1&take=200`;
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
    <View style={{flex: 1, backgroundColor: COLOR.White}}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <PageLoader />
        </View>
      ) : (
        <View style={{flex: 1, paddingTop: 10, backgroundColor: COLOR.White}}>
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
                                name="log-in"
                                size={20}
                                color={'green'}
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
                    color: COLOR.grey1,
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

export default UserViseLogs;

const styles = StyleSheet.create({
  ReportStatus: {
    margin: 10,
    backgroundColor: COLOR.grey5,
    padding: 10,
    borderRadius: 7,
    marginBottom: 10,
  },

  ReportStatusDate: {
    color: COLOR.grey2,
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
    color: COLOR.grey2,
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
});
