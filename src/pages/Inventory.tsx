import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ShoppingCart, X, Edit, Check, Search, Filter, ArrowUpDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  category: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Microprocessor X86',
      image: 'https://images.javatpoint.com/computer/images/what-is-x86.jpg',
      price: 299.99,
      stock: 150,
      category: 'Processors',
      description: 'High-performance microprocessor for desktop computing',
    },
    {
      id: 2,
      name: 'LCD Display 24"',
      image: '/placeholder.svg?height=200&width=200',
      price: 199.99,
      stock: 75,
      category: 'Displays',
      description: 'Full HD LCD display panel',
    },
    {
      id: 3,
      name: 'Circuit Board v2',
      image: '/placeholder.svg?height=200&width=200',
      price: 49.99,
      stock: 300,
      category: 'Components',
      description: 'Multi-layer PCB for electronic devices',
    },
  ])

  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [editMode, setEditMode] = useState<Record<number, boolean>>({})
  const [editValues, setEditValues] = useState<Record<number, Product>>({})
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' })

  const [newItem, setNewItem] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    category: '',
    description: '',
    image: '/placeholder.svg?height=200&width=200',
  })

  const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        showAlert('Cannot add more items than available in stock', 'error');
        return;
      }
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showAlert(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
    showAlert('Item removed from cart');
  };

  const updateCartQuantity = (productId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        const product = products.find(p => p.id === productId);
        
        if (product && newQuantity > product.stock) {
          showAlert('Cannot add more items than available in stock', 'error');
          return item;
        }
        
        if (newQuantity < 1) {
          return item;
        }
        
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const startEdit = (product: Product) => {
    setEditMode({ ...editMode, [product.id]: true });
    setEditValues({ ...editValues, [product.id]: { ...product } });
  };

  const saveEdit = (productId: number) => {
    const updatedProduct = editValues[productId];
    setProducts(products.map(product => 
      product.id === productId ? updatedProduct : product
    ));
    setEditMode({ ...editMode, [productId]: false });
    showAlert('Product updated successfully');
  };

  const addNewItem = () => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const newProduct = { ...newItem, id: newId };
    setProducts([...products, newProduct]);
    setNewItem({
      name: '',
      price: 0,
      stock: 0,
      category: '',
      description: '',
      image: '/placeholder.svg?height=200&width=200',
    });
    showAlert('New item added successfully');
  };

  const handleSort = (key: keyof Product) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === 'All' || product.category === categoryFilter)
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4">
        <AnimatePresence>
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 right-4 z-50"
            >
              <Alert className={`mb-4 ${alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Inventory Management</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add New Item</Button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Add New Item</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newItem.stock}
                      onChange={(e) => setNewItem({ ...newItem, stock: parseInt(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Category</Label>
                    <Select onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Processors">Processors</SelectItem>
                        <SelectItem value="Displays">Displays</SelectItem>
                        <SelectItem value="Components">Components</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Input
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={addNewItem} className="w-full bg-blue-600 hover:bg-blue-700 text-white">Add Item</Button>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative bg-green-600 hover:bg-green-700 text-white"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart ({cart.length})
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`w-full ${isCartOpen ? 'lg:w-2/3' : ''}`}>
            <Card className="bg-white dark:bg-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Product Inventory</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Manage and view your product inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      <SelectItem value="Processors">Processors</SelectItem>
                      <SelectItem value="Displays">Displays</SelectItem>
                      <SelectItem value="Components">Components</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleSort('name')} className="text-gray-700 dark:text-gray-300">
                      Name <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleSort('price')} className="text-gray-700 dark:text-gray-300">
                      Price <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleSort('stock')} className="text-gray-700 dark:text-gray-300">
                      Stock <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredAndSortedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        
<Card className="overflow-hidden bg-gray-50 dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                          <CardHeader className="pb-2">
                            <CardTitle className="flex justify-between items-center text-lg font-semibold text-gray-800 dark:text-gray-100">
                              {editMode[product.id] ? (
                                <Input
                                  value={editValues[product.id]?.name || ''}
                                  onChange={(e) => setEditValues({
                                    ...editValues,
                                    [product.id]: { ...editValues[product.id], name: e.target.value }
                                  })}
                                  className="w-full"
                                />
                              ) : (
                                product.name
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => editMode[product.id] ? saveEdit(product.id) : startEdit(product)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                              >
                                {editMode[product.id] ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Edit className="h-4 w-4" />
                                )}
                              </Button>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-2">
                              {editMode[product.id] ? (
                                <>
                                  <Input
                                    type="number"
                                    value={editValues[product.id]?.price || ''}
                                    onChange={(e) => setEditValues({
                                      ...editValues,
                                      [product.id]: { ...editValues[product.id], price: parseFloat(e.target.value) }
                                    })}
                                    className="mb-2"
                                  />
                                  <Input
                                    type="number"
                                    value={editValues[product.id]?.stock || ''}
                                    onChange={(e) => setEditValues({
                                      ...editValues,
                                      [product.id]: { ...editValues[product.id], stock: parseInt(e.target.value) }
                                    })}
                                  />
                                </>
                              ) : (
                                <>
                                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{product.price}</p>
                                  <p className={`text-sm ${product.stock < 50 ? 'text-red-500' : 'text-green-500'}`}>
                                    Stock: {product.stock}
                                  </p>
                                  <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200">{product.category}</Badge>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
                                </>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() => addToCart(product)}
                              disabled={product.stock === 0}
                            >
                              Add to Cart
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>

          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="w-full lg:w-1/3"
            >
              <Card className="bg-white dark:bg-gray-800 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Shopping Cart</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    {cart.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">Your cart is empty</p>
                    ) : (
                      <AnimatePresence>
                        {cart.map(item => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
                          >
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                            <div className="flex-1 ml-4">
                              <h3 className="font-medium text-gray-800 dark:text-gray-200">{item.name}</h3>
                              <p className="text-gray-600 dark:text-gray-400">₹{item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => updateCartQuantity(item.id, -1)}
                                className="text-gray-600 dark:text-gray-400"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center text-gray-800 dark:text-gray-200">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="text-gray-600 dark:text-gray-400"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </ScrollArea>
                  {cart.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-gray-200">
                        <span>Total:</span>
                        <span>
                          ₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                        </span>
                      </div>
                      <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">Checkout</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Inventory

