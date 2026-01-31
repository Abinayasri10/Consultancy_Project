'use client';

import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Trash2, Minus, Plus, CarIcon as CartIcon } from 'lucide-react';

export default function ShoppingCart({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToBilling,
  isLoading = false
}) {
  if (cartItems.length === 0) {
    return (
      <Card className="bg-white border-2 border-dashed border-gray-300">
        <CardContent className="py-12 text-center">
          <CartIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <p className="text-gray-400 text-sm mt-2">Add pesticides to get started</p>
        </CardContent>
      </Card>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <Card className="bg-white border-2 border-green-600">
      <CardHeader className="bg-green-50">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <CartIcon size={24} className="text-green-600" />
            Shopping Cart
          </CardTitle>
          <Badge variant="secondary">{cartItems.length} items</Badge>
        </div>
      </CardHeader>

      <CardContent className="py-6">
        <div className="space-y-4 max-h-48 overflow-y-auto">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-3 pb-4 border-b last:border-0">
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.unit} • ₹{item.price} each</p>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onUpdateQuantity(item.id, Math.max(0.5, item.quantity - 0.5))}
                  className="h-6 w-6 p-0"
                >
                  <Minus size={14} />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className="w-12 h-6 text-center text-sm border-0 bg-white"
                  step="0.5"
                  min="0.5"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 0.5)}
                  className="h-6 w-6 p-0"
                >
                  <Plus size={14} />
                </Button>
              </div>

              {/* Item Total */}
              <div className="text-right min-w-20">
                <p className="font-bold text-green-700">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>

              {/* Delete Button */}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemoveItem(item.id)}
                className="h-8 w-8 p-0 hover:bg-red-50"
              >
                <Trash2 size={16} className="text-red-600" />
              </Button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-6 border-t-2 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-orange-600">
            <span>Tax (5%):</span>
            <span className="font-semibold">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t text-green-700">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-3 flex-col sm:flex-row">
        <Button
          onClick={onClearCart}
          variant="outline"
          className="flex-1 bg-transparent"
          disabled={isLoading}
        >
          Clear Cart
        </Button>
        <Button
          onClick={onProceedToBilling}
          className="flex-1 bg-green-600 hover:bg-green-700"
          disabled={isLoading || cartItems.length === 0}
        >
          {isLoading ? 'Processing...' : 'Proceed to Billing'}
        </Button>
      </CardFooter>
    </Card>
  );
}
