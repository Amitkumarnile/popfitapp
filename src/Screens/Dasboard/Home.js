import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, ImageBackground, SafeAreaView, Animated, ActivityIndicator, Dimensions, Linking, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { Modal, RadioButton } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { DrawerActions } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import Banner from './Banner';
import Headers from '../../Routes/Headers';


var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Home = (props) => {

  const [banneritem, setbanneritem] = useState([]);
  const [ImageBaseUrl, setImageBaseUrl] = useState('');
  const [Storeitem, setStoreitem] = useState([]);
  const [Clothingitem, setClothingitem] = useState([]);
  const [Newrecipeitem, setNewrecipeitem] = useState([]);
  const [Newblogitem, setNewblogitem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const gotoBlog = () => {
    props.navigation.navigate("BlogBottomTab")
  };
  const gotoBlogDetail = (item) => {
    props.navigation.navigate("BlogDetail", {
      homeblogid: item
    })
  };
  const gotoShop = () => {
    props.navigation.navigate("FitnessEquipment")
  };
  const gotoproductshop = (item) => {
    props.navigation.navigate('ProductDetail', {
      ITEM: item
    });
  };
  const gototshirtproduct = (item) => {

    props.navigation.navigate("ProductDetail", {
      CLOTHITEM: item
    })
  };
  const gotoClothesType = () => {
    console.log("clothes.....!!!!")
    props.navigation.navigate("ClothesType")
  };
  const gotoRecipecategory = () => {
    props.navigation.navigate("Recipecategory")
  };
  const gotoRecipeDetails = () => {
    props.navigation.navigate("Recipesubcategory")
  };
  const gotoTrainingsubcatgory = (item) => {
    props.navigation.navigate("OutdoorTrainning", {
      Trainingitem: item
    })
  };
  // const gotoNotification = () => {
  //   props.navigation.navigate("Notifications")
  // }
  // const gotoCartAdded = () => {
  //   props.navigation.navigate("CartAdded")
  // }

  const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer())

  useEffect(() => {
    StoresProductget()

  }, []);

  const StoresProductget = async () => {

    try {
      setIsLoading(true);
      const response = await axios.get(`${API.HOME_PRODUCT_list}`);
      console.log(":::::::::Home_Store_Response>>>", response.data.fitnes_product);

      setbanneritem(response.data.banner)
      console.log(".....banner....", response.data.banner)
      setImageBaseUrl(response.data.product_url)
      setStoreitem(response.data.fitnes_product)
      setClothingitem(response.data.clothe_product)
      // console.log('====================================');
      // console.log(response.data.recipe_category_lis);
      // console.log('====================================');
      setNewblogitem(response.data.blog)
      setNewrecipeitem(response.data.recipe_category_list)

      setIsLoading(false);
    }
    catch (error) {
      console.log("......error.........", error.response.data.message);
      setIsLoading(false);

    }

  };

  // const NewBlogget = async () => {
  //   try {
  //     const response = await axios.get(`${API.HOME_BLOG_LIST}`);
  //     console.log(":::::::::NewBlog_Response>>>", response.data.blog);
  //     setNewblogitem(response.data.blog);


  //     // setIsLoading(false);
  //   }
  //   catch (error) {

  //     console.log("......error.........", error.response.data.message);
  //     // setIsLoading(false);

  //   }

  // };

  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1, backgroundColor: 'black'
    }} >
      {!isLoading ?
        (<View style={{ marginBottom: 60 }}>

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

          {/* <View style={styles.navigationBar}>

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
                <Image resizeMode="contain"
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
          <ScrollView>

            <View style={{
              alignItems: "flex-start", justifyContent: "flex-start"
            }}>
              {/* //first store slide bar//  */}

              {/* <View style={{   height: 160, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,backgroundColor: '#262626',paddingBottom:8  }}>
        <Pages indicatorColor='#ffcc00' >
          
          <View style={{ height: 100, flexDirection: 'row',backgroundColor: 'black',margin:20,marginTop:20, borderRadius:20}}>
            <View style={{ marginLeft: 20, flex: 1.4 / 2, justifyContent: 'center',   }}>
              <Text style={{ alignSelf: 'flex-start', textAlign: 'left', fontSize: 15, color: 'white', fontFamily: 'Raleway-SemiBold' }}>Lorem Ipsum is that it has a more
              </Text>
            </View>
            <View style={{ flex: 1, height: 100 }}>
              <Image source={require('../assets/logo4.png')}
                style={{ alignSelf: 'center', width: '100%', height: '100%',borderBottomRightRadius:20,borderTopRightRadius:20 }} />
            </View>
          </View>

          <View style={{ height: 100, flexDirection: 'row',backgroundColor: 'black',margin:20,marginTop:20, borderRadius:20}}>
            <View style={{ marginLeft: 20, flex: 1.4 / 2, justifyContent: 'center',   }}>
              <Text style={{ alignSelf: 'flex-start', textAlign: 'left', fontSize: 15, color: 'white', fontFamily: 'Raleway-SemiBold' }}>Lorem Ipsum is that it has a more
              </Text>
            </View>
            <View style={{ flex: 1, height: 100 }}>
              <Image source={require('../assets/logo4.png')}
                style={{ alignSelf: 'center', width: '100%', height: '100%',borderBottomRightRadius:20,borderTopRightRadius:20 }} />
            </View>
          </View>

         <View style={{ height: 100, flexDirection: 'row',backgroundColor: 'black',margin:20,marginTop:20, borderRadius:20}}>
            <View style={{ marginLeft: 20, flex: 1.4 / 2, justifyContent: 'center',   }}>
              <Text style={{ alignSelf: 'flex-start', textAlign: 'left', fontSize: 15, color: 'white', fontFamily: 'Raleway-SemiBold' }}>Lorem Ipsum is that it has a more
              </Text>
            </View>
            <View style={{ flex: 1, height: 100 }}>
              <Image source={require('../assets/logo4.png')}
                style={{ alignSelf: 'center', width: '100%', height: '100%',borderBottomRightRadius:20,borderTopRightRadius:20 }} />
            </View>
          </View>
        </Pages>
      </View> */}
              <View style={{ height: 200, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#262626', justifyContent: "center", alignItems: "center", alignSelf: "center", width: "100%" }}>

                <View style={{ height: 200, flexDirection: 'row', width: "100%", justifyContent: "center", alignItems: "center", paddingBottom: 3, }}>

                  <Banner data={banneritem} />

                </View>

              </View>

              {/* //WOkout category/// */}
              <View style={{ marginTop: 30, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 20, fontSize: 14, color: 'white', fontWeight: "bold" }}>Workout Training</Text>
                </View>
                <View style={{ flex: 0.25, right: 10, }}>
                  <TouchableOpacity onPress={() => props.navigation.navigate("TrainingDetail")}>
                    <View style={{ borderRadius: 24, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 9, color: 'white', fontWeight: "bold" }}>Explore Training</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList

                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ margin: 10 }}
                // columnWrapperStyle={{
                //   flex: 1,
                //   justifyContent: "space-around"
                // }}
                data={Storeitem}
                renderItem={({ item }) =>
                  <TouchableOpacity onPress={(item) => { gotoTrainingsubcatgory(item) }}>
                    <View style={{
                      // backgroundColor: '#262626',
                      backgroundColor: 'white',
                      height: 180,
                      width: WIDTH * 0.45,
                      marginTop: 10,
                      marginHorizontal: 6,
                      borderRadius: 25,
                      justifyContent: "center",
                      alignItems: 'center',
                      // shadowColor: '#ffffff',
                      // shadowOffset: {
                      //   width: 0,
                      //   height: 3
                      // },
                      // shadowRadius: 5,
                      // shadowOpacity: 1.0,
                      // elevation: 5,
                      // zIndex: 999,

                      // flex: 1
                    }}>

                      <View

                        style={{
                          // marginTop: 1,
                          width: WIDTH * 0.45, height: 150,
                          // borderRadius: 100  ,
                          // backgroundColor: '#fceeb5',
                          // flex: 1,
                          // borderRadius: 20,
                          borderTopRightRadius: 20,
                          borderTopLeftRadius: 20,
                          justifyContent: "flex-start", alignItems: "flex-start"

                        }}>

                        <Image
                          source={{ uri: ImageBaseUrl + item.image[0] }}
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
                          <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item.name.slice(0, 13) + '...'}</Text>

                        </View>
                      </View>

                      <View style={{ width: WIDTH * 0.45, height: 30, borderBottomRightRadius: 20, justifyContent: 'center', borderBottomLeftRadius: 20, backgroundColor: '#262626' }}>
                        <Text style={{ textAlign: 'center', fontSize: 9, color: '#c9bca0' }}>Subscription Plan1 @ 90 month </Text>
                      </View>


                      {/* <View style={{
                        width: "100%", flexDirection: 'column', justifyContent: "center", alignItems: "stretch"
                      }}>

                        <View style={{ marginLeft: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, }}>
                          <Text style={{ marginLeft: 16, fontSize: 12, color: 'black', fontWeight: "bold" }}>{item.name.slice(0, 7) + '...'}</Text>
                          <Text style={{ fontSize: 12, color: 'black', fontWeight: "bold" }}>$ {item.price}</Text>

                          <View style={{ borderBottomRightRadius: 25, alignItems: "center" }}>

                            <View style={{
                              alignItems: 'center', justifyContent: 'center', marginRight: 10, width: 30, height: 30, borderRadius: 20 / 2, backgroundColor: '#ffcc00',
                            }}>
                              <Image
                                resizeMode="contain"
                                style={{
                                  width: 15,
                                  height: 20, alignSelf: 'center'
                                }}
                                source={require('../assets/bag1.png')} />
                            </View>

                          </View>
                        </View>
                      </View> */}

                    </View>
                  </TouchableOpacity>
                }
              />

              {/* //New Blog container//// */}

              <View style={{ marginTop: 10, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 20, fontSize: 14, color: 'white', fontWeight: "bold" }}>New Blogs</Text>
                </View>
                <View style={{ flex: 0.25, right: 10 }}>
                  <TouchableOpacity onPress={() => { gotoBlog() }}>
                    <View style={{ borderRadius: 24, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 9, color: 'white', fontWeight: "bold" }}>Explore Blogs</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ margin: 10 }}
                data={Newblogitem}
                renderItem={({ item }) =>
                  <View style={{
                    backgroundColor: 'white',
                    height: 200,
                    width: WIDTH * 0.45,
                    marginTop: 15,
                    marginHorizontal: 6,
                    borderRadius: 20,
                    justifyContent: "center",
                  }}>
                    <View style={{
                      height: 100,
                      borderRadius: 20,
                      width: WIDTH * 0.45,
                    }}>
                      <TouchableOpacity onPress={() => {
                        Linking.openURL(item.youtube_link);
                      }}>
                        <View style={{ justifyContent: 'space-around', height: 110, resizeMode: "center", alignItems: "center", width: WIDTH * 0.45 }}>
                          <Image
                            resizeMode='contain'
                            source={{ uri: item.image }}
                            style={{ justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', backgroundColor: 'white', width: '100%', height: '100%', }} />

                          <TouchableOpacity style={{ height: 40, backgroundColor: 'red', width: 30, height: 30, justifyContent: "center", alignItems: 'center', borderRadius: 30 / 2, position: 'relative', zIndex: 2, top: -50 }}>
                            <Image
                              source={require('../assets/play.png')}
                            />
                          </TouchableOpacity>
                        </View>

                      </TouchableOpacity >
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        gotoBlogDetail(item)
                      }}
                      style={{
                        height: 100, width: WIDTH * 0.45,
                        backgroundColor: '#fceeb5',
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16, justifyContent: "flex-start", alignItems: "flex-start",
                      }}>
                      <Text style={{ marginLeft: 10, marginTop: 5, textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "bold" }}>{item.image_title.slice(0, 20) + '...'}</Text>

                      <View style={{ height: 65, alignItems: "center", justifyContent: "center", width: WIDTH * 0.45, marginTop: 2 }}>
                        <Text
                          style={{ marginHorizontal: 10, textAlign: 'left', fontSize: 7, color: '#000000', justifyContent: "center", alignItems: "center" }}>{item.image_description.slice(0, 308) + '...'}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                }

              />

              {/* //New Recipes & Tips  container//// */}
              <View style={{ marginTop: 10, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 20, fontSize: 14, color: 'white', fontWeight: "bold" }}>New Recipes & Tips</Text>
                </View>
                <View style={{ flex: 0.25, right: 10 }}>
                  <TouchableOpacity onPress={() => { gotoRecipecategory() }}>
                    <View style={{ borderRadius: 24, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 9, color: 'white', fontWeight: "bold" }}>Explore Recipe</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                // numColumns={2}
                style={{ margin: 10 }}
                data={Newrecipeitem}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {
                    gotoRecipeDetails()
                  }}>
                    <BackgroundImage
                      source={{ uri: item.image }}
                      style={{
                        // marginBottom: 10,
                        marginTop: 6,
                        marginHorizontal: 6,
                        // justifyContent: 'space-between',
                        height: 180,
                        width: WIDTH * 0.45,
                        overflow: 'hidden',
                        borderRadius: 15,
                        backgroundColor: "gray"
                      }}>

                      <View style={{ width: 115, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                        <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item.cat_name.slice(0, 20) + '...'}</Text>

                      </View>

                    </BackgroundImage>
                  </TouchableOpacity>
                )}
              />

              {/* //store/// */}
              <View style={{ marginTop: 10, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 20, fontSize: 14, color: 'white', fontWeight: "bold" }}>Fitness Equipment Store</Text>
                </View>
                <View style={{ flex: 0.25, right: 10, }}>
                  <TouchableOpacity onPress={() => { gotoShop() }}>
                    <View style={{ borderRadius: 24, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 9, color: 'white', fontWeight: "bold" }}>Explore Shop</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={Storeitem}
                style={{ margin: 10 }}
                renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => { gotoproductshop(item) }}>
                    <View style={{
                      backgroundColor: 'white',
                      height: 200,
                      width: WIDTH * 0.45,
                      marginTop: 10,
                      marginHorizontal: 6,
                      borderRadius: 25,
                      justifyContent: "center",
                      alignItems: 'center',

                    }}>
                      <View style={{
                        width: WIDTH * 0.45,
                        height: 155,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: 'white',
                      }}>

                        <Image
                          source={{ uri: ImageBaseUrl + item.image[0] }}
                          resizeMode="contain"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            alignSelf: 'center',
                          }}
                        />


                      </View>



                      <View style={{
                        width: WIDTH * 0.45, flexDirection: 'column', justifyContent: "center", alignItems: 'stretch', height: 45, backgroundColor: '#fceeb5', borderBottomRightRadius: 20, borderBottomLeftRadius: 20
                      }}>

                        <Text style={{ marginLeft: 16, fontSize: 12, color: 'black', fontWeight: "bold" }}>{item?.name?.slice(0, 15) + '...'}</Text>


                        <View style={{ marginLeft: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -3, }}>

                          <Text style={{ fontSize: 12, color: 'black', fontWeight: "bold" }}>$ {item?.price}</Text>



                          <View style={{
                            alignItems: 'center', justifyContent: 'center', marginRight: 6, width: 30, height: 30, borderRadius: 20 / 2, backgroundColor: '#ffcc00', bottom: 6
                          }}>
                            <Image
                              resizeMode="contain"
                              style={{
                                width: 15,
                                height: 20, alignSelf: 'center'
                              }}
                              source={require('../assets/bag1.png')} />
                          </View>

                        </View>
                      </View>

                    </View>
                  </TouchableOpacity>
                }
              />

              {/* //clothing store view// */}
              <View style={{ marginTop: 10, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 20, fontSize: 14, color: 'white', fontWeight: "bold" }}>Clothing Store </Text>
                </View>
                <View style={{ flex: 0.25, right: 10 }}>
                  <TouchableOpacity onPress={() => { gotoClothesType() }}>
                    <View style={{ borderRadius: 24, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 9, color: 'white', fontWeight: "bold" }}>Explore Store</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList
                horizontal
                style={{ margin: 10 }}
                showsHorizontalScrollIndicator={false}
                data={Clothingitem}
                renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => { gototshirtproduct(item) }}>
                    <View style={{
                      backgroundColor: 'white',
                      height: 200,
                      width: WIDTH * 0.45,
                      marginTop: 10,
                      marginHorizontal: 6,
                      borderRadius: 25,
                      justifyContent: "center",
                      alignItems: 'center',

                    }}>
                      <View style={{
                        width: WIDTH * 0.45,
                        height: 155,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: 'white'
                      }}>
                        <Image
                          source={{ uri: ImageBaseUrl + item.image[0] }}
                          resizeMode="contain"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            alignSelf: 'center',
                          }}
                        />

                      </View>
                      <View style={{
                        width: WIDTH * 0.45, flexDirection: 'column', justifyContent: "center", alignItems: 'stretch', height: 45, backgroundColor: '#fceeb5', borderBottomRightRadius: 20, borderBottomLeftRadius: 20
                      }}>
                        <Text style={{ marginLeft: 16, fontSize: 12, color: 'black', fontWeight: "bold" }}>{item?.name?.slice(0, 15) + '...'}</Text>

                        <View style={{ marginLeft: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -3, }}>

                          <Text style={{ fontSize: 12, color: 'black', fontWeight: "bold" }}>$ {item?.price}</Text>

                          <View style={{
                            alignItems: 'center', justifyContent: 'center', marginRight: 6, width: 30, height: 30, borderRadius: 20 / 2, backgroundColor: '#ffcc00', bottom: 6
                          }}>
                            <Image resizeMode="contain"
                              style={{
                                width: 15,
                                height: 20, alignSelf: 'center'
                              }}
                              source={require('../assets/bag1.png')} />
                          </View>

                        </View>
                      </View>

                    </View>
                  </TouchableOpacity>
                }
              />
            </View>
          </ScrollView>

        </View>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  )
}

export default Home;
