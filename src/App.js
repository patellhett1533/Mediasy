import './App.css';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Feed from './components/feed/Feed';
import UserChat from './components/chat/UserChat';
import Chat from './components/chat/Chat';
import Profile from './components/profile/Profile';
import Post from './components/post/Post';
import Not from './components/notfound/Not';
import ViewPost from './components/feed/ViewPost';
import UserProfile from './components/profile/UserProfile';
import Notify from './components/notification/Notify';
import { useContext, useState } from 'react';
import { DarkModeContext } from './context/theme/themeContext';
import Follower from './components/user-list/Follower';
import Following from './components/user-list/Following';
import Forgot from './Account/Forgot';
import Save from './components/save/Save';

function App() {
  const {darkMode} = useContext(DarkModeContext);
  return (
      <div className='App' dark-theme={darkMode ? "dark" : "light"}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />}>
              <Route index element={<Feed />} />
              <Route path='/user-chat' element={<UserChat />} />
              {/* <Route path='/chat/:id' element={<Chat />} /> */}
              <Route path='/profile' element={<Profile />} />
              <Route path='/saved' element={<Save />} />
              <Route path='/profile/:id' element={<UserProfile />} />
              <Route path='/post' element={<Post />} />
              <Route path='/feed/:id' element={<ViewPost />} />
              <Route path='/notification' element={<Notify />} />
              <Route path='/follower/:id' element={<Follower />} />
              <Route path='/following/:id' element={<Following />} />
            </Route>
            <Route exact path='signup' element={<Signup />} />
            <Route exact path='login' element={<Login />} />
            <Route exact path='forgot-password' element={<Forgot />} />
            <Route path='*' element={<Not />} />
          </Routes>
        </BrowserRouter>
      </div>
    
  );
}

export default App;
