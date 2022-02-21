# react_native-test
Запустить сначала бэк: express-email-app: npm start. 
Перед этим поменять внутри в файле .env "URL mongoDB" и данные email на необходимые Вам, куда будет отправляться данные о пользователе.

После в react-native-email-app в src/screens/SignUp/index.js на 83 строке http://192.168.0.159 поменять на Ваш локальный IP.
Запустить приложение: react-native-email-app:  
- в первом терминале: react-native start --reset-cache
- во втором терминале: react-native run-android
