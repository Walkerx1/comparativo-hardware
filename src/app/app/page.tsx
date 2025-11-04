'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Cpu, Smartphone, Search, Filter, Star, TrendingUp, DollarSign, Zap, Shield, Package, X, Lock } from 'lucide-react';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import Link from 'next/link';

// Simulação de dados de produtos
const hardwareData = [
  {
    id: 1,
    name: 'MacBook Pro M3 14"',
    category: 'laptop',
    price: 12999,
    originalPrice: 14999,
    rating: 4.8,
    reviews: 2847,
    specs: {
      processor: 'Apple M3 Pro',
      ram: '16GB',
      storage: '512GB SSD',
      display: '14" Liquid Retina XDR'
    },
    stores: [
      { name: 'Apple Store', price: 12999, link: '#' },
      { name: 'Amazon', price: 13299, link: '#' },
      { name: 'Kabum', price: 13599, link: '#' }
    ],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Dell XPS 13',
    category: 'laptop',
    price: 8999,
    originalPrice: 10499,
    rating: 4.6,
    reviews: 1923,
    specs: {
      processor: 'Intel Core i7-13700H',
      ram: '16GB',
      storage: '512GB SSD',
      display: '13.4" InfinityEdge'
    },
    stores: [
      { name: 'Dell', price: 8999, link: '#' },
      { name: 'Mercado Livre', price: 9299, link: '#' },
      { name: 'Magazine Luiza', price: 9599, link: '#' }
    ],
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'iPhone 15 Pro Max',
    category: 'smartphone',
    price: 9999,
    originalPrice: 11499,
    rating: 4.9,
    reviews: 5672,
    specs: {
      processor: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      display: '6.7" Super Retina XDR'
    },
    stores: [
      { name: 'Apple Store', price: 9999, link: '#' },
      { name: 'iPlace', price: 10299, link: '#' },
      { name: 'Fast Shop', price: 10599, link: '#' }
    ],
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'smartphone',
    price: 7999,
    originalPrice: 9299,
    rating: 4.7,
    reviews: 3421,
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      display: '6.8" Dynamic AMOLED 2X'
    },
    stores: [
      { name: 'Samsung', price: 7999, link: '#' },
      { name: 'Amazon', price: 8199, link: '#' },
      { name: 'Casas Bahia', price: 8399, link: '#' }
    ],
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'ASUS ROG Strix G15',
    category: 'laptop',
    price: 6999,
    originalPrice: 8499,
    rating: 4.5,
    reviews: 1567,
    specs: {
      processor: 'AMD Ryzen 7 6800H',
      ram: '16GB',
      storage: '512GB SSD',
      display: '15.6" FHD 144Hz'
    },
    stores: [
      { name: 'ASUS Store', price: 6999, link: '#' },
      { name: 'Pichau', price: 7199, link: '#' },
      { name: 'Terabyte', price: 7399, link: '#' }
    ],
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Google Pixel 8 Pro',
    category: 'smartphone',
    price: 5999,
    originalPrice: 7299,
    rating: 4.6,
    reviews: 2134,
    specs: {
      processor: 'Google Tensor G3',
      ram: '12GB',
      storage: '128GB',
      display: '6.7" LTPO OLED'
    },
    stores: [
      { name: 'Google Store', price: 5999, link: '#' },
      { name: 'Amazon', price: 6199, link: '#' },
      { name: 'Submarino', price: 6399, link: '#' }
    ],
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop'
  }
];

export default function ComparisonApp() {
  const { currentLang } = useLanguage();
  const [hasAccess, setHasAccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price');
  const [compareList, setCompareList] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const t = translations[currentLang];

  // Verificar se usuário tem acesso (simulação)
  useEffect(() => {
    const checkAccess = () => {
      // Simular verificação de pagamento
      const hasSubscription = localStorage.getItem('techcompare_subscription');
      setHasAccess(!!hasSubscription);
    };
    checkAccess();
  }, []);

  // Simular compra
  const handlePurchase = () => {
    localStorage.setItem('techcompare_subscription', 'active');
    setHasAccess(true);
    alert('Pagamento processado com sucesso! Bem-vindo ao TechCompare Pro!');
  };

  // Filtrar produtos
  const filteredProducts = hardwareData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Adicionar/remover da comparação
  const toggleCompare = (productId: number) => {
    if (compareList.includes(productId)) {
      setCompareList(compareList.filter(id => id !== productId));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, productId]);
    }
  };

  // Produtos para comparação
  const compareProducts = hardwareData.filter(product => compareList.includes(product.id));

  // Tela de bloqueio para usuários sem acesso
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Acesso Restrito
          </h2>
          
          <p className="text-gray-600 mb-6">
            Este aplicativo está disponível apenas para assinantes premium. 
            Assine agora por R$ 50/mês e tenha acesso completo a todas as comparações!
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handlePurchase}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <DollarSign className="w-5 h-5" />
              <span>Assinar por R$ 50/mês</span>
            </button>
            
            <Link 
              href="/"
              className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar ao Site</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                <span className="text-sm text-gray-600 hover:text-gray-900">Voltar</span>
              </Link>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TechCompare Pro
                </span>
              </div>
            </div>
            
            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🎉 Bem-vindo ao TechCompare Pro!
          </h1>
          <p className="text-xl text-gray-600">
            Compare hardware e celulares com IA avançada e economize milhares de reais
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas as Categorias</option>
              <option value="laptop">Notebooks</option>
              <option value="smartphone">Smartphones</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="price">Menor Preço</option>
              <option value="rating">Melhor Avaliação</option>
              <option value="name">Nome A-Z</option>
            </select>

            {/* Compare Button */}
            <button
              onClick={() => setShowComparison(!showComparison)}
              disabled={compareList.length === 0}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Comparar ({compareList.length})</span>
            </button>
          </div>
        </div>

        {/* Comparison Panel */}
        {showComparison && compareProducts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Comparação de Produtos</h3>
              <button
                onClick={() => setShowComparison(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {compareProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-xl p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Preço:</span>
                      <span className="font-bold text-green-600">R$ {product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avaliação:</span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {product.rating}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processador:</span>
                      <span>{product.specs.processor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RAM:</span>
                      <span>{product.specs.ram}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Armazenamento:</span>
                      <span>{product.specs.storage}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleCompare(product.id)}
                    className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remover da Comparação
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.originalPrice > product.price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    compareList.includes(product.id)
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    {product.category === 'laptop' ? (
                      <Cpu className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Smartphone className="w-5 h-5 text-green-500" />
                    )}
                    <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processador:</span>
                    <span className="font-medium">{product.specs.processor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">RAM:</span>
                    <span className="font-medium">{product.specs.ram}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Armazenamento:</span>
                    <span className="font-medium">{product.specs.storage}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      R$ {product.price.toLocaleString()}
                    </div>
                    {product.originalPrice > product.price && (
                      <div className="text-sm text-gray-500 line-through">
                        R$ {product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Economia:</div>
                    <div className="text-lg font-bold text-red-500">
                      R$ {(product.originalPrice - product.price).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">Melhores Preços:</div>
                  {product.stores.slice(0, 2).map((store, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{store.name}</span>
                      <span className="font-medium">R$ {store.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-sm font-semibold">
                    Ver Todas as Lojas
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600">Tente ajustar seus filtros de busca</p>
          </div>
        )}
      </div>
    </div>
  );
}