# Docreview

## Overview
A sample web application designed for legal document issue review and user signature capture.

## Technology Stack

### Core Technologies
- **React**: Chosen for its robust component-based architecture.
- **TypeScript**: Implemented for type safety, better developer experience, and improved code maintainability.
- **Vite**: Selected as the build tool for its exceptional development speed, optimized production builds

### UI Components and Styling
- **Shadcn**: A modern component library built on Radix UI and Tailwind CSS, providing accessible and customizable components
- **Lucide React**: Selected for its comprehensive set of customizable icons.

### Document Processing
- **PDF.js & React-PDF**: Integrated for robust PDF rendering capabilities.
- **Slate.js**: Implemented for rich text editing capabilities, chosen primarily for its open source nature, which offers a cost-effective alternative to commercial solutions like CKEditor, while also providing flexibility and extensibility.

### Development Tools
- **ESLint**: Configured for code quality and consistency.
- **Vite**: Used for fast development server and optimized builds.

## Project Structure
```
src/
├── components/   # Reusable UI components
├── data/         # Sample data for contract and issues  
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and shared logic
├── pages/        # Page components
└── Router.tsx    # Application routing
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)

### Installation
1. Clone the repository
2. Navigate to the project directory:

   ```bash
   cd docreview
   ```
3. Install dependencies:

   ```bash
   npm install
   ```

### Development
Run the development server:
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## Key Features
- Rich text editing capabilities
- Issue Clause Highlighting with extra detail on hover
- Add signature area to PDF via drag-and-drop
- Mobile Responsive and accessible UI components
- Modern, clean user interface


## Potential Future Improvements
- **AI Document Analysis**: Add basic AI-powered document summarization and key point extraction
- **Digital Signatures**: Add support for digital signature integration
- **Export Signed PDF**: Implement export of signed PDF documents
- **Document Import**: Enable bulk import of documents from various sources
- **OCR Support**: Add optical character recognition for scanned documents