import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/app-layout'
import NotMatch from './pages/NotMatch'
import Review from './pages/Review'
import Sign from './pages/Sign'

export default function Router() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<Review />} />
                <Route path="sign" element={<Sign />} />
                <Route path="*" element={<NotMatch />} />
            </Route>
        </Routes>
    )
}
