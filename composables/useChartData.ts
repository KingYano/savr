import { computed, type Ref } from 'vue';
import type { Movement } from '~/types/finance';
import type { Category } from '~/types/categories';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  date?: Date;
}

export interface ChartStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
  averageIncome: number;
  averageExpense: number;
}

export interface MonthlyData {
  labels: string[];
  income: number[];
  expense: number[];
}

export function useChartData(movements: Ref<Movement[]>, categories: Ref<Category[]>) {
  
  const chartStats = computed((): ChartStats => {
    const movs = movements.value || [];
    
    const validMovs = movs.filter(m => {
      const isValid = m && 
        typeof m.amount === 'number' && 
        !isNaN(m.amount) && 
        m.amount > 0 &&
        (m.type === 'income' || m.type === 'expense');
      
      return isValid;
    });
    
    const incomeMovements = validMovs.filter(m => m.type === 'income');
    const expenseMovements = validMovs.filter(m => m.type === 'expense');
    
    const income = incomeMovements.reduce((sum, m) => {
      const amount = Number(m.amount) || 0;
      return sum + amount;
    }, 0);

    const expense = expenseMovements.reduce((sum, m) => {
      const amount = Number(m.amount) || 0;
      return sum + amount;
    }, 0);

    const averageIncome = incomeMovements.length > 0 ? income / incomeMovements.length : 0;
    const averageExpense = expenseMovements.length > 0 ? expense / expenseMovements.length : 0;
    
    const result = {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      transactionCount: validMovs.length,
      averageIncome,
      averageExpense
    };

    return result;
  });

  const expensesByCategoryChart = computed((): ChartDataPoint[] => {
    const movs = movements.value || [];
    const expenseMovements = movs.filter(m => m.type === 'expense');
    
    const categoryTotals = expenseMovements.reduce((acc, movement) => {
      const categoryId = movement.categoryId || 'other';
      acc[categoryId] = (acc[categoryId] || 0) + movement.amount;
      return acc;
    }, {} as Record<string, number>);

    const cats = categories.value || [];
    
    return Object.entries(categoryTotals).map(([categoryId, total]) => {
      const category = cats.find(c => c.id === categoryId);
      return {
        label: category?.name || 'Autre',
        value: total,
        color: category?.color || '#6B7280'
      };
    }).sort((a, b) => b.value - a.value);
  });

  const incomesByCategoryChart = computed((): ChartDataPoint[] => {
    const movs = movements.value || [];
    const incomeMovements = movs.filter(m => m.type === 'income');
    
    const categoryTotals = incomeMovements.reduce((acc, movement) => {
      const categoryId = movement.categoryId || 'other';
      acc[categoryId] = (acc[categoryId] || 0) + movement.amount;
      return acc;
    }, {} as Record<string, number>);

    const cats = categories.value || [];
    
    return Object.entries(categoryTotals).map(([categoryId, total]) => {
      const category = cats.find(c => c.id === categoryId);
      return {
        label: category?.name || 'Autre',
        value: total,
        color: category?.color || '#6B7280'
      };
    }).sort((a, b) => b.value - a.value);
  });

  const monthlyChart = computed((): MonthlyData => {
    const movs = movements.value || [];
    
    const monthlyData = movs.reduce((acc, movement) => {
      const date = movement.date instanceof Date ? movement.date : new Date(movement.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!acc[monthKey]) {
        acc[monthKey] = { income: 0, expense: 0 };
      }
      
      if (movement.type === 'income') {
        acc[monthKey].income += movement.amount;
      } else {
        acc[monthKey].expense += movement.amount;
      }
      
      return acc;
    }, {} as Record<string, { income: number; expense: number }>);

    const sortedMonths = Object.keys(monthlyData).sort();
    
    return {
      labels: sortedMonths.map(month => {
        const [year, monthNum] = month.split('-');
        const date = new Date(parseInt(year), parseInt(monthNum) - 1);
        return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
      }),
      income: sortedMonths.map(month => monthlyData[month].income),
      expense: sortedMonths.map(month => monthlyData[month].expense)
    };
  });

  const topCategoriesChart = computed((): ChartDataPoint[] => {
    const movs = movements.value || [];
    
    const categoryTotals = movs.reduce((acc, movement) => {
      const categoryId = movement.categoryId || 'other';
      acc[categoryId] = (acc[categoryId] || 0) + movement.amount;
      return acc;
    }, {} as Record<string, number>);

    const cats = categories.value || [];
    
    return Object.entries(categoryTotals)
      .map(([categoryId, total]) => {
        const category = cats.find(c => c.id === categoryId);
        return {
          label: category?.name || 'Autre',
          value: total,
          color: category?.color || '#6B7280'
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  });

  const amountDistributionChart = computed((): ChartDataPoint[] => {
    const movs = movements.value || [];
    const amounts = movs.map(m => m.amount).sort((a, b) => a - b);
    
    if (amounts.length === 0) return [];
    
    const ranges = [
      { label: '0-50€', min: 0, max: 50, color: '#10B981' },
      { label: '50-100€', min: 50, max: 100, color: '#3B82F6' },
      { label: '100-500€', min: 100, max: 500, color: '#F59E0B' },
      { label: '500€+', min: 500, max: Infinity, color: '#EF4444' }
    ];
    
    return ranges.map(range => ({
      label: range.label,
      value: amounts.filter(amount => amount >= range.min && amount < range.max).length,
      color: range.color
    })).filter(item => item.value > 0);
  });

  return {
    chartStats,
    expensesByCategoryChart,
    incomesByCategoryChart,
    monthlyChart,
    topCategoriesChart,
    amountDistributionChart
  };
}