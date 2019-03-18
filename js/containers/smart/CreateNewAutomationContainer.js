import React, { Component } from 'react';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import CreateNewAutomationView from '../../components/smart/CreateNewAutomation';
import { View, Text } from 'react-native';
import Touch from 'react-native-touch-once';

class CreateNewAutomationContainer extends Component {

    static navigationOptions = ({ navigation }) => {
        console.log(navigation.state)
        const { params = {} } = navigation.state;
        return {
            headerTitle: 'Manage automation',
            headerRight: (
                <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
                    <Touch
                        style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
                        activeOpacity={0.5}
                        onPress={() => params.createNewAutoMation()}
                    >
                        <Text style={{fontSize:17, color:'#2C2D30'}}>SAVE</Text>
                    </Touch>
                </View>
            ),
        };
    };

    render() {
        return <CreateNewAutomationView style={{ flex: 1 }} container={this.props} />;
    }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
  };
};

export default connect(mapStateToProps, null)(
    CreateNewAutomationContainer,
);
