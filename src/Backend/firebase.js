import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';
//Get Expenses
export const FetchExpenses = async id => {
  try {
    //  setLoading(true);
    const posts = new Array();

    let querySnapshot = await firestore()
      .collection('Expenses')
      .where('tripsId', '==', id)
      //.limit(6)
      .get();
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    querySnapshot.forEach(doc => {
      posts.push({...doc.data(), id: doc.id});
    });
    //  console.log(lastVisible);
    // setExpenses(dataArray);
    // setstartAfter(lastVisible);
    // setLoading(false);
    return {posts, lastVisible};
  } catch (error) {
    console.error('Rana Sheraz Ali', error);
  }
};

//Get More Expenses
export const FetchMoreExpenses = async (id, startAfter) => {
  try {
    //  setLoading(true);
    const posts = new Array();

    let querySnapshot = await firestore()
      .collection('Expenses')
      .where('tripsId', '==', id)
      .startAfter(startAfter)
      .limit(2)
      .get();
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    querySnapshot.forEach(doc => {
      posts.push({...doc.data(), id: doc.id});
    });
    //  console.log(lastVisible);
    // setExpenses(dataArray);
    // setstartAfter(lastVisible);
    // setLoading(false);
    return {posts, lastVisible};
  } catch (error) {
    console.error('Muhammad Abubakar', error);
  }
};

//get and put profile image
export const UploadPicuture = async (uri, setImageUrl) => {
  try {
    console.log('files111');
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    console.log('files', filename, uploadUri);
    storage()
      .ref(filename)
      .putFile(uploadUri)
      .then(async res => {
        console.log('res', res);
        if (res.state) {
          const url = await storage().ref(filename).getDownloadURL();
          console.log('get image', url);
          setImageUrl(url);
        }
      });
  } catch (e) {
    console.log('image putting error', e);
  }
};

// update any field
export async function updateField(collection, doc, field, fieldValue) {
  // console.log('field',[field])
  let db = firestore();
  db.collection(collection)
    .doc(doc)
    .update({
      [field]: fieldValue,
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
    });
}

//get doc by key value
export async function getDocByKeyValue(collection, value) {
  try {
    const docRef = firestore().collection(collection).doc(value);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      return docSnap.data();
    } else {
      console.log('No such document!');
    }
    //let data = [];
    // let querySnapshot = await firestore()
    //   .collection(collection)
    //   //.where('id', '==', value)
    //   .doc(value) //key, '==',
    //   .get();
    // querySnapshot.forEach(function (doc) {
    //   // console.log('doc id=>',doc.id)
    //   data.push(doc.data());
    //   console.log('a', data);
    // });
    // if (querySnapshot.exists) {
    //   return querySnapshot.data();
    // } else {
    //   console.log('No such document!');
    // }
  } catch (e) {
    console.log('no data found', e);
  }
}

//update password
export async function Passwordupdate(currentPassword, newPassword) {
  let success = 0;
  var user = auth().currentUser();
  var cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword,
  );
  await user
    .reauthenticateWithCredential(cred)
    .then(() => {
      success = 1;
      auth()
        .currentUser.updatePassword(newPassword)
        .then(() => {
          Toast.show('Password Changed Successfully');
        });
    })
    .catch(error => {
      if (error.code === 'auth/wrong-password') {
        Toast.show(
          "The password is invalid and does not match this user's password",
        );
      } else if (error.code === 'auth/unknown') {
        Toast.show(
          'A network error (such as timeout, interrupted connection or unreachable host) has occurred',
        );
      } else {
        Toast.show(error.message);
      }
    });
  return success;
}

//signInWithPhone
export async function signInWithPhone(number) {
  try {
    const token = await auth().signInWithPhoneNumber(number);
    return {token};
  } catch (e) {
    console.log('phone not work', e);
  }
  // let success;
  // let error = '';
  // let token;
  // await auth()
  //   .signInWithPhoneNumber(number)
  //   .then(async user => {
  //     token = user;
  //     success = true;
  //     // await AsyncStorage.setItem('userToken', user.user.uid);
  //   })
  //   .catch(function (err) {
  //     success = false;
  //     error = err.code;
  //   });
  // return {error, success, token};
}
