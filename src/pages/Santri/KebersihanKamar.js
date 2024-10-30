import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyCalendar, MyGap, MyHeader } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
export default function KebersihanKamar({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [sakit, setSakit] = useState([]);
    const [kirim, setKirim] = useState({
        fid_kamar: item.id_kamar,
        tanggal: moment().format('YYYY-MM-DD')
    })

    const isFocus = useIsFocused();

    const getDataTransaksi = () => {
        // setLoading(true);

        getDataByTable('kamar_santri').then(res => {
            console.log(res.data);
            setData(res.data)
        });

        POSTDataByTable('get_sakit', kirim).then(res => {
            console.log(res.data);
            setSakit(res.data);

        })

    }


    useEffect(() => {
        if (isFocus) {
            getDataTransaksi();
        }
    }, [isFocus]);

    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('KamarDetail', item)

            }}>
                <View style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    flexDirection: 'row',
                    position: 'relative',
                    borderRadius: 10,
                    // margin: 10,
                    marginHorizontal: 5,
                    marginVertical: 10,
                    overflow: 'hidden'
                }}>


                    <View style={{
                        flex: 1,
                        width: '100%',
                        backgroundColor: colors.white
                    }}>
                        <View style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[300]
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.subheadline3,
                                color: colors.primary
                            }}>Nama Kelas / Kamar</Text>
                            <Text style={{
                                flex: 1,
                                ...fonts.headline5,
                                color: colors.primary
                            }}>{item.nama_kamar}</Text>
                        </View>
                        <View style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[300]
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.subheadline3,
                                color: colors.primary
                            }}>Nomor Kamar</Text>
                            <Text style={{
                                flex: 1,
                                ...fonts.headline5,
                                color: colors.primary
                            }}>{item.nomor_kamar}</Text>
                        </View>
                        <View style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.subheadline3,
                                color: colors.primary
                            }}>Jumlah Santri</Text>
                            <Text style={{
                                flex: 1,
                                ...fonts.headline5,
                                color: colors.primary
                            }}>{item.jumlah} Orang</Text>
                        </View>

                    </View>
                    <View style={{
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.primary,
                    }}>
                        <Icon type='ionicon' name='bed' color={colors.white} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader title="Rekap Data Harian" onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 12,
                }}>

                    <MyCalendar onDateChange={x => setKirim({ ...kirim, tanggal: x })} value={kirim.tanggal} textColor={colors.primary} label="Tanggal" />
                    <MyGap jarak={20} />
                    <View style={{
                        borderWidth: 1,
                        borderColor: colors.primary,
                        marginBottom: 10,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            paddingVertical: 8,
                            paddingLeft: 5,
                        }}>
                            <Icon type='ionicon' name='bed-outline' size={20} color={colors.white} />
                            <Text style={{

                                ...fonts.headline4,
                                color: colors.white,
                                flex: 1,
                                padding: 10,
                            }}>Kebersihan Kamar</Text>

                            <TouchableOpacity onPress={() => navigation.navigate('KebersihanKamarAdd', item)} style={{
                                marginRight: 5,
                                backgroundColor: colors.white,
                                width: 80,
                                height: 40,
                                borderRadius: 20,
                                justifyContent: "center"
                            }}>
                                <Icon type='ionicon' name='add' color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            padding: 10,
                        }}>

                        </View>

                    </View>


                    <View style={{
                        borderWidth: 1,
                        borderColor: colors.primary,
                        marginBottom: 10,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            paddingVertical: 8,
                            paddingLeft: 5,
                        }}>
                            <Icon type='ionicon' name='person-outline' size={20} color={colors.white} />
                            <Text style={{

                                ...fonts.headline4,
                                color: colors.white,
                                flex: 1,
                                padding: 10,
                            }}>Kebersihan Pribadi</Text>

                            <TouchableOpacity style={{
                                marginRight: 5,
                                backgroundColor: colors.white,
                                width: 80,
                                height: 40,
                                borderRadius: 20,
                                justifyContent: "center"
                            }}>
                                <Icon type='ionicon' name='add' color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            padding: 10,
                        }}>

                        </View>

                    </View>

                    <View style={{
                        borderWidth: 1,
                        borderColor: colors.primary,
                        marginBottom: 10,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            paddingVertical: 8,
                            paddingLeft: 5,
                        }}>
                            <Icon type='ionicon' name='medkit-outline' size={20} color={colors.white} />
                            <Text style={{

                                ...fonts.headline4,
                                color: colors.white,
                                flex: 1,
                                padding: 10,
                            }}>Sakit</Text>

                            <TouchableOpacity onPress={() => navigation.navigate('SakitAdd', item)} style={{
                                marginRight: 5,
                                backgroundColor: colors.white,
                                width: 80,
                                height: 40,
                                borderRadius: 20,
                                justifyContent: "center"
                            }}>
                                <Icon type='ionicon' name='add' color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            padding: 10,
                        }}>
                            <FlatList data={sakit} renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        marginBottom: 10,
                                        borderWidth: 1,
                                        padding: 10,
                                        borderRadius: 10,
                                        borderColor: Color.blueGray[300],
                                    }}>
                                        <Text style={{
                                            ...fonts.subheadline3,
                                        }}>{item.nama_santri}</Text>
                                        <Text style={{
                                            ...fonts.body3,
                                        }}>{item.keterangan}</Text>
                                    </View>
                                )
                            }} />
                        </View>

                    </View>


                </View>
            }
            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})