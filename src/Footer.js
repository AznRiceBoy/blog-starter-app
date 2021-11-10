export default function Footer({ authors, repolink }) {
  return (
    <footer>
      <author>Authors : {authors} &nbsp; &nbsp;</author>
      <a href={repolink}>Link : {repolink}</a>
    </footer>
  );
}
