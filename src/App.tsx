import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function App() {
    return (
            <BrowserRouter>
                <Router />
            </BrowserRouter>
    )
}
