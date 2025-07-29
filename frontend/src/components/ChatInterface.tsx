import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Search, Book, Zap } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const messagesEndRef = useRef(null);

  // Sample suggested categories
  const suggestedCategories = [
    { icon: <Book className="w-6 h-6" />, title: "Getting Started", query: "how to get started", color: "bg-blue-500" },
    { icon: <Search className="w-6 h-6" />, title: "Search & Research", query: "how to search properties", color: "bg-green-500" },
    { icon: <Zap className="w-6 h-6" />, title: "Advanced Features", query: "advanced features and tools", color: "bg-purple-500" },
    { icon: <MessageCircle className="w-6 h-6" />, title: "Troubleshooting", query: "troubleshooting common issues", color: "bg-orange-500" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get query parameter on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const product = urlParams.get('product');
    
    if (product) {
      setSelectedProduct(product);
    }
    
    if (query) {
      setInput(query);
      handleSend(query, product || selectedProduct);
    }
  }, []);

  const handleSend = async (message = input, product = selectedProduct) => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          product: product || null,
          conversation_history: newMessages.slice(-5) // Last 5 messages for context
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        const assistantMessage = {
          role: 'assistant',
          content: data.response,
          sources: data.sources || []
        };
        setMessages([...newMessages, assistantMessage]);
      } else {
        throw new Error(data.detail || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        sources: []
      };
      setMessages([...newMessages, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleCategoryClick = (query) => {
    setInput(query);
    handleSend(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">AI Help Center</h1>
          </div>
          
          {/* Product Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Product:</span>
            <select 
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Products</option>
              <option value="radix">Radix</option>
              <option value="rediq">redIQ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Welcome Message & Categories */}
            {messages.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">How can I help you today?</h2>
                <p className="text-gray-600 mb-8">Ask me anything about Radix or redIQ, or choose a category below to get started.</p>
                
                {/* Suggested Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {suggestedCategories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category.query)}
                      className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group"
                    >
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-3 text-white group-hover:scale-110 transition-transform`}>
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.query}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl px-4 py-2 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Sources:</p>
                      <div className="space-y-1">
                        {message.sources.map((source, idx) => (
                          <div key={idx} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            <span className="font-medium">{source.title}</span>
                            <span className="text-gray-500 ml-2">({source.product})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your help center..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="1"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {selectedProduct && (
              <div className="mt-2 text-xs text-gray-500">
                Searching in: <span className="font-medium capitalize">{selectedProduct}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;