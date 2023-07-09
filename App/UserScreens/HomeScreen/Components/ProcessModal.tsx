import {View, Text, Modal, ActivityIndicator, StatusBar} from 'react-native';
import React from 'react';
import styles from '../styles';
import COLOR from '../../../Config/COLOR';

const ProcessModal = (props: any) => {
  return (
    <Modal animationType="fade" visible={props.visible} transparent>
      <StatusBar backgroundColor={COLOR.transparent} />
      <View style={styles.ProcessModal}>
        <View style={styles.ModalBox1}>
          <ActivityIndicator color={COLOR.primary} size={'large'} />
          <Text style={styles.Modaltxt1}>Please wait</Text>
          <Text style={styles.Modaltxt2}>Checking your location</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ProcessModal;
