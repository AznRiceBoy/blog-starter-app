export default function Article({ article, remover }) {
  return (
    <article>
      {!article ? (
        <p>No article selected</p>
      ) : (
        <section>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${article.date}`}</p>
          <p className="body">{article.body}</p>
          <button onClick={() => remover(article.id)}>Delete</button>
        </section>
      )}
    </article>
  );
}
