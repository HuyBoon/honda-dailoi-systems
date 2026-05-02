import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle: string;
  breadcrumbs?: Breadcrumb[];
  image?: string;
  className?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  image,
  className = "" 
}: PageHeaderProps) {
  return (
    <div className={`bg-black pt-20 pb-20 px-4 lg:px-8 relative overflow-hidden ${className}`}>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#CC0000]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      {image && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={image} alt="" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        </div>
      )}

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl space-y-8">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Link href="/" className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-600">
                  <ChevronRight size={12} />
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">
                      {crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#CC0000] text-[10px] font-black uppercase tracking-[0.3em] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-8 h-[2px] bg-[#CC0000]" />
              {subtitle}
            </div>
            <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
