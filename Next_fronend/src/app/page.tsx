import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FaqSection from '@/components/faq/FaqSection';
import { getFaqs } from '@/services/main.api';

export default async function Home() {
  const faqs = await getFaqs();
console.log(faqs)

  return (
    <main className="min-h-screen bg-[#f8fcfb] selection:bg-gray-900 selection:text-white">
      <Header />
      <div className="pt-8">
        <FaqSection faqs={faqs} />
      </div>
      <Footer />
    </main>
  );
}
