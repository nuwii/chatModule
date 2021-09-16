import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from "react-redux-firebase";
import './index.css';
import App from "./App";
import firebase from "./firebase";
import store from "./store/store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {useHistory} from "react-router-dom";
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import 'semantic-ui-css/semantic.min.css';
import PrivateRoute from "./components/auth/PrivateRoute.jsx";


// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}



const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}


const Root = () => {

  const history = useHistory();
  //sadece ilk girişde çaışıyor firebase auth kontrol yapılıp login veya home
  useEffect(() => {
    //çıkış yap butonu
    firebase.auth().onAuthStateChanged((user) =>{
  
      if(user){
        //login olmuş
        history.push ('/')
      }else {
        //login olmamış
        history.push('/login')
      }
    })
  }, [])


  return(
    <Switch>
      <PrivateRoute exact path="/">
        <App/>    
      </PrivateRoute>

      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
    </Switch>

  );
};


  

ReactDOM.render(
    
  <Provider store={store}>
  <ReactReduxFirebaseProvider {...rrfProps}>
  <Router>
    <Root/>
   </Router>
  </ReactReduxFirebaseProvider>
</Provider>
 ,
  document.getElementById('root')
);