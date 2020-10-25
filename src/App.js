import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import { auth } from './Firebase';
import { login, logout } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //console.log(user);

  useEffect(() => {

    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          userId: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email
        }));
      } else {
        dispatch(logout());
      }
    });

  }, [dispatch]);


  return (
    <div className="app">
      {/* lets sketch out the whole app components */}
      {/* we need a sidebar and a chat panel */}
      {
        user ?
          <>
            <Sidebar />
            <Chat />
          </>
          : <Login />

      }


    </div>
  );
}

export default App;
