import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import NewBlog from './pages/NewBlog';
import Register from './pages/Register';
import UserInterest from './pages/UserInterest';
import Feed from './pages/Feed';
import { Toaster } from 'sonner';
import Blog from './pages/Blog';
import PrivateRoute from './routes/PrivateRoute';

export default function App() {
  return (
    <>
      <Header />
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/blog/add-blog" element={<PrivateRoute />}>
          <Route index element={<NewBlog />} />
        </Route>
        <Route path="/welcome" element={<PrivateRoute />}>
          <Route index element={<UserInterest />} />
        </Route>
        <Route path="/feed" element={<PrivateRoute />}>
          <Route index element={<Feed />} />
        </Route>
        <Route path="/feed/:id" element={<PrivateRoute />}>
          <Route index element={<Blog />} />
        </Route>
      </Routes>
    </>
  );
}
