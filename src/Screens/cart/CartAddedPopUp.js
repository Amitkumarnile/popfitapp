import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const CartAdded = (props) => {

    const [productdata, setproductdata] = useState([]);
    const [useraddress, setuseraddress] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [countnums, setCountnum] = useState(1);
    const DATA = ['first row', 'second row', 'third row', 'third row', 'third row'];

    const buttonClickedHandler = () => {
        props.navigation.goBack()
    };
    const gotoShippingDetail = () => {

        props.navigation.navigate("ShippingDetail");
    }
    const Productdecrease = () => {
        if (countnums > 1) {
            setCountnum(countnums - 1);
        }
    };
    const Productincrease = () => {
        // console.log(".before.", countnums);
        if (countnums < 10) {
            var Num = countnums + 1;
            setCountnum(+Num);
            console.log(".numm.", Num);

            console.log("..", countnums);
        }
    };
    useEffect(() => {
        // ProductADDcart();
        const unsubscribe = props.navigation.addListener('focus', () => {

            GetShippingProducts();

        });
        return unsubscribe;


    }, [props]);

    // console.log("Store_item...............:", props?.route?.params?.ITEM?.id);
    // const ITEM = props?.route?.params?.ITEM?.id
    // console.log("ClothITEM_item...............:", props?.route?.params?.CLOTHITEM?.id);
    // const CLOTHITEM = props?.route?.params?.CLOTHITEM?.id
    // let productids = ITEM ? ITEM : CLOTHITEM ? CLOTHITEM : null

    // console.log("selectproductid_item...............:", props?.route?.params?.selectproductid?.id);
    // const selectproductid = props?.route?.params?.selectproductid?.id

    const GetShippingProducts = async () => {

        // console.log(".....usertoken.....GetShippingProducts...", producttoken);

        setIsLoading(true)
        try {
            const response = await axios.get(`${API.SHIPPING_DETAILS}`);
            // console.log("", response);
            console.log("ResponseShippingProducts(product) ::::", response.data.data);
            setproductdata(response.data.data);
            setuseraddress(response.data.address_lists);
            // console.log("User_token_not_received+yet!!!>>>", response.data.message);

            setIsLoading(false)
        }
        catch (error) {
            console.log("ShippingProductserror:::", error.response.data.message);
            setIsLoading(false)
        }

    };

    // const ProductADDcart = async () => {
    //     console.log("ADD_productin_QNTY cart.....", countnums);
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.post(`${API.PRODUCT_DETAILS_ADD_ITEM}`, { "qty": countnums, "product_id": productids });
    //         console.log(":::::::::ProductADD_Response>>>", response.data.message);
    //         console.log("status _ProductADD:", response.data.status);
    //         if (response.data.status == 1) {
    //             GetShippingProducts();
    //             // Alert.alert("Added to cart")
    //             setIsLoading(false);
    //         }


    //     }
    //     catch (error) {
    //         console.log("......error ProductADD.........", error.response.data.message);
    //         setIsLoading(false);

    //     }

    // };

    const ProductRemovecart = async (item) => {

        const cartaddid = item.cart_id;
        console.log("Remove_productin cart.....", cartaddid);
        setIsLoading(true);
        try {
            const response = await axios.post(`${API.PRODUCT_DETAILS_REMOVE_ITEM}`, { "cart_id": cartaddid });
            console.log(":::::::::ProductRemovecart_Response>>>", response.data.message);
            console.log("status _ProductRemovecart:", response.data.status);
            GetShippingProducts();
            // props.navigation.goBack();
            // setProductitems(response.data.data)
            setIsLoading(false);
        }
        catch (error) {
            console.log("......error.........", error.response.data.message);
            setIsLoading(false);

        }

    };

    return (
        <SafeAreaView style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT, flexGrow: 1, backgroundColor: 'white',
        }} >
            {!isLoading ?
                (
                    <View style={{ marginBottom: 60 }}>
                        <Headers
                            Backicon={{
                                visible: true,
                            }}
                            BackicononClick={() => { props.navigation.goBack() }}

                            CartIcon={{
                                visible: true,
                            }}
                            CartIconononClick={() => { props.navigation.navigate("CartAdded") }}

                            Bellicon={{
                                visible: true,

                            }}
                            BelliconononClick={() => { props.navigation.navigate("Notifications") }}
                        />
                        <ScrollView>

                            <View
                                style={{
                                    backgroundColor: 'white',
                                    height: "100%",
                                    width: "100%",
                                    // marginHorizontal: 10,
                                    padding: 2,
                                    // borderRadius: 20,
                                    marginBottom: 10,
                                    // alignItems: 'flex-start',
                                    justifyContent: "center",
                                    flex: 1,

                                }}>

                                {/* Mycart text */}
                                <View
                                    style={{
                                        height: 50,
                                        // width: "100%",
                                        marginHorizontal: 20,
                                        // marginTop: 10,
                                        width: '100%',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        // backgroundColor: 'red',
                                        // flex: 1
                                    }}>
                                    {/* <View
                                style={{
                                    width: 35,
                                    height: 35,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image resizeMode="contain"
                                    style={{
                                        width: 15,
                                        height: 20, alignSelf: 'center'
                                    }}
                                    source={require('../assets/bag2.png')} />
                            </View> */}

                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                textAlign: 'left',
                                                fontSize: 15,
                                                color: '#000000',
                                                fontWeight: "bold",
                                            }}>
                                            My Cart
                                        </Text>
                                    </View>
                                    {/* <View
                                style={{
                                    marginLeft: -15,
                                    borderRadius: 25,
                                    backgroundColor: '#ffcc00',
                                    width: 20,
                                    height: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 12,
                                        color: 'white',

                                    }}>
                                    1
                                </Text>
                            </View> */}
                                </View>

                                {/* item list */}
                                <View style={{ justifyContent: "center" }}>
                                    <FlatList
                                        vertical
                                        data={productdata}
                                        renderItem={({ item }) =>
                                            <View>
                                                <View style={{
                                                    marginHorizontal: 6,
                                                    marginTop: 15,
                                                    height: 140,
                                                    width: WIDTH * 0.96,
                                                    borderRadius: 20,
                                                    marginBottom: 10,
                                                    backgroundColor: 'white',
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    shadowColor: '#000000',
                                                    // shadowOffset: {
                                                    //     width: 0,
                                                    //     height: 3
                                                    // },
                                                    shadowRadius: 6,
                                                    shadowOpacity: 1.0,
                                                    elevation: 6,
                                                    // zIndex: 999,

                                                    // flex: 1
                                                }}>
                                                    <TouchableOpacity onPress={() => { ProductRemovecart(item) }}
                                                        style={{
                                                            position: "absolute",
                                                            width: 30,
                                                            backgroundColor: 'red',
                                                            borderRadius: 35,
                                                            height: 35,
                                                            right: 10,
                                                            justifyContent: "center",
                                                            alignItems: 'center',
                                                            top: 6
                                                        }}>
                                                        <Image
                                                            source={require('../assets/cancelWhite.png')}
                                                            style={{
                                                                width: 35,
                                                                height: 35, alignSelf: 'center'
                                                            }}

                                                        />
                                                    </TouchableOpacity>
                                                    {/* <TouchableOpacity onPress={() => { ProductRemovecart() }}
                                                style={{
                                                    position: "absolute",
                                                    backgroundColor: 'red',
                                                    width: 30, height: 30,
                                                    justifyContent: "center",
                                                    alignItems: 'center',
                                                    borderRadius: 20 / 2,
                                                    top: -13,
                                                    right: 10
                                                }}>

                                                <Image
                                                    source={require('../assets/delete.png')}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 15,
                                                        height: 20, alignSelf: 'center'
                                                    }}
                                                />

                                            </TouchableOpacity> */}

                                                    <View style={{
                                                        height: 140,

                                                        flexDirection: 'row',
                                                        width: WIDTH * 0.96,
                                                        justifyContent: "flex-start",

                                                        // backgroundColor: 'pink',
                                                        alignItems: "center",
                                                        // paddingLeft: 6
                                                    }}>

                                                        <View style={{
                                                            width: 140, height: 140,
                                                            // backgroundColor: '#fceeb5', 
                                                            justifyContent: "center",
                                                            alignItems: "center",

                                                        }}>
                                                            <Image
                                                                resizeMode="contain"
                                                                style={{
                                                                    width: "100%",
                                                                    borderRadius: 20,
                                                                    height: "100%",
                                                                    alignSelf: 'center',

                                                                }}
                                                                source={{ uri: item.product_image }}
                                                            />

                                                        </View>

                                                        <View style={{
                                                            justifyContent: "flex-start", alignItems: "flex-start", width: WIDTH * 0.57,
                                                             marginLeft: 13
                                                        }}>
                                                            <Text style={{   textAlign: 'left', fontSize: 15, color: '#000000', fontWeight: "bold" }}>
                                                                {item.product_name.slice(0, 20) + '...'}
                                                            </Text>

                                                            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", height: 80, width: WIDTH * 0.57,backgroundColor:"white" }}>


                                                                <View style={{ marginTop: 1, flexDirection: 'row'}}>
                                                                    <View style={{}}>
                                                                        <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000' }}>Price : <Text style={{   textAlign: 'center', fontSize: 12, color: '#000000', }}>$
                                                                            {item.product_price}
                                                                        </Text></Text>
                                                                    </View>


                                                                </View>

                                                                <View style={{ backgroundColor: '#f2f2f2', flexDirection: 'row', padding: 4, borderRadius: 10, justifyContent: "flex-end", alignItems: "center", height: 50,marginTop: 35,width:100,marginLeft:100,position:"absolute" }}>
                                                                    <View style={{
                                                                        height: 45, marginRight: 5, justifyContent: "center", alignItems: "center",
                                                                    }}>
                                                                        <TouchableOpacity onPress={() => { Productdecrease() }}>
                                                                            <View style={{ backgroundColor: '#d6d6d6', width: 35, height: 40, padding: 1, justifyContent: "center", alignItems: 'center', borderRadius: 15 / 2 }}>
                                                                                <Text style={{ textAlign: 'center', fontSize: 37, color: 'black', marginBottom: 8, height: 50, justifyContent: "center", alignItems: "center", }}>-</Text>

                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={{
                                                                        height: 40, marginRight: 5, justifyContent: "center", alignItems: 'center', flex: 1
                                                                    }}>
                                                                        <View style={{ justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2, }}>
                                                                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'black', }}>{countnums}</Text>

                                                                        </View>
                                                                    </View>

                                                                    <View style={{
                                                                        height: 45, justifyContent: "center", alignItems: "center",
                                                                    }}>
                                                                        <TouchableOpacity onPress={() => { Productincrease() }}>
                                                                            <View style={{ backgroundColor: '#dbdbdb', width: 35, height: 40, padding: 1, justifyContent: "center", alignItems: 'center', borderRadius: 15 / 2 }}>
                                                                                <Text style={{ textAlign: 'center', fontSize: 28, color: 'black', marginTop: 8, height: 50, justifyContent: "center", alignItems: "center", }}>+</Text>

                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>

                                                            </View>
                                                        </View>


                                                    </View>
                                                </View>
                                            </View>
                                        }
                                    />
                                </View>

                                <View style={{
                                    backgroundColor: '#fffcee',
                                    height: 100,
                                    marginTop: 20,
                                    shadowColor: '#efe8c7',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    elevation: 2,
                                    marginBottom: 20, justifyContent: "center", alignItems: 'center'
                                }}>
                                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Subtotal  :</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  516.00</Text>
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 6, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Tax  :</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>Calculated at checkout</Text>
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 6, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Shipping  :</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>Calculated at checkout</Text>
                                        </View>
                                    </View>

                                </View>
                                {/* Total */}
                                <View style={{
                                    backgroundColor: '#fffcee',
                                    height: 40,
                                    marginTop: 20,
                                    shadowColor: '#efe8c7',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    elevation: 2,
                                    marginBottom: 20, justifyContent: "center", alignItems: 'center'
                                }}>
                                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Total  :</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  516.00</Text>
                                        </View>
                                    </View>



                                </View>
                                {/* futter buttons */}
                                < View
                                    style={{
                                        // bottom: 40,
                                        // position: "absolute",
                                        // marginBottom: 20,
                                        flexDirection: 'row',
                                        height: 50,
                                        marginHorizontal: 20,
                                        alignItems: 'center',
                                        justifyContent: "center"


                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                             props.navigation.navigate("Home")
                                        }}>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                width: 200,
                                                flex: 1,
                                                backgroundColor: '#ffcc00',
                                                borderRadius: 35,
                                            }}>
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    fontSize: 15,
                                                    color: 'white',

                                                    fontWeight: '700',
                                                }}>
                                                Continue Shopping
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            gotoShippingDetail()

                                        }}>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                width: 120,
                                                flex: 1,
                                                backgroundColor: '#ffcc00',
                                                borderRadius: 35,
                                                marginLeft: 10,
                                            }}>
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    fontSize: 15,
                                                    color: 'white',

                                                    fontWeight: '700',
                                                }}>
                                                Check Out
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View >
                            </View >

                        </ScrollView >

                    </View >)
                :
                (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#ffcc00" />
                </View>)}
        </SafeAreaView >
    )
}

export default CartAdded;



