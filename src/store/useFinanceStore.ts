import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  date: string
  type: TransactionType
}

export type UserRole = 'Admin' | 'Viewer'
export type Theme = 'dark' | 'light'

interface FinanceState {
  transactions: Transaction[]
  role: UserRole
  theme: Theme
  searchQuery: string
  setRole: (role: UserRole) => void
  setTheme: (theme: Theme) => void
  setSearchQuery: (query: string) => void
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
}

const initialTransactions: Transaction[] = [
  { id: '1', description: 'Apple Store', amount: -999.00, category: 'Electronics', date: '2023-10-24', type: 'expense' },
  { id: '2', description: 'Monthly Salary', amount: 8500.00, category: 'Income', date: '2023-10-22', type: 'income' },
  { id: '3', description: 'Starbucks', amount: -15.50, category: 'Food', date: '2023-10-21', type: 'expense' },
  { id: '4', description: 'Rent Payment', amount: -2200.00, category: 'Bill', date: '2023-10-01', type: 'expense' },
  { id: '5', description: 'Uber', amount: -45.00, category: 'Transport', date: '2023-10-25', type: 'expense' },
]

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: initialTransactions,
      role: 'Admin',
      theme: 'dark',
      searchQuery: '',
      setRole: (role) => set({ role }),
      setTheme: (theme) => set({ theme }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      addTransaction: (transaction) => set((state) => ({
        transactions: [
          { ...transaction, id: Math.random().toString(36).substr(2, 9) },
          ...state.transactions,
        ],
      })),
      updateTransaction: (id, updates) => set((state) => ({
        transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      })),
    }),
    {
      name: 'finance-storage',
    }
  )
)
