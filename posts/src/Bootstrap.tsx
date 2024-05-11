import { Route, Routes } from "react-router-dom";
import CreatePost from "@/pages/Post/CreatePost";
import PostDetails from "@/pages/Post/PostDetails";
import PostResultList from "@/pages/Post/PostResultList";
import NewsPage from "@/pages/News/NewsPage";

const Bootstrap = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="create-post" element={<CreatePost />} />
        <Route path="post-details" element={<PostDetails />} />
        <Route path="result-list" element={<PostResultList />} />
        <Route path="news" element={<NewsPage />} />
      </Route>
    </Routes>
  );
};

export default Bootstrap;
