import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const Gallery = () => {
  type GalleryImage = {
    url: string;
    title: string;
    category: string;
    description: string;
    nestedImages: {
      url: string;
      title: string;
      description: string;
    }[];
  };

  const galleryImages: GalleryImage[] = [
    {
      url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
      title: "Luxury Theater Interior",
      category: "Interior",
      description: "Experience premium comfort in our state-of-the-art theater",
      nestedImages: [
        {
          url: "https://images.unsplash.com/photo-1504123010103-b1f3fe484a32",
          title: "Premium Seating Area",
          description: "Luxurious reclining seats for ultimate comfort"
        },
        {
          url: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
          title: "Theater Lighting",
          description: "Ambient lighting for the perfect atmosphere"
        },
        {
          url: "https://images.unsplash.com/photo-1510511233900-1982d92bd835",
          title: "Sound System",
          description: "State-of-the-art surround sound experience"
        },
        {
          url: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6",
          title: "Ambiance Details",
          description: "Carefully curated interior elements"
        }
      ]
    },
    {
      url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
      title: "Premium Screening Room",
      category: "Screening",
      description: "State-of-the-art projection and sound system",
      nestedImages: [
        {
          url: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f",
          title: "4K Projection",
          description: "Crystal clear picture quality"
        },
        {
          url: "https://images.unsplash.com/photo-1585647347384-2593bc35786b",
          title: "Surround Sound",
          description: "Immersive audio experience"
        },
        {
          url: "https://images.unsplash.com/photo-1586899028174-e7098604235b",
          title: "Screen Setup",
          description: "Professional cinema screen"
        },
        {
          url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
          title: "Lighting System",
          description: "Perfect ambiance control"
        }
      ]
    },
    {
      url: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f",
      title: "Couple's Theater",
      category: "Romance",
      description: "Perfect setting for romantic dates",
      nestedImages: [
        {
          url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
          title: "Intimate Setting",
          description: "Cozy and private atmosphere"
        },
        {
          url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
          title: "Luxury Seating",
          description: "Comfortable couple seating"
        },
        {
          url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
          title: "Mood Lighting",
          description: "Romantic ambiance"
        },
        {
          url: "https://images.unsplash.com/photo-1585647347384-2593bc35786b",
          title: "Service Area",
          description: "Premium refreshments service"
        }
      ]
    },
    {
      url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
      title: "Birthday Celebrations",
      category: "Events",
      description: "Make your birthday extra special",
      nestedImages: [
        {
          url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
          title: "Party Setup",
          description: "Festive decorations and arrangements"
        },
        {
          url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
          title: "Group Seating",
          description: "Comfortable space for friends and family"
        },
        {
          url: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f",
          title: "Celebration Area",
          description: "Perfect for cake cutting and photos"
        },
        {
          url: "https://images.unsplash.com/photo-1585647347384-2593bc35786b",
          title: "Entertainment Setup",
          description: "Music and lighting arrangements"
        }
      ]
    },
    {
      url: "https://images.unsplash.com/photo-1585647347384-2593bc35786b",
      title: "Refreshment Service",
      category: "Service",
      description: "Premium food and beverage options",
      nestedImages: [
        {
          url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
          title: "Snack Counter",
          description: "Wide variety of premium snacks"
        },
        {
          url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
          title: "Beverage Station",
          description: "Refreshing drink selections"
        },
        {
          url: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f",
          title: "Service Area",
          description: "Professional service setup"
        },
        {
          url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
          title: "Premium Options",
          description: "Gourmet food selections"
        }
      ]
    },
    {
      url: "https://images.unsplash.com/photo-1586899028174-e7098604235b",
      title: "Special Occasions",
      category: "Events",
      description: "Perfect for any celebration",
      nestedImages: [
        {
          url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
          title: "Event Setup",
          description: "Customizable arrangements"
        },
        {
          url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
          title: "Decoration Options",
          description: "Themed decoration services"
        },
        {
          url: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f",
          title: "Celebration Space",
          description: "Versatile event area"
        },
        {
          url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
          title: "Group Activities",
          description: "Entertainment options"
        }
      ]
    }
  ];

  const categories = ["All", ...new Set(galleryImages.map(img => img.category))];
  
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('gallery');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isVisible) {
          element.classList.add('animate-fade-in');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
    setCurrentImageIndex(0);
  };

  const handlePrevious = () => {
    if (selectedImage) {
      setCurrentImageIndex((prev) => 
        (prev - 1 + selectedImage.nestedImages.length) % selectedImage.nestedImages.length
      );
    }
  };

  const handleNext = () => {
    if (selectedImage) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedImage.nestedImages.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-gray-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Gallery</h2>
          <p className="text-gray-600 text-lg mb-8">Take a visual tour of our premium theater experiences</p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {selectedCategory === category && <Filter className="w-4 h-4" />}
                  <span>{category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => handleImageClick(image)}
            >
              <img
                src={`${image.url}?auto=format&fit=crop&w=800&q=80`}
                alt={image.title}
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            flex flex-col justify-end p-6">
                <span className="inline-block px-3 py-1 bg-indigo-600/90 text-white text-xs rounded-full mb-2 w-fit">
                  {image.category}
                </span>
                <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                <p className="text-white/90 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handlePrevious}
              className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="w-full max-w-4xl">
              <img
                src={selectedImage.nestedImages[currentImageIndex].url}
                alt={selectedImage.nestedImages[currentImageIndex].title}
                className="w-full h-[70vh] object-contain rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedImage.nestedImages[currentImageIndex].title}
                </h3>
                <p className="text-white/80">
                  {selectedImage.nestedImages[currentImageIndex].description}
                </p>
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2 mt-4">
                {selectedImage.nestedImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                      currentImageIndex === idx ? 'ring-2 ring-indigo-500 scale-110' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;