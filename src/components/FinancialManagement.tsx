import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, TrendingDown, Eye, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import FinancialModal from '@/components/modals/FinancialModal';
import ViewTransactionModal from '@/components/modals/ViewTransactionModal';

const FinancialManagement = () => {
  const [transactions] = useState([
    {
      id: 'TXN001',
      type: 'Income',
      category: 'Milk Sales',
      amount: 875,
      date: '2024-05-28',
      description: 'Daily milk collection - Dairy Co-op'
    },
    {
      id: 'TXN002',
      type: 'Expense',
      category: 'Feed',
      amount: 395,
      date: '2024-05-28',
      description: 'Hay and concentrate purchase'
    },
    {
      id: 'TXN003',
      type: 'Income',
      category: 'Animal Sales',
      amount: 2500,
      date: '2024-05-27',
      description: 'Bull calf sale to neighbor farm'
    },
    {
      id: 'TXN004',
      type: 'Expense',
      category: 'Veterinary',
      amount: 150,
      date: '2024-05-26',
      description: 'Vaccination and health check'
    }
  ]);

  const [expenses] = useState([
    { category: 'Feed', amount: 8450, percentage: 45 },
    { category: 'Veterinary', amount: 2200, percentage: 12 },
    { category: 'Labor', amount: 3800, percentage: 20 },
    { category: 'Equipment', amount: 1850, percentage: 10 },
    { category: 'Utilities', amount: 1200, percentage: 6 },
    { category: 'Other', amount: 1300, percentage: 7 }
  ]);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { toast } = useToast();

  const getTransactionColor = (type: string) => {
    return type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setViewModalOpen(true);
  };

  const handleEditTransaction = (transaction: any) => {
    console.log('Editing transaction:', transaction);
    toast({
      title: "Edit Transaction",
      description: `Opening edit form for ${transaction.id}`,
    });
  };

  const handleDeleteTransaction = (transactionId: string) => {
    console.log('Deleting transaction:', transactionId);
    toast({
      title: "Transaction Deleted",
      description: "Transaction has been removed",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Financial Management</h2>
        <div className="flex space-x-2">
          <FinancialModal type="income" />
          <FinancialModal type="expense" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 text-green-600 font-bold text-lg flex items-center justify-center">৳</div>
              <div>
                <div className="text-2xl font-bold text-green-600">12,450</div>
                <div className="text-sm text-gray-600">Monthly Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">8,200</div>
                <div className="text-sm text-gray-600">Monthly Expenses</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">4,250</div>
                <div className="text-sm text-gray-600">Net Profit</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">%</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">34%</div>
                <div className="text-sm text-gray-600">Profit Margin</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>
                      <Badge className={getTransactionColor(txn.type)}>
                        {txn.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{txn.category}</TableCell>
                    <TableCell className={txn.type === 'Income' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      {txn.type === 'Income' ? '+' : '-'}{txn.amount}
                    </TableCell>
                    <TableCell className="text-sm">{txn.description}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewTransaction(txn)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditTransaction(txn)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteTransaction(txn.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-red-600" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.map((expense, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{expense.category}</span>
                    <span className="text-sm text-gray-600">{expense.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${expense.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 text-right">{expense.percentage}%</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Expenses:</span>
                <span className="text-lg font-bold text-red-600">18,800</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ViewTransactionModal 
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default FinancialManagement;
