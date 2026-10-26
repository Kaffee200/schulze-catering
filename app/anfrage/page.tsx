import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";
import { getAnlass } from "@/data/anlaesse";

export const metadata: Metadata = {
  title: "Catering Anfrage",
  description: "Catering anfragen: Speisen aus dem Katalog von Schulze Catering auswählen und unverbindlich ein Angebot erhalten.",
};

export default async function AnfragePage({
  searchParams,
}: {
  searchParams: Promise<{ kategorie?: string; anlass?: string }>;
}) {
  const { kategorie, anlass } = await searchParams;
  const occasion = anlass ? getAnlass(anlass)?.formValue : undefined;

  return (
    <div className="container page">
      <header className="page-head">
        <h1>Catering Anfrage</h1>
        <p className="lead">
          Wählen Sie Speisen aus unserem Katalog, nennen Sie Termin und Personenzahl – wir erstellen Ihnen ein Angebot.
        </p>
      </header>
      <InquiryForm initialCategory={kategorie} initialOccasion={occasion} />
    </div>
  );
}
