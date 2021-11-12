import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import { SignIn, SignOut, useAuthentication } from "./services/authService";
import {
  fetchArticles,
  createArticle,
  deleteArticle,
} from "./services/articleService";
import "./App.css";
import Footer from "./footer";
//serparation on concern, (dont add the concept of firebase into app code so that one can switch out databases)
//if you get an error, show the error
//hide the api key

export default function App() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [writing, setWriting] = useState(false);
  const user = useAuthentication();

  // This is a trivial app, so just fetch all the articles only when
  // a user logs in. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    if (user) {
      fetchArticles().then(setArticles);
    }
  }, [user]);

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body }) {
    createArticle({ title, body }).then((article) => {
      setArticle(article);
      setArticles([article, ...articles]);
      setWriting(false);
    });
  }

  function removeArticle(id) {
    deleteArticle(id).then(() => {
      setArticle(null);
      setArticles(articles.filter((a) => a.id !== id));
      setWriting(false);
    });
  }
  // function nextArticles() {
  //   fetchArticles().then(setArticles);
  // }

  return (
    <div className="App">
      <header>
        Ryan's and Charles's Blog
        {user ? (
          user.uid === "3vS0KMyiEvN3QLlzjSzqJZbAKbG2" ||
          user.uid === "msgWiQEBg8NKnjczMzfzhdHOvuu1" ? (
            <button onClick={() => setWriting(true)}>New Article</button>
          ) : (
            <p className="error">
              "Only verified authors can write blogs, try logging into a valid
              account or requesting verification."
            </p>
          )
        ) : (
          ""
        )}
        {!user ? <SignIn /> : <SignOut />}
      </header>

      {!user ? (
        <p className="prompt">
          Welcome to the blog! Currently, only Ryan and Charles are allowed to
          write articles; however, everyone can view the articles! :)
        </p>
      ) : (
        <Nav articles={articles} setArticle={setArticle} />
      )}

      {!user ? (
        <div></div>
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article article={article} remover={removeArticle} />
      )}
      <Footer
        authors="Ryan Nguyen and Charles Kawata"
        repolink="https://blog-a0b1b.wep.app/"
      />
    </div>
  );
}
