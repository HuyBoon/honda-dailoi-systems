import Hero from '@/components/Home/Hero';
import TrustBar from '@/components/Home/TrustBar';
import CategoryGrid from '@/components/Home/CategoryGrid';
import FeaturedProduct from '@/components/Home/FeaturedProduct';
import Newsletter from '@/components/Home/Newsletter';

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      <Hero />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProduct />
      <Newsletter />
    </div>
  );
}
