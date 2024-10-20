import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, X, ChevronDown, Star, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartAndCheckout from './CartAndCheckout'; // Import component mới
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Drawer } from './ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';


const ProductPage = () => {
  // States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // State mới cho việc kiểm tra đăng nhập (giả định)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Derived values
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Initial products data
  useEffect(() => {
    setProducts([
      { id: 1, name: 'iPhone 16 Pro Max 256GB', price: 999, image: '/api/placeholder/400/300', stock: 10, category: 'phones' },
      { id: 2, name: 'Ultra-thin Tablet Y', price: 599, image: '/api/placeholder/400/300', stock: 5, category: 'tablets' },
      { id: 3, name: 'Professional Laptop Z', price: 1499, image: '/api/placeholder/400/300', stock: 8, category: 'laptops' },
      { id: 4, name: 'Tủ lạnh Hitachi Inverter 406 lít', price: 1250, image: '/api/placeholder/400/300', stock: 10, category: 'Tủ lạnh' },
      { id: 5, name: 'Máy giặt Samsung 13 kg Inverter', price: 2400, image: '/api/placeholder/400/300', stock: 5, category: 'Máy giặt' },
      { id: 6, name: 'Smart Tivi LED LG 4K 43 inch', price: 3700, image: '/api/placeholder/400/300', stock: 8, category: 'Tivi' },
      { id: 7, name: 'Máy lạnh Samsung Inverter 1.5 HP', price: 1200, image: '/api/placeholder/400/300', stock: 10, category: 'Máy lạnh' },
      { id: 8, name: 'Loa xách tay Marshall Stanmore 3', price: 1700, image: '/api/placeholder/400/300', stock: 5, category: 'Loa' },
      { id: 9, name: 'Nồi cơm điện tử Sunhouse 1 lít', price: 500, image: '/api/placeholder/400/300', stock: 8, category: 'Gia dụng' },
    ]);
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        (selectedCategory === 'all' || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products, selectedCategory]);

  // Cart functions
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          setAlertMessage('Maximum stock limit reached!');
          setShowAlert(true);
          return prevCart;
        }
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      setAlertMessage('Product added to cart!');
      setShowAlert(true);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  

  // Header Component
  const Header = () => (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg p-4 sticky top-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-between">
        <motion.div 
          className="text-2xl font-bold text-purple-800"
          whileHover={{ scale: 1.1 }}
        >
          MyStore
        </motion.div>
        <div className="hidden md:flex flex-grow mx-8">
          <Input
            type="text"
            placeholder="Search for premium products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-purple-50 border-purple-200 focus:border-purple-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          {/* Thay thế nút giỏ hàng cũ bằng CartAndCheckout component */}
          <CartAndCheckout 
            cart={cart}
            setCart={setCart}
            cartTotal={cartTotal}
            isAuthenticated={isAuthenticated}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-purple-100 text-purple-600"
          >
            <Bell className="h-6 w-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-purple-100 text-purple-600 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );

  // Sidebar Component
  const Sidebar = () => (
    <Drawer open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
      <div className="p-4 bg-white h-full w-64">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800">Categories</h2>
          <Button variant="ghost" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6 text-purple-800" />
          </Button>
        </div>
        <div className="space-y-2">
          {['all', 'phones', 'tablets', 'laptops', 'Tủ lạnh', 'Máy giặt', 'Tivi', 'Máy lạnh', 'Loa', 'Gia dụng'].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05, backgroundColor: '#F3E8FF' }}
              whileTap={{ scale: 0.95 }}
              className={`w-full p-3 text-left rounded-lg ${
                selectedCategory === category ? 'bg-purple-200 text-purple-800' : 'text-gray-600'
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setSidebarOpen(false);
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>
    </Drawer>
  );

  

  // Product Grid Component
  const ProductGrid = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6"
    >
      {filteredProducts.map(product => (
        <motion.div
          key={product.id}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold text-purple-800">{product.name}</CardTitle>
              <p className="text-2xl font-bold mt-2 text-purple-600">${product.price}</p>
              <p className="text-sm text-gray-500 mt-1">In stock: {product.stock}</p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-600">(4.5)</span>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button 
                  className="flex-grow bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setQuickViewProduct(product)}
                >
                  Quick View
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );

  // Quick View Component
  const QuickView = ({ product, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-purple-800">{product.name}</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
          <div>
            <p className="text-3xl font-bold text-purple-600 mb-4">${product.price}</p>
            <p className="text-gray-600 mb-4">
              {product.description || "Experience premium quality and exceptional performance with this product. Perfect for those who demand the best in technology and design."}
            </p>
            <p className="text-sm text-gray-500 mb-4">In stock: {product.stock}</p>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-gray-600">(4.5)</span>
            </div>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => {
                addToCart(product);
                onClose();
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-purple-900 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Customer Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-purple-300 transition-colors">Return Policy</a></li>
            <li><a href="#" className="hover:text-purple-300 transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-purple-300 transition-colors">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Company Information</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-purple-300 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-purple-300 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-purple-300 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-purple-300 transition-colors">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-purple-800 text-center">
        <p>&copy; 2024 MyStore. All rights reserved.</p>
      </div>
    </footer>
  );

  // Main render
  return (
    <div className="flex flex-col min-h-screen bg-purple-50">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-purple-800 mb-6">Our Premium Products</h1>
            <Tabs defaultValue="grid" className="mb-6">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              <TabsContent value="grid">
                <ProductGrid />
              </TabsContent>
              <TabsContent value="list">
                <div className="space-y-4">
                  {filteredProducts.map(product => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
                    >
                      <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-purple-800">{product.name}</h3>
                        <p className="text-xl font-bold text-purple-600">${product.price}</p>
                        <p className="text-sm text-gray-500">In stock: {product.stock}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setQuickViewProduct(product)}
                        >
                          Quick View
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
      
      <AnimatePresence>
        {quickViewProduct && (
          <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        )}
      </AnimatePresence>
      {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-auto">
          <AlertTitle>Notification</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ProductPage;