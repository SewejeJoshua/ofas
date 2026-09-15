import { Container } from "@/components/ui/container";

export default function TermsPage() {
    return (
        <div className="bg-white py-16">
            <Container>
                <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
                <p>Last updated: [Date]</p>
                <div className="prose max-w-none mt-8">
                    <p>Welcome to the One Family Asthma Support Group (OFAS) website. By accessing or using our website, you agree to be bound by these Terms of Use.</p>
                    <h3>1. Use of Content</h3>
                    <p>The content provided on this website is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment.</p>
                    <h3>2. User Conduct</h3>
                    <p>You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.</p>
                    {/* ... more legalese ... */}
                </div>
            </Container>
        </div>
    );
}
