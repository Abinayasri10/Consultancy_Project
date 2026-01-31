'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';

const categoryIcons = {
  herbicide: '🌿',
  fungicide: '🍄',
  insecticide: '🐛',
  fertilizer: '🌱',
  'growth-promoter': '📈',
  micronutrient: '⚗️'
};

const categoryColors = {
  herbicide: 'bg-green-100 text-green-800',
  fungicide: 'bg-yellow-100 text-yellow-800',
  insecticide: 'bg-red-100 text-red-800',
  fertilizer: 'bg-blue-100 text-blue-800',
  'growth-promoter': 'bg-purple-100 text-purple-800',
  micronutrient: 'bg-orange-100 text-orange-800'
};

export default function PesticideGrid({ pesticides, onAddToCart, language }) {
  const [favorites, setFavorites] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const getCategoryLabel = (category) => {
    const labels = {
      en: {
        herbicide: 'Herbicide',
        fungicide: 'Fungicide',
        insecticide: 'Insecticide',
        fertilizer: 'Fertilizer',
        'growth-promoter': 'Growth Promoter',
        micronutrient: 'Micronutrient'
      },
      hi: {
        herbicide: 'शाकनाशी',
        fungicide: 'कवकनाशी',
        insecticide: 'कीटनाशक',
        fertilizer: 'खाद',
        'growth-promoter': 'विकास प्रवर्तक',
        micronutrient: 'सूक्ष्म पोषक'
      },
      ta: {
        herbicide: 'களைக்கொல்லி',
        fungicide: 'பூஞ்சைக்கொல்லி',
        insecticide: 'பூச்சிக்கொல்லி',
        fertilizer: 'உரம்',
        'growth-promoter': 'வளர்ச்சி ப்ரமோட்டர்',
        micronutrient: 'நுண்ணூட்டச்சத்து'
      }
    };
    return labels[language]?.[category] || category;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {pesticides.map(pesticide => (
        <Card
          key={pesticide.id}
          className="hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
          onMouseEnter={() => setHoveredId(pesticide.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Image Container */}
          <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              {categoryIcons[pesticide.category] || '🌾'}
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
              <Badge className={categoryColors[pesticide.category]}>
                {categoryIcons[pesticide.category]}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                className="bg-white hover:bg-red-50 rounded-full w-8 h-8 p-0"
                onClick={() => toggleFavorite(pesticide.id)}
              >
                <Heart
                  size={16}
                  className={favorites.includes(pesticide.id) ? 'fill-red-500 text-red-500' : ''}
                />
              </Button>
            </div>
            {hoveredId === pesticide.id && (
              <div className="absolute inset-0 bg-black bg-opacity-10 transition-all duration-300" />
            )}
          </div>

          {/* Content */}
          <CardHeader className="pb-3">
            <CardTitle className="text-lg line-clamp-2">{pesticide.name}</CardTitle>
            <CardDescription className="text-sm">
              {getCategoryLabel(pesticide.category)}
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">₹{pesticide.price}</span>
              <Badge variant="outline">{pesticide.unit}</Badge>
            </div>
            <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
              <p>✓ High Quality Certified</p>
              <p>✓ Fast Delivery Available</p>
            </div>
          </CardContent>

          <CardFooter className="gap-2">
            <Button
              onClick={() => onAddToCart(pesticide)}
              className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
              size="sm"
            >
              <ShoppingCart size={16} />
              Add
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
