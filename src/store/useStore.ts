
import { create } from 'zustand';
import { User, Account, Transaction, Category } from '../utils/mockData';

interface AppState {
    user: User | null;
    accounts: Account[];
    transactions: Transaction[];
    categories: Category[];
    isAuthenticated: boolean;

    // Navigation & UI State
    activeTab: 'home' | 'accounts' | 'statistics';
    setActiveTab: (tab: 'home' | 'accounts' | 'statistics') => void;

    // Global Modal State
    isTransactionModalOpen: boolean;
    transactionModalType: 'income' | 'expense';
    openTransactionModal: (type?: 'income' | 'expense') => void;
    closeTransactionModal: () => void;

    isAddAccountModalOpen: boolean;
    openAddAccountModal: () => void;
    closeAddAccountModal: () => void;

    // Accounts Sort State
    accountsSortOrder: 'default' | 'date-asc' | 'date-desc' | 'amount-asc' | 'amount-desc';
    setAccountsSortOrder: (order: 'default' | 'date-asc' | 'date-desc' | 'amount-asc' | 'amount-desc') => void;

    // Authentication State
    setUser: (user: User | null) => void;
    logout: () => void;

    // Data State
    setAccounts: (accounts: Account[]) => void;
    setTransactions: (transactions: Transaction[]) => void;
    setCategories: (categories: Category[]) => void;

    addTransaction: (transaction: Transaction) => void;
    updateTransaction: (id: string, updates: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;

    addAccount: (account: Account) => void;
    updateAccount: (id: string, updates: Partial<Account>) => void;
    deleteAccount: (id: string) => void;

    addCategory: (category: Category) => void;
    updateCategory: (id: string, updates: Partial<Category>) => void;
    deleteCategory: (id: string) => void;

    payBill: (transactionId: string) => void;
}

export const useStore = create<AppState>()((set) => ({
    user: null,
    accounts: [],
    transactions: [],
    categories: [],
    isAuthenticated: false,

    // Initial UI State
    activeTab: 'home',
    isTransactionModalOpen: false,
    transactionModalType: 'expense',

    setActiveTab: (tab) => set({ activeTab: tab }),

    openTransactionModal: (type = 'expense') => set({
        isTransactionModalOpen: true,
        transactionModalType: type
    }),

    closeTransactionModal: () => set({ isTransactionModalOpen: false }),

    isAddAccountModalOpen: false,
    openAddAccountModal: () => set({ isAddAccountModalOpen: true }),
    closeAddAccountModal: () => set({ isAddAccountModalOpen: false }),

    accountsSortOrder: 'default',
    setAccountsSortOrder: (order) => set({ accountsSortOrder: order }),

    // Authentication State
    setUser: (user) => set({
        user,
        isAuthenticated: user !== null
    }),

    logout: () => set({
        user: null,
        accounts: [],
        transactions: [],
        categories: [],
        isAuthenticated: false
    }),

    // Data State
    setAccounts: (accounts) => set({ accounts }),
    setTransactions: (transactions) => set({ transactions }),
    setCategories: (categories) => set({ categories }),

    addTransaction: (transaction) =>
        set((state) => ({
            transactions: [...state.transactions, transaction]
        })),

    updateTransaction: (id, updates) =>
        set((state) => ({
            transactions: state.transactions.map((t) =>
                t.id === id ? { ...t, ...updates } : t
            )
        })),

    deleteTransaction: (id) =>
        set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id)
        })),

    addAccount: (account) =>
        set((state) => ({
            accounts: [...state.accounts, account]
        })),

    updateAccount: (id, updates) =>
        set((state) => ({
            accounts: state.accounts.map((a) =>
                a.id === id ? { ...a, ...updates } : a
            )
        })),

    deleteAccount: (id) =>
        set((state) => ({
            accounts: state.accounts.filter((a) => a.id !== id)
        })),

    addCategory: (category) =>
        set((state) => ({
            categories: [...state.categories, category]
        })),

    updateCategory: (id, updates) =>
        set((state) => ({
            categories: state.categories.map((c) =>
                c.id === id ? { ...c, ...updates } : c
            )
        })),

    deleteCategory: (id) =>
        set((state) => ({
            categories: state.categories.filter((c) => c.id !== id)
        })),

    payBill: (transactionId) =>
        set((state) => ({
            transactions: state.transactions.map((t) =>
                t.id === transactionId ? { ...t, status: 'paid' } : t
            )
        }))
}));
