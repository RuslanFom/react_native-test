import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import * as Progress from 'react-native-progress';
import {TextInput} from 'react-native-paper';
import DropDownIcon from '../../assets/images/svgs/DropDownIcon';
import TickIcon from '../../assets/images/svgs/TickIcon';

import {styles} from './styles';
import {useOrientation} from '../../utils/useOrientation';

const SignUp = () => {
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        checkBox: false,
    });

    const [phoneData, setPhoneData] = useState([]);
    const [selectedNumber, setSelectedNumber] = useState('+7');
    const [reqLoading, setReqLoading] = useState(false);

    const isDisabled =
        email == '' ||
        username == '' ||
        username.length < 3 ||
        email.length < 10 ||
        phoneNumber == '' ||
        selectedNumber.length - 1 + phoneNumber.length < 7 ||
        errors.email ||
        errors.username ||
        errors.checkBox ||
        !checked;

    const [isNotExpanded, setIsExpanded] = useState(true);

    const orientation = useOrientation();

    const isEmailValid = userEmail => {
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(String(userEmail).toLowerCase());
    };

    const isNameValid = userName => {
        if (username.length <= 3) {
            return false;
        }
        let pattern = /[^А-Яа-я]/gi;
        return pattern.test(String(userName));
    };

    const isPhoneValid = userPhone => {
        console.log(userPhone, 'my phone');
        if (userPhone.length < 7) {
            return false;
        }
        let pattern = /[^\d]/g;
        console.log(pattern.test(String(userPhone)));
        return pattern.test(String(userPhone));
    };

    const handleClearInputs = () => {
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        setSelectedNumber('+7');
    };

    const handleSubmit = async () => {
        setReqLoading(true);
        fetch(`http://192.168.0.159/api/createNewUser/`, {        /*тут менять в зависимости от того, откуда будет запуск приложения. У меня сейчас с локального компьютера, потому указан мой IP*/
            method: 'POST',
            body: JSON.stringify({
                name: username,
                phone: selectedNumber + phoneNumber,
                email: email,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log(response)
                if (response.status >= 200 && response.status < 300) {
                    handleClearInputs();
                    Alert.alert('Success');
                }
            })
            .finally(() => setReqLoading(false));
    };

    useEffect(() => {
        fetch(
            'https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json',
        )
            .then(res => res.json())
            .then(data => setPhoneData(data));
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 80}}
            style={[
                styles.pageWrapper,
                orientation === 'LANDSCAPE' && {paddingHorizontal: 60},
            ]}>
            <View style={styles.screenContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Создать аккаунт</Text>
                </View>
                <View style={styles.fieldsContainer}>
                    <TextInput
                        style={styles.textInputContainer}
                        mode="outlined"
                        outlineColor={errors.username ? '#DE494A' : '#8F8F8F'}
                        activeOutlineColor={errors.username ? '#DE494A' : '#0063FF'}
                        selectionColor={'white'}
                        maxLength={10}
                        onChangeText={e => {
                            let value = e;
                            value = value.replace(/[^А-Яа-я]/gi, '');
                            setUsername(value);
                            isNameValid(value)
                                ? setErrors(prevErrors => ({...prevErrors, username: ''}))
                                : setErrors(prevErrors => ({
                                    ...prevErrors,
                                    username: 'Введите нормальное имя',
                                }));
                            value.length >= 3 && setErrors({...errors, username: ''});
                        }}
                        value={username}
                        theme={{
                            colors: {
                                text: errors.username ? '#DE494A' : '#fff',
                                placeholder: errors.username ? '#DE494A' : '#8F8F8F',
                            },
                            roundness: 15,
                        }}
                        label={'Имя'}
                        onBlur={() =>
                            (!username || username.length < 3) &&
                            setErrors(prevErrors => ({
                                ...prevErrors,
                                username: 'Введите нормальное имя',
                            }))
                        }
                    />
                    {errors.username ? (
                        <Text style={styles.errorText}>{errors.username}</Text>
                    ) : null}
                    <View style={{marginTop: 15}}>
                        <TextInput
                            style={styles.textInputContainer}
                            mode="outlined"
                            outlineColor={errors.email ? '#DE494A' : '#8F8F8F'}
                            activeOutlineColor={errors.email ? '#DE494A' : '#0063FF'}
                            selectionColor={'white'}
                            maxLength={30}
                            onChangeText={val => {
                                setEmail(val);
                                !isEmailValid(val) || val.length < 10
                                    ? setErrors(prevErrors => ({
                                        ...prevErrors,
                                        email: 'Введите корректный емэйл',
                                    }))
                                    : setErrors(prevErrors => ({...prevErrors, email: ''}));
                            }}
                            value={email}
                            theme={{
                                colors: {
                                    text: errors.email ? '#DE494A' : '#fff',
                                    placeholder: errors.email ? '#DE494A' : '#8F8F8F',
                                },
                                roundness: 15,
                            }}
                            label={'E-mail'}
                            onBlur={() =>
                                (!email || !isEmailValid(email)) &&
                                setErrors({...errors, email: 'Введите корректный емэйл'})
                            }
                        />
                        {errors.email ? (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        ) : null}
                    </View>

                    <View
                        style={[
                            styles.phoneInputWrapper,
                            errors.phoneNumber && {
                                borderColor: '#DE494A',
                            },
                        ]}>
                        <View style={styles.phoneInputContent}>
                            <TouchableOpacity
                                onPress={() => setIsExpanded(!isNotExpanded)}
                                style={{
                                    width: 80,
                                    height: '100%',
                                }}>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            color: errors.phoneNumber ? '#DE494A' : 'white',
                                            alignSelf: 'center',
                                        }}>
                                        {selectedNumber}
                                    </Text>
                                    <View style={{alignSelf: 'center', marginLeft: 5}}>
                                        <DropDownIcon/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{justifyContent: 'center'}}>
                                <View style={styles.phoneInputContentDivider}></View>
                            </View>
                            <TextInputMask
                                onChangeText={(formatted, extracted) => {
                                    let value = extracted;
                                    value = value.replace(/[^\d]/g, '');
                                    setPhoneNumber(value);
                                    isPhoneValid(value)
                                        ? setErrors(prevErrors => ({
                                            ...prevErrors,
                                            phoneNumber: '',
                                        }))
                                        : setErrors(prevErrors => ({
                                            ...prevErrors,
                                            phoneNumber: 'Введите корректный номер телефона',
                                        }));
                                    value.length >= 7 &&
                                    setErrors(prevErrors => ({...prevErrors, phoneNumber: ''}));
                                }}
                                mask={"([000]) [000] [00] [00]"}
                                placeholderTextColor={orientation === 'LANDSCAPE' && "#fff"}
                                style={[
                                    orientation === 'LANDSCAPE' ? styles.phoneInputLandscape : styles.phoneInput,
                                    errors.phoneNumber && {color: '#DE494A'},
                                ]}
                                value={phoneNumber}
                                onBlur={() =>
                                    (!phoneNumber || isPhoneValid(phoneNumber)) &&
                                    setErrors(prevErrors => ({
                                        ...prevErrors,
                                        phoneNumber: 'Введите корректный номер телефона',
                                    }))
                                }
                            />
                        </View>
                        {!isNotExpanded && (
                            <ScrollView
                                nestedScrollEnabled
                                style={{
                                    borderTopWidth: 1,
                                    borderTopColor: '#8F8F8F',
                                    height: 220,
                                }}>
                                {phoneData.map(data => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectedNumber(data.dial_code);
                                                setIsExpanded(!isNotExpanded);
                                            }}
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                paddingHorizontal: 40,
                                                paddingVertical: 12,
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: '500',
                                                    lineHeight: 21,
                                                    color: 'white',
                                                }}>
                                                {data.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: '500',
                                                    lineHeight: 21,
                                                    color: 'white',
                                                }}>
                                                {data.dial_code}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        )}
                    </View>
                    {errors.phoneNumber ? (
                        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                    ) : null}
                </View>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                        styles.btn,
                        isDisabled && {backgroundColor: isDisabled ? '#8F8F8F' : '#0063FF'},
                    ]}
                    disabled={isDisabled}>
                    {reqLoading ? (
                        <Progress.Circle size={20} indeterminate={true} color="#fff"/>
                    ) : (
                        <Text style={styles.btnText}>Далее</Text>
                    )}
                </TouchableOpacity>
                <View style={styles.policyWrapper}>
                    <TouchableWithoutFeedback
                        onPress={() => setChecked(checked => !checked)}>
                        <View style={styles.checkBox}>{checked ? <TickIcon/> : null}</View>
                    </TouchableWithoutFeedback>
                    <View style={{flex: 1, marginLeft: 15}}>
                        <Text style={styles.policyText}>
                            Регистрируясь, вы соглашаетесь с нашими{' '}
                            <Text style={{textDecorationLine: 'underline'}}>
                                Условиями использования
                            </Text>{' '}
                            и{' '}
                            <Text style={{textDecorationLine: 'underline'}}>
                                Политикой конфиденциальности
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp;
