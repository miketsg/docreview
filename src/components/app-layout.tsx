import { Outlet } from 'react-router-dom'
import { AppHeader } from './app-header'
import { AppFooter } from './app-footer'

export function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col w-full ~bg-muted/50">
            <AppHeader />
            <div className="flex flex-col flex-grow w-full ">
                <div className='flex flex-col flex-grow'>
                    <Outlet />
                </div>
                <AppFooter />
            </div>
        </div>
    )
}