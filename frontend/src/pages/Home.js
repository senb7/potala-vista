// src/pages/Home.js
import { HeroCarousel } from '../components/HeroCarousel';
import { PackageCard } from '../components/PackageCard';

export const Home = () => (
  <div>
    <HeroCarousel />
    <div className="container mt-5">
      <h2 className="text-center mb-4">Featured Packages</h2>
      <div className="row">
        {[1, 2, 3].map((item) => (
          <PackageCard 
            key={item}
            id={item}
            title={`Package ${item}`}
            description="Experience the adventure of a lifetime with our carefully curated travel package."
          />
        ))}
      </div>
    </div>
  </div>
);