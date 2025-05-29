import LegalEditor from "@/components/LegalEditor/LegalEditor";

export default function Review() {
    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow-sm">
                    <div className="max-w-4xl px-4 py-4 mx-auto">
                        <h1 className="text-2xl font-semibold text-gray-900">Review document</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            A rich text editor for legal documents with issue highlighting
                        </p>
                    </div>
                </header>
                <main className="py-8">
                    <LegalEditor />
                </main>
            </div>
        </>
    )
}
