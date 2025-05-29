import DocumentSign from "@/components/DocumentSign/DocumentSign";

export default function Sign() {
    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow-sm">
                    <div className="max-w-4xl px-4 py-4 mx-auto">
                        <h1 className="text-2xl font-semibold text-gray-900">Sign your document</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Electronically sign your legal documents with ease
                        </p>
                    </div>
                </header>
                <main className="py-8">
                    <DocumentSign />
                </main>
            </div>
        </>
    )
}
