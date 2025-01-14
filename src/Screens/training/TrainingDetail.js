import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { DrawerActions } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import MyTabBar from '../../Routes/MyTabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const DATA = ['first row', 'second row', 'third row', 'fourth row'];

const newData = [{
    key: '1',
    text: 'Item text 1',
    uri: 'https://picsum.photos/id/1/200',
},
{
    key: '2',
    text: 'Item text 2',
    uri: 'https://picsum.photos/id/10/200',
},

{
    key: '3',
    text: 'Item text 3',
    uri: 'https://picsum.photos/id/1002/200',
},
{
    key: '4',
    text: 'Item text 4',
    uri: 'https://picsum.photos/id/1006/200',
},


];

const TrainingDetail = (props) => {

    // const gotoCartAdded = () => {
    //     props.navigation.navigate("CartAdded")
    // }
    const [TrainingWorkCatgry, setTrainingWorkCatgry] = useState([]);

    const [subscriptiontoken, setsubscriptiontoken] = useState("");

    useEffect(() => {
        getusertoken();
        workoutCategoryAPI();
    }, [props]);

    const getusertoken = async () => {
        const usertoken = await AsyncStorage.getItem("authToken");
        console.log("Training>>>>>..", usertoken);
        setsubscriptiontoken(usertoken)
    }
    const Checkedtoken = (item) => {

        !subscriptiontoken ?
            props.navigation.navigate("SubscriptionPlan")
            :
            props.navigation.navigate("OutdoorTrainning", {
                categoryId: item
            })

    };
    const workoutCategoryAPI = async () => {
        try {
            // setIsLoading(true);
            const response = await axios.get(`${API.TRAINING_WORKOUT_CATEGORY}`);
            console.log(":::::::::Traing_Workout_Response>>>::", response.data);
            console.log("Traing_Workout_data:::>:::", response.data.data);
            setTrainingWorkCatgry(response.data.data)
            // setIsLoading(false);

        }
        catch (error) {
            console.log("......error.........", error.response.data.message);
            // setIsLoading(false);

        }
    };

    const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer());
    const gotoNotification = () => {
        props.navigation.navigate("Notifications")
    }

    const gotoTrainingpersondetails = () => {
        props.navigation.navigate("TrainingPersonaDetail")
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT, flexGrow: 1, backgroundColor: 'black'
        }} >
            <Headers
                Drawericon={{
                    visible: true,
                }}
                DrawericononClick={() => { props.navigation.dispatch(DrawerActions.openDrawer()) }}

                CartIcon={{
                    visible: true,
                }}
                CartIconononClick={() => { props.navigation.navigate("CartAdded") }}

                Bellicon={{
                    visible: true,

                }}
                BelliconononClick={() => { props.navigation.navigate('Notifications') }}
            />


            {/* <View style={styles.navigationBarBlack1}>
                <View style={styles.navigationBarLeftContainer}>
                    <TouchableOpacity onPress={() => { openDrawer() }}>
                        <Image source={require('../assets/hamburgerLeft.png')}
                            style={{
                                width: 25,
                                height: 25, alignSelf: 'center'
                            }} />

                    </TouchableOpacity>
                </View>

                <View style={styles.navigationBarCenterContainer}>
                    <TouchableOpacity>
                        <Image resizeMode='contain'
                            source={require('../assets/layerCenter.png')}
                            style={{
                                width: 80,
                                height: 50, alignSelf: 'center'
                            }} />

                    </TouchableOpacity>
                </View>

               <View style={styles.navigationBarRight2Container}>
              <TouchableOpacity onPress={() => { gotoCartAdded() }}>
                <Image resizeMode="contain"
                  source={require('../assets/cart.png')}
                  style={{
                    width: 25,
                    height: 30, alignSelf: 'center', 
                    marginRight: 10
                  }} />

              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: '#ec1f1f',
                  width: 10,
                  height: 10,
                  borderRadius: 10 / 2,
                  // marginLeft: 30,
                  marginTop: -15,
                  right: 15
                }}>

              </View>
            </View>

            <View style={styles.navigationBarRightContainer}>
              <TouchableOpacity onPress={() => { gotoNotification() }}>
                <Image source={require('../assets/bellRight.png')}
                  style={{
                    width: 20,
                    height: 25, alignSelf: 'center', marginRight: 19
                  }} />

              </TouchableOpacity>
            </View>
            </View> */}
            <Divider color='#393939' width={1.2} />
            <ScrollView  >
                <View style={{ backgroundColor: '#262626', height: 180, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                    <Pages indicatorColor='#ffcc00' >
                        <View style={{ marginTop: 20, height: 130, flexDirection: 'row', marginHorizontal: 20, borderRadius: 20 }}>
                            <View style={{ flex: 1 / 1.5, justifyContent: 'center', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }}>

                                <Image source={require('../assets/trainningLogo.png')}
                                    style={{ alignSelf: 'center', width: '100%', height: '100%', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }} />
                            </View>
                            <View style={{ flex: 1, backgroundColor: "white", borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                                <View style={{ height: 30, marginTop: 30, }}>
                                    <Text style={{ textAlign: 'center', fontSize: 12, color: 'black', }}>Set Up Your Training Workout</Text>
                                </View>

                                <View style={{ marginHorizontal: 20, flexDirection: 'row', height: 30, justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => { gotoTrainingpersondetails() }}>
                                        <View style={{ borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', width: 120, flex: 1, backgroundColor: 'white', borderRadius: 35 }}>
                                            <Text style={{ textAlign: 'center', fontSize: 9, color: '#ffcc00', }}>View & Edit Details</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, height: 130, flexDirection: 'row', marginHorizontal: 20, borderRadius: 20 }}>
                            <View style={{ flex: 1 / 1.5, justifyContent: 'center', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }}>

                                <Image source={require('../assets/trainningLogo.png')}
                                    style={{ alignSelf: 'center', width: '100%', height: '100%', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }} />
                            </View>
                            <View style={{ flex: 1, backgroundColor: "white", borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                                <View style={{ height: 30, marginTop: 30, }}>
                                    <Text style={{ textAlign: 'center', fontSize: 12, color: 'black', }}>Set Up Your Training Workout</Text>
                                </View>

                                <View style={{ marginHorizontal: 20, flexDirection: 'row', height: 35, justifyContent: 'center' }}>
                                    <TouchableOpacity>
                                        <View style={{ borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', width: 90, flex: 1, backgroundColor: 'white', borderRadius: 35 }}>
                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#ffcc00', }}>Save Detail</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={{ marginLeft: 10, borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', width: 90, flex: 1, backgroundColor: 'white', borderRadius: 35 }}>
                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#ffcc00', }}>Invite Friends</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                    </Pages>
                </View>

                {/* Workout Category */}
                <Text style={{ marginTop: 30, marginLeft: 20, textAlign: 'left', fontSize: 14, color: 'white', fontWeight: "bold" }}>Workout Category</Text>
                <FlatList
                    columnWrapperStyle={{
                        flex: 1,
                        justifyContent: "space-around"
                    }}
                    numColumns={Math.ceil(DATA.length / 2)}
                    data={TrainingWorkCatgry}
                    style={{ margin: 10 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { Checkedtoken(item) }}>
                            <View
                                style={{
                                    marginTop: 10,
                                    backgroundColor: 'white',
                                    height: 180,
                                    width: WIDTH * 0.45,
                                    borderRadius: 25,
                                    marginBottom: 20,
                                    marginHorizontal: 6,
                                    justifyContent: "center",
                                    alignItems: 'center',
                                }}>

                                <View
                                    style={{
                                        width: WIDTH * 0.45, height: 150,borderTopRightRadius: 20,
                                        borderTopLeftRadius: 20,justifyContent:"flex-start",alignItems:"flex-start"
                                    }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        resizeMode="contain"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                            alignSelf: 'center',
                                        }}
                                    />
                                    <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                                        <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.cat_name}</Text>

                                    </View>

                                </View>
                                <View style={{ width: WIDTH * 0.45, height: 30, borderBottomRightRadius: 20, justifyContent: 'center', borderBottomLeftRadius: 20, backgroundColor: '#262626' }}>
                        <Text style={{ textAlign: 'center', fontSize: 9, color: '#c9bca0' }}>Subscription Plan1 @ 90 month </Text>
                      </View>

                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </SafeAreaView>

    );
}
export default TrainingDetail;
