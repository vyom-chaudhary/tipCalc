/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Animated, Button, KeyboardAvoidingView } from 'react-native';
import { Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableOpacity, Dimensions } from 'react-native';
import Pie from 'react-native-pie'

const App = () => {
  const [amount, setAmount] = useState()
  const [tip, setTip] = useState(15)
  const [split, setSplit] = useState(1)

  const handleChangeText = (data) => {
    if (data > 100000) {
      setAmount()
      return Keyboard.dismiss()

    }
    setAmount(Math.round(data * 100) / 100)
  }
  useEffect(() => {
    // console.log(amount)
  }, [amount])

  return (

    <SafeAreaView style={styles.container} >
      <Text style={{ alignSelf: 'center', fontSize: 30, color: 'grey' }}>Your Bill</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 10 }}>
        <TextInput selectionColor='red' textAlign="center" value={amount ? amount.toString() : amount} style={{ width: '70%', height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10, marginHorizontal: 15 }} autoFocus={true} onChangeText={handleChangeText}
          keyboardType='decimal-pad'>
        </TextInput>
        <TouchableOpacity style={{ backgroundColor: "#44CD40", borderColor: 'black', borderWidth: 1, width: 60, justifyContent: 'center', alignItems: 'center' }} onPress={() => setAmount()}><Text style={{ fontSize: 20, color: '#ff0066' }}>Reset</Text></TouchableOpacity>

      </View>
      <Slider
        style={{ width: '90%', alignSelf: 'center', marginVertical: 10 }}
        value={amount}
        onValueChange={handleChangeText}
        maximumValue={500.00}
        minimumTrackTintColor="#44CD40"
        minimumValue={0.00}
        step={0.01}
        trackStyle={{ height: 10, backgroundColor: 'transparent', width: '95%' }}
        thumbStyle={{ height: 40, width: 40, backgroundColor: 'transparent' }}
        thumbProps={{
          children: (
            <Icon name="circle" size={40} color="#44CD40" />
          ),
        }}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <View style={{ flex: 1, }}>

          <View style={Math.round(Dimensions.get('window').height) > 700 ? styles.tipAndSplit_higher : styles.tipAndSplit_lower}>
            <View style={{ flex: 1, borderTopWidth: 2, borderColor: 'gray' }}>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: 'grey' }}>Tip :</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                <TouchableOpacity style={{ width: 40, borderTopRightRadius: 10, borderBottomRightRadius: 10, paddingBottom: 2, marginHorizontal: 10, borderWidth: 3, borderColor: 'grey', paddingHorizontal: 10, borderTopLeftRadius: 25, borderBottomLeftRadius: 25, alignItems: 'center', justifyContent: 'center' }} onPress={() => tip > 1 ? setTip(tip - 1) : setTip(tip)}>
                  <Text style={{ fontSize: 30, color: "#ff0066", transform: [{ scaleX: 2 }] }}>-</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 30, color: "#ff0066" }}>{tip}%</Text>
                <TouchableOpacity style={{ width: 40, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, marginHorizontal: 10, borderWidth: 3, borderColor: 'grey', paddingHorizontal: 10, borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingBottom: 2 }} onPress={() => tip < 51 ? setTip(tip + 1) : setTip(tip)}>
                  <Text style={{ fontSize: 28, color: "#ff0066" }}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: 'grey' }}>Tip Total:</Text>
              <Text style={{ fontSize: 30, color: "#ff0066", alignSelf: 'center' }}>${amount ? (Math.round((amount * tip / 100) * 100) / 100) : 0}</Text>
            </View>
            <View style={{ flex: 1, borderTopWidth: 2, borderColor: 'gray', borderLeftWidth: 2 }}>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: 'grey' }}>Split :</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                <TouchableOpacity style={{ width: 40, borderTopRightRadius: 10, borderBottomRightRadius: 10, paddingBottom: 2, marginHorizontal: 10, borderWidth: 3, borderColor: 'grey', paddingHorizontal: 10, borderTopLeftRadius: 25, borderBottomLeftRadius: 25, alignItems: 'center', justifyContent: 'center' }} onPress={() => split > 1 ? setSplit(split - 1) : 1}>
                  <Text style={{ fontSize: 30, color: "#ff0066", transform: [{ scaleX: 2 }] }}>-</Text>
                </TouchableOpacity><Text style={{ fontSize: 30, color: "#ff0066" }}>{split}</Text>
                <TouchableOpacity style={{ width: 40, marginHorizontal: 10, borderWidth: 3, borderColor: 'grey', paddingHorizontal: 10, borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingBottom: 2, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, }} onPress={() => split < 25 ? setSplit(split + 1) : setSplit(split)}>
                  <Text style={{ fontSize: 28, color: "#ff0066", }}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: 'grey' }}>Total per Person:</Text>
              <Text style={{ fontSize: 30, color: "#ff0066", alignSelf: 'center' }}>${amount ? Math.round((((amount * tip / 100) + amount) / split) * 100) / 100 : 0}</Text>
            </View>
          </View>


          <View style={{ flex: 2, borderWidth: 2, borderColor: 'gray', flexDirection: 'row' }}>
            <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: 'grey' }}>Total with Tip:</Text>
              <Text style={{ fontSize: 30, color: "#ff0066", alignSelf: 'center' }}>${amount ? Math.round(((amount * tip / 100) + amount) * 100) / 100 : 0}</Text>
            </View>
            <View style={{ justifyContent: 'center', marginVertical: 10 }}>
              <Pie
                radius={80}
                innerRadius={50}
                sections={[
                  {
                    percentage: tip,
                    color: '#C70039',
                  },
                  {
                    percentage: 100 - tip,
                    color: '#44CD40',
                  },

                ]}
                dividerSize={2}
                strokeCap={'butt'}
              />
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ backgroundColor: '#44CD40', height: 20, width: 20, }}></View>
                <Text style={{ marginLeft: 5 }}>Your bill</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ backgroundColor: '#C70039', height: 20, width: 20, }}></View>
                <Text style={{ marginLeft: 5 }}>Tip</Text>
              </View>
            </View>
          </View>

        </View>
      </TouchableWithoutFeedback>


    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66ffff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  tipAndSplit_lower: {
    flex: 1.2, flexDirection: 'row'
  },
  tipAndSplit_higher: {
    flex: 1, flexDirection: 'row'
  }
});
export default App;
