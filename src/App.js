import React,{useState,useEffect} from 'react';
import { Route,Routes,useNavigate } from 'react-router-dom';

// components
import Header from './component/Header';
import Nav from './component/Nav';
import Footer from './component/Footer';
import Home from './component/Home';
import NewPost from './component/NewPost';
import PostPage from './component/PostPage';
import About from './component/About';
import Missing from './component/Missing';
import {blogData} from './data';
import { format } from 'date-fns';

function App() {
  const [search,setSearch] = useState("");
  const [blogpost,setBlogPosts] = useState(blogData);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [searhresults,setSearchResults]= useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const filterResults = blogpost.filter(post => 
      (post.body).toLowerCase().includes(search.toLowerCase()) || 
      (post.title).toLowerCase().includes(search.toLowerCase()))

      setSearchResults(filterResults.reverse())
  },[blogpost,search])

  const handleDelete = (id) => {
    const filterPosts = blogpost.filter((post) => post.id !== id);
    setBlogPosts(filterPosts);
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = blogpost.length ? blogpost[blogpost.length -1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {id, title:postTitle, datetime, body:postBody};
    const newAddedPost = [...blogpost, newPost];
    setBlogPosts(newAddedPost);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  }

  return (
    <div className='app'>
      <Header title="Our Blog"/>
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<Home posts={searhresults}/>} />
        <Route path='/post' element={<NewPost 
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          handleSubmit={handleSubmit}
        />} />
        <Route path='/post/:id' element={<PostPage posts={blogpost}handleDelete={handleDelete}/>} />
        <Route path='/about' element={<About /> } />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
