import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Search, Book, Zap, Database, Calculator, RefreshCw, Users, BarChart3, Code, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ title: string; product: string }>;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  sections: string[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [suggestedQueries, setSuggestedQueries] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [generatingQueries, setGeneratingQueries] = useState(false);
  const messagesEndRef = useRef(null);

  // Radix categories and sections
  const radixCategories: Category[] = [
    {
      id: 'realrents',
      name: 'RealRents',
      description: 'RealRents + Radix Analytics is the first dual-platform solution that provides accurate, transparent, and real-time rental market insights.',
      icon: <Search className="w-6 h-6" />,
      color: 'bg-[#008CD5]',
      sections: ['General', 'Managing Listings', 'Fees, Deposits and Concessions', 'Legacy']
    },
    {
      id: 'benchmark',
      name: 'Benchmark',
      description: 'Evaluate your property and portfolio performance with comprehensive benchmarking tools.',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-[#7AC943]',
      sections: ['Updating your Market Survey now on RealRents', 'Managing Users', 'Evaluating Your Property\'s Performance', 'Evaluating Your Portfolio\'s Performance', 'Managing Properties', 'Data Dictionary']
    },
    {
      id: 'reports',
      name: 'Reports',
      description: 'Create, customize, and share comprehensive property and portfolio reports.',
      icon: <Book className="w-6 h-6" />,
      color: 'bg-[#6F4888]',
      sections: ['Report Overviews', 'Customizing Reports', 'Sharing Reports']
    },
    {
      id: 'research',
      name: 'Research',
      description: 'Access comprehensive market research and property data.',
      icon: <Search className="w-6 h-6" />,
      color: 'bg-[#FFC120]',
      sections: ['Research']
    },
    {
      id: 'proforma',
      name: 'ProForma',
      description: 'Streamline your underwriting endeavors with powerful proforma tools.',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-[#E00038]',
      sections: ['ProForma']
    },
    {
      id: 'api',
      name: 'API & Integrations',
      description: 'Connect Radix data with your existing systems and workflows.',
      icon: <Code className="w-6 h-6" />,
      color: 'bg-[#A5A8AB]',
      sections: ['API', 'Integrations']
    }
  ];

  // redIQ categories and sections
  const rediqCategories: Category[] = [
    {
      id: 'dataiq',
      name: 'dataIQ',
      description: 'Instantly extract data from static financial documents like rent rolls and operating statements.',
      icon: <Database className="w-6 h-6" />,
      color: 'bg-[#008CD5]',
      sections: ['Deals', 'Rent Rolls', 'Operating Statements', 'FirstPass', 'SmartMap+', 'Radix Research', 'Settings and Admin']
    },
    {
      id: 'valuationiq',
      name: 'valuationIQ',
      description: 'Leverage our powerful institutional caliber underwriting model tied directly to your online data.',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-[#7AC943]',
      sections: ['About', 'How to Use the Model', 'Troubleshooting']
    },
    {
      id: 'quicksync',
      name: 'QuickSync',
      description: 'Sync data from redIQ into any Excel spreadsheet or model with endless possibilities.',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'bg-[#6F4888]',
      sections: ['Getting Started', 'Rent Roll', 'Video Tutorials', 'Operating Statements', 'Best Practices and Tips']
    },
    {
      id: 'support',
      name: 'Support and Training',
      description: 'Get help, training resources, and stay updated with the latest features.',
      icon: <HelpCircle className="w-6 h-6" />,
      color: 'bg-[#FFC120]',
      sections: ['Contacting Support', 'Training Resources', 'Product Release Notes']
    }
  ];

  // Get suggested categories based on selected product
  const getSuggestedCategories = () => {
    if (selectedProduct === 'radix') {
      return radixCategories;
    } else if (selectedProduct === 'rediq') {
      return rediqCategories;
    } else {
      // Show a mix of both products when "All Products" is selected
      return [
        radixCategories[0], // RealRents
        rediqCategories[0], // dataIQ
        radixCategories[1], // Benchmark
        rediqCategories[1]  // valuationIQ
      ];
    }
  };

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

  const generateSuggestedQueries = async (category: Category) => {
    setGeneratingQueries(true);
    setShowSuggestions(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/generate-queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category_name: category.name,
          category_description: category.description,
          sections: category.sections,
          product: selectedProduct || 'all'
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuggestedQueries(data.queries || []);
      } else {
        // Fallback to default queries if API fails
        setSuggestedQueries([
          `How do I get started with ${category.name}?`,
          `What are the main features of ${category.name}?`,
          `How can I troubleshoot issues with ${category.name}?`,
          `What are the best practices for using ${category.name}?`
        ]);
      }
    } catch (error) {
      // Fallback to default queries if API fails
      setSuggestedQueries([
        `How do I get started with ${category.name}?`,
        `What are the main features of ${category.name}?`,
        `How can I troubleshoot issues with ${category.name}?`,
        `What are the best practices for using ${category.name}?`
      ]);
    }
    
    setGeneratingQueries(false);
  };

  const handleSend = async (message = input, product = selectedProduct) => {
    if (!message.trim()) return;

    const userMessage: Message = { role: 'user', content: message };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false); // Hide suggestions when sending a message

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
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          sources: data.sources || []
        };
        setMessages([...newMessages, assistantMessage]);
      } else {
        throw new Error(data.detail || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        sources: []
      };
      setMessages([...newMessages, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleCategoryClick = (category: Category) => {
    generateSuggestedQueries(category);
  };

  const handleSuggestedQueryClick = (query: string) => {
    setInput(query);
    handleSend(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedCategories = getSuggestedCategories();

  return (
    <div className="flex flex-col h-screen bg-[#F6F7F8] font-[var(--font-figtree)] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-[#E6E7E8] p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#008CD5] rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-[#333333] leading-6">AI Help Center</h1>
          </div>
          
          {/* Product Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#707174] font-normal">Product:</span>
            <select 
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="border border-[#D5D8DB] rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#008CD5] focus:border-transparent bg-white text-[#333333] font-normal"
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
            
            {/* Welcome Message & Input */}
            {messages.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="w-16 h-16 text-[#008CD5] mx-auto mb-4" />
                <h2 className="text-2xl font-extrabold text-[#333333] mb-2 leading-8">How can I help you today?</h2>
                <p className="text-[#707174] mb-8 font-normal text-base leading-6">
                  {selectedProduct === 'radix' 
                    ? 'Ask me anything about Radix products, or choose a category below to get started.'
                    : selectedProduct === 'rediq'
                    ? 'Ask me anything about redIQ products, or choose a category below to get started.'
                    : 'Ask me anything about Radix or redIQ, or choose a category below to get started.'
                  }
                </p>
                
                {/* Chat Input */}
                <div className="max-w-3xl mx-auto mb-8">
                  <div className="flex items-end space-x-2">
                    <div className="flex-1 relative">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about your help center..."
                        className="w-full px-4 py-3 border border-[#D5D8DB] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#008CD5] focus:border-transparent font-normal text-base leading-6 text-[#333333] placeholder-[#707174] bg-white shadow-sm"
                        rows={2}
                        style={{ minHeight: '60px', maxHeight: '120px' }}
                      />
                    </div>
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className="bg-[#008CD5] text-white p-3 rounded-lg hover:bg-[#0076B4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {selectedProduct && (
                    <div className="mt-2 text-xs text-[#707174] font-normal text-center">
                      Searching in: <span className="font-extrabold capitalize">{selectedProduct}</span>
                    </div>
                  )}
                </div>

                {/* Suggested Queries */}
                {showSuggestions && (
                  <div className="max-w-3xl mx-auto mb-8">
                    <div className="bg-white rounded-lg border border-[#E6E7E8] p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-extrabold text-[#333333] text-base">Suggested Questions</h3>
                        <button
                          onClick={() => setShowSuggestions(false)}
                          className="text-[#707174] hover:text-[#333333] transition-colors"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {generatingQueries ? (
                        <div className="flex items-center justify-center py-4">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[#008CD5] rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[#008CD5] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-[#008CD5] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-sm text-[#707174] font-normal ml-2">Generating questions...</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {suggestedQueries.map((query, index) => (
                            <div
                              key={index}
                              onClick={() => handleSuggestedQueryClick(query)}
                              className="w-full text-left px-4 py-3 rounded-lg border border-[#E6E7E8] hover:border-[#008CD5] hover:bg-[#E8F8FF] transition-all duration-200 cursor-pointer"
                            >
                              <div className="text-sm text-[#333333] font-normal leading-5 break-words whitespace-normal">{query}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Suggested Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {suggestedCategories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      className="p-4 bg-white rounded-lg border border-[#E6E7E8] hover:border-[#008CD5] hover:shadow-md transition-all duration-200 text-left group"
                    >
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-3 text-white group-hover:scale-110 transition-transform`}>
                        {category.icon}
                      </div>
                      <h3 className="font-extrabold text-[#333333] mb-1 text-base leading-6">{category.name}</h3>
                      <p className="text-sm text-[#707174] font-normal leading-5 line-clamp-2">{category.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl px-4 py-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-[#008CD5] text-white' 
                    : 'bg-white border border-[#E6E7E8] text-[#333333]'
                }`}>
                  <div className="whitespace-pre-wrap font-normal text-base leading-6">{message.content}</div>
                  
                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#E6E7E8]">
                      <p className="text-xs text-[#707174] mb-2 font-normal">Sources:</p>
                      <div className="space-y-1">
                        {message.sources.map((source, idx) => (
                          <div key={idx} className="text-xs text-[#008CD5] bg-[#E8F8FF] px-2 py-1 rounded font-normal">
                            <span className="font-extrabold">{source.title}</span>
                            <span className="text-[#707174] ml-2">({source.product})</span>
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
                <div className="bg-white border border-[#E6E7E8] rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#707174] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#707174] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-[#707174] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-[#707174] font-normal">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatInterface;