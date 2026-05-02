import Hero from '@/components/Home/Hero';
import ProductShowcase from '@/components/Home/ProductShowcase';
import Features from '@/components/Home/Features';
import CategoryGrid from '@/components/Home/CategoryGrid';
import FeaturedProduct from '@/components/Home/FeaturedProduct';
import Newsletter from '@/components/Home/Newsletter';

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      <Hero />
      <ProductShowcase />
      <Features />
      <CategoryGrid />
      <FeaturedProduct />
      <Newsletter />
    </div>
  );
}
