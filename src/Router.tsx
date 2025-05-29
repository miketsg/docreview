import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/app-layout'
import NotMatch from './pages/NotMatch'
import Review from './pages/Review'
import Sign from './pages/Sign'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/review" replace />} />
            <Route element={<AppLayout />}>
                <Route path="review" element={<Review />} />
                <Route path="sign" element={<Sign />} />
                <Route path="*" element={<NotMatch />} />
            </Route>
        </Routes>
    )
}
