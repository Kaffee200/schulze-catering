import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container page">
      <h1>Seite nicht gefunden</h1>
      <p className="lead">Diese Adresse gibt es bei uns nicht. Probieren Sie die Startseite oder die Catering Anfrage.</p>
      <p>
        <Link className="btn" href="/">
          Zur Startseite
        </Link>
      </p>
    </div>
  );
}
