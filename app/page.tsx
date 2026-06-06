import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";
import { getStores } from "@/lib/actions/stores";
import type { Store } from "@/types/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let stores: Store[] = [];

  try {
    stores = await getStores();
  } catch {
    stores = [];
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f8f9fb]">
        <div className="mx-auto max-w-7xl px-3 py-6 min-[375px]:px-4 min-[375px]:py-8 sm:px-6 lg:px-8">
          <HomeContent stores={stores} />
        </div>
      </main>
      <Footer />
    </>
  );
}
