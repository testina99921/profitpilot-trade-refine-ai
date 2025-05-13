import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradeDataEntry, UserPlan } from '@/types/dashboard';
import { ArrowUpRight } from 'lucide-react';
import { extractCleanSymbol, extractNumericValue } from '@/utils/dashboardUtils';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

interface UploadedTradeDataProps {
  tradeData: TradeDataEntry[];
  hasUploadedData: boolean;
  totalTrades?: number;
  displayedTrades?: number;
  userPlan?: UserPlan;
}

const UploadedTradeData: React.FC<UploadedTradeDataProps> = ({ 
  tradeData, 
  hasUploadedData,
  totalTrades,
  displayedTrades,
  userPlan
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllTrades, setShowAllTrades] = useState(false);
  const tradesPerPage = 5;
  
  if (!hasUploadedData) {
    return null;
  }

  // If no data was uploaded or processed successfully
  if (tradeData.length === 0) {
    return (
      <Card className="mb-8 bg-card/50 backdrop-blur-sm border-purple-900/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Your Uploaded Trading Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No data available. Please upload a valid CSV file with trading data.
          </div>
        </CardContent>
      </Card>
    );
  }

  console.log("Trade data in UploadedTradeData:", tradeData);
  
  // Process the columns to display
  const allKeys = Object.keys(tradeData[0] || {});
  
  // Choose the most important columns to display if there are too many
  const getDisplayColumns = () => {
    // Prioritize standard column names and the original columns from the CSV
    const priorityKeys = [
      'Symbol', 'Side', 'Size', 'EntryPrice', 'ExitPrice', 'PnL', 'TradeTime', 'Type',
      'Contracts', 'Closing Direction', 'Qty', 'Entry Price', 'Exit Price', 'Closed P&L', 
      'Exit Type', 'Trade Time(UTC+0)', 'Create Time', 'Symbol Type'
    ];
    
    // Filter to only include keys that actually exist in the data
    const availablePriorityKeys = priorityKeys.filter(key => allKeys.includes(key));
    
    // If we have 6 or fewer columns, show all of them
    if (allKeys.length <= 6) return allKeys;
    
    // Otherwise, pick the most important ones first, then fill with others
    let selectedKeys = [];
    
    // First add any priority keys that exist
    for (const key of availablePriorityKeys) {
      if (selectedKeys.length < 6) {
        selectedKeys.push(key);
      }
    }
    
    // If we still need more keys to get to 6, add others
    if (selectedKeys.length < 6) {
      for (const key of allKeys) {
        if (!selectedKeys.includes(key) && selectedKeys.length < 6) {
          selectedKeys.push(key);
        }
      }
    }
    
    return selectedKeys;
  };
  
  const displayColumns = getDisplayColumns();
  console.log("Display columns:", displayColumns);

  // Function to format cell value based on column name
  const formatCellValue = (key: string, value: string) => {
    if (!value) return '';
    
    // Special handling for Symbol or Contract column
    if (key === 'Symbol' || key === 'Contracts') {
      return value;
    }
    
    // Handle BUY/SELL direction
    if (key === 'Side' || key === 'Direction' || key === 'Closing Direction') {
      const direction = value.toLowerCase();
      if (direction === 'buy') {
        return <span className="text-green-500">BUY</span>;
      } else if (direction === 'sell') {
        return <span className="text-red-500">SELL</span>;
      }
      return value;
    }
    
    // Handle price columns
    if (key.toLowerCase().includes('price') || 
        key === 'PnL' || 
        key === 'Closed P&L' || 
        key.toLowerCase().includes('p&l')) {
      // Format as currency if it's a number
      const num = parseFloat(value.replace(/[^0-9.-]/g, ''));
      if (!isNaN(num)) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2
        }).format(num);
      }
    }
    
    // Handle date columns
    if (key.toLowerCase().includes('time') || 
        key.toLowerCase().includes('date') || 
        key === 'TradeTime' || 
        key === 'Trade Time(UTC+0)' || 
        key === 'Create Time') {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }).format(date);
        }
      } catch (e) {
        // If date parsing fails, return the original value
      }
    }
    
    return String(value || '');
  };
  
  // Calculate pagination
  const indexOfLastTrade = showAllTrades ? displayedTrades || tradeData.length : currentPage * tradesPerPage;
  const indexOfFirstTrade = showAllTrades ? 0 : indexOfLastTrade - tradesPerPage;
  const currentTrades = tradeData.slice(indexOfFirstTrade, indexOfLastTrade);
  
  const totalPages = Math.ceil(tradeData.length / tradesPerPage);
  
  // Page change handler
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Next and previous page handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };
  
  // Toggle show all trades
  const toggleShowAll = () => {
    setShowAllTrades(!showAllTrades);
    setCurrentPage(1); // Reset to first page when toggling
  };

  return (
    <Card className="mb-8 bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Your Uploaded Trading Data</CardTitle>
        {totalTrades && displayedTrades && userPlan && (
          <div className="text-xs text-muted-foreground">
            Showing {displayedTrades} of {totalTrades} trades 
            {totalTrades > displayedTrades && (
              <span className="ml-1 text-purple-400">
                ({userPlan} plan limit)
              </span>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {tradeData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-900/20">
                  {displayColumns.map((header, index) => (
                    <th key={index} className="text-left py-3 px-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTrades.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-purple-900/10 hover:bg-purple-900/5">
                    {displayColumns.map((key, cellIndex) => (
                      <td key={cellIndex} className="py-3 px-2">
                        {formatCellValue(key, String(row[key] || ''))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                {showAllTrades ? 
                  `Showing all ${Math.min(displayedTrades || tradeData.length, tradeData.length)} entries` : 
                  `Showing ${indexOfFirstTrade + 1}-${indexOfLastTrade} of ${tradeData.length} entries`}
              </p>
              
              {/* Toggle view all/paginate button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleShowAll} 
                className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
              >
                {showAllTrades ? 'Show pages' : 'View all'} <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            {/* Pagination */}
            {!showAllTrades && totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={prevPage} 
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {/* Show first page */}
                  {totalPages > 3 && currentPage > 2 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => paginate(1)}>1</PaginationLink>
                    </PaginationItem>
                  )}
                  
                  {/* Show ellipsis if needed */}
                  {totalPages > 3 && currentPage > 3 && (
                    <PaginationItem>
                      <span className="flex h-9 w-9 items-center justify-center">...</span>
                    </PaginationItem>
                  )}
                  
                  {/* Show current page and neighbors */}
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    let pageNumber;
                    
                    if (totalPages <= 3) {
                      // If 3 or fewer pages, show all pages
                      pageNumber = i + 1;
                    } else if (currentPage === 1 || currentPage === 2) {
                      // If on first or second page, show first 3 pages
                      pageNumber = i + 1;
                    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
                      // If on last or second-to-last page, show last 3 pages
                      pageNumber = totalPages - 2 + i;
                    } else {
                      // Otherwise show current page and neighbors
                      pageNumber = currentPage - 1 + i;
                    }
                    
                    // Only render if page number is valid
                    if (pageNumber > 0 && pageNumber <= totalPages) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink 
                            isActive={currentPage === pageNumber}
                            onClick={() => paginate(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  {/* Show ellipsis if needed */}
                  {totalPages > 3 && currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <span className="flex h-9 w-9 items-center justify-center">...</span>
                    </PaginationItem>
                  )}
                  
                  {/* Show last page */}
                  {totalPages > 3 && currentPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => paginate(totalPages)}>{totalPages}</PaginationLink>
                    </PaginationItem>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={nextPage} 
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No data available. Please upload a valid CSV file.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadedTradeData;
