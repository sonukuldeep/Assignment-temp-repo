import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider } from "react-redux";
import store from '../redux/store';

// Create tanstack query client
const queryClient = new QueryClient()

export default function RootProvider({ children }: { children: React.ReactNode }) {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    {children}
                </Provider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}