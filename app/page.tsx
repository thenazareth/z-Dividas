'use client'

import { useEffect } from 'react'
import { useStore } from '@/src/store/useStore'

import Login from '@/src/screens/Login'
import Home from '@/src/screens/Home'
import Accounts from '@/src/screens/Accounts'
import Statistics from '@/src/screens/Statistics'

import { BottomNav } from '@/src/components/BottomNav'

export default function Page() {
    const { isAuthenticated, activeTab, setActiveTab } = useStore()

    useEffect(() => {
        if (!isAuthenticated) {
            setActiveTab('home')
        }
    }, [isAuthenticated, setActiveTab])

    if (!isAuthenticated) {
        return <Login />
    }

    return (
        <div className="min-h-screen bg-[#0D57636C] dark:bg-[#0B494F] text-slate-900 dark:text-white font-sans">
            <main className="container max-w-xl mx-auto min-h-screen bg-white dark:bg-[#1C1C1C] shadow-xl relative px-4 pt-6">
                {activeTab === 'home' && <Home />}
                {activeTab === 'accounts' && <Accounts />}
                {activeTab === 'statistics' && <Statistics />}
            </main>

            <BottomNav
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </div>
    )
}