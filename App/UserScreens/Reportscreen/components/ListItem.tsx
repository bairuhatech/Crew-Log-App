import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import COLOR from '../../../Config/COLOR';
import styles from '../styles';
import moment from 'moment';

export default function ListItem(props: any) {
  return (
    <View style={styles.ListItem}>
      <StatusBar backgroundColor={COLOR.White} barStyle={'dark-content'} />
      <Text style={styles.txt1}>
        {moment(props.item && props.item[0].time).format('MMM Do YYYY')}
      </Text>
      {props.item?.map((val: any) => {
        return (
          <View style={styles.ListItemBox2} key={val.uuid}>
            {val && val.type === 'checkin' ? (
              <View style={styles.ListItemBox3}>
                <Text style={styles.txt2}>Check In</Text>
                <Text style={styles.txt2}>
                  {moment(val.checkin_time).format('h:mm:ss A')}
                </Text>
              </View>
            ) : (
              <View style={styles.ListItemBox3}>
                <Text style={styles.txt3}>Check Out</Text>
                <Text style={styles.txt3}>
                  {moment(val.checkout_time).format('h:mm:ss A')}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
