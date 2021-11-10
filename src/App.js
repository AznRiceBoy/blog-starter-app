import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import { SignIn, SignOut, useAuthentication } from "./services/authService";
import { fetchArticles, createArticle } from "./services/articleService";
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
  // {user &&
  //   (user.id !== "3vS0KMyiEvN3QLlzjSzqJZbAKbG2" ||
  //     "msgWiQEBg8NKnjczMzfzhdHOvuu1") ? (
  //     <p className="error">"Only verified authors can write blogs :)"</p>
  //   ) : (
  //     user &&
  //     (user.id === "3vS0KMyiEvN3QLlzjSzqJZbAKbG2" ||
  //       "msgWiQEBg8NKnjczMzfzhdHOvuu1") && (
  //       <button onClick={() => setWriting(true)}>New Article</button>
  //     )
  //   )}
  //(user.id === "3vS0KMyiEvN3QLlzjSzqJZbAKbG2" || "msgWiQEBg8NKnjczMzfzhdHOvuu1") ? ( <button onClick={() => setWriting(true)}>New Article</button>) : ( <p className="error">  "Only verified authors can write blogs, try logging into a valid account." </p> )
  return (
    <div className="App">
      <header>
        Blog
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

      {!user ? "" : <Nav articles={articles} setArticle={setArticle} />}

      {!user ? (
        <div></div>
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article article={article} />
      )}
      <Footer
        authors="Ryan Nguyen and Charles Kawata"
        repolink="https://blog-a0b1b.wep.app/"
      />
    </div>
  );
}
