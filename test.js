import React, { Component } from 'react'
import { Container, Header, Content, Item, Input, Icon, ListItem, List, Left, Right, Body } from 'native-base';
import { Text, TextInput, View, TouchableOpacity, SafeAreaView, ScrollView, FlatList, StyleSheet, Alert } from 'react-native'
// import { Left } from 'native-base';
let str = "#EvenionS02Or@eve03"

export class test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Uppercase: 0,
            Lowercase: 0,
            digit: 0,
            special_character: 0,
            data: [],
            txtInputValue: '',
            index:'',
            value: '',
            edit:false
        }
    }


    _count = async () => {
        await this.setState({
            Uppercase: 0,
            Lowercase: 0,
            digit: 0,
            special_character: 0
        })
        for (let i = 0; i < str.length; i++) {
            if (str[i] >= 'A' && str[i] <= 'Z') {
                await this.setState({ Uppercase: this.state.Uppercase + 1 })

            }
            else if (str[i] >= 'a' && str[i] <= 'z') {
                await this.setState({ Lowercase: this.state.Lowercase + 1 })

            }
            else if (str[i] >= '0' && str[i] <= '9') {
                await this.setState({ digit: this.state.digit + 1 })

            }
            else {
                await this.setState({ special_character: this.state.special_character + 1 })
            }
        }
    }

    ItemView = ({ item, index }) => {
        return (
            // FlatList Item
            <View>
                <Item>
                    <Text
                        style={styles.item}
                        onPress={() => this.getItem(item)}>
                        {item.value}
                    </Text>
                    <Right>
                        <TouchableOpacity onPress={() => this.getItem(item, index)}><Icon active name='pencil' /></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.deleteItemAlert(item,index)}><Icon active name='trash' /></TouchableOpacity>
                    </Right>
                </Item>


            </View>



        );
    };

    ItemSeparatorView = () => {
        return (
            // FlatList Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8'
                }}
            />
        );
    };

    getItem = (item, index) => {
        //Function for click on an item
        // alert('Id: ' + index + ' Value: ' + item.value);
        Alert.alert(
            "Edit Item",
            item.value,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => this.editItem(item, index) }
            ],
            { cancelable: false }
        );
    };

    editItem = async (item, index) => {
        await this.setState({ txtInputValue: item.value, edit: true ,index:index})
    }

    updateItem = async () => {
        const {index,txtInputValue} = this.state
        
        this.state.data[index].value = txtInputValue;
        this.setState({txtInputValue:'',edit:false})
    }

    cancelItem = async (item, index) => {
        await this.setState({ edit: false })
    }


    deleteItemAlert = async(item,index) => {
        Alert.alert(
            "Delete Item",
            item.value,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => this.deleteItem() }
            ],
            { cancelable: false }
        );
    }

    deleteItem = async(item,index) => {
        this.state.data.splice(index, 1) 
        console.log('data: ',[...this.state.data])
        await this.setState({
            data:[...this.state.data]
        })
    }

    addItem = async () => {
        let len = this.state.data.length
        console.log('len: ', len)
        if (this.state.txtInputValue != '') {
            await this.setState({
                data: [...this.state.data, { "value": this.state.txtInputValue }],
                txtInputValue: ''
            })
            console.log('this.state.data: ', this.state.data)
        }

    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{ justifyContent: 'space-between', alignItems: 'stretch' }}>
                        <Text >String: {str}</Text>
                        <TouchableOpacity onPress={this._count} style={styles.btnContainer}>
                            <Text style={styles.btnText}> Count </Text>
                        </TouchableOpacity>
                        <Text> Uppercase : {this.state.Uppercase}</Text>
                        <Text> Lowercase : {this.state.Lowercase}</Text>
                        <Text> Digit : {this.state.digit}</Text>
                        <Text> special_character : {this.state.special_character}</Text>

                        <TextInput
                            style={{ height: 40, marginTop: 10, marginBottom: 5 }}
                            placeholder="Type here to add in list"
                            onChangeText={value => this.setState({ txtInputValue: value })}
                            defaultValue={this.state.txtInputValue}
                        />
                        {!this.state.edit ? 

                            <TouchableOpacity onPress={() => this.addItem()} style={styles.btnContainer}>
                                <Text style={styles.btnText}> Add Item </Text>
                            </TouchableOpacity>
                        :

                        <TouchableOpacity onPress={()=> this.updateItem()} style={styles.btnContainer}>
                            <Text style={styles.btnText}> edit Item </Text>
                        </TouchableOpacity>
                        }
                    </View>
                    <List>
                        <FlatList
                            data={[...this.state.data]}
                            //data defined in constructor
                            ItemSeparatorComponent={this.ItemSeparatorView}
                            //Item Separator View
                            renderItem={this.ItemView}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </List>

                </ScrollView>
            </SafeAreaView>

        )
    }
}

export default test

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 30,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    btnContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    btnText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});