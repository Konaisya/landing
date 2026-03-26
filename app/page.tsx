import Contacts from "@/components/ui/contacts/contacts";
import Main from "@/components/ui/main/main";
import Portfolio from "@/components/ui/portfolio/portfolio";
import Stack from "@/components/ui/stack/stack";



export default function Home() {
  return (
    <main>
      <Main />
      <section id="stack" className="min-h-screen flex items-center justify-center">
        <Stack />
      </section>
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <Portfolio />
      </section>
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <Contacts />
      </section>
    </main>
  );
}
