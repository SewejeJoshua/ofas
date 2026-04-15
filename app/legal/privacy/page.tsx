import { Container } from "@/components/ui/container";

export default function PrivacyPage() {
    return (
        <div className="bg-white py-16">
            <Container>
                <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
                <p>Last updated: [Date]</p>
                <div className="prose max-w-none mt-8">
                    <p>Your privacy is important to us. It is OFAS's policy to respect your privacy regarding any information we may collect from you across our website.</p>
                    <h3>Information We Collect</h3>
                    <p>We may collect personal information such as your name, email address, and phone number when you sign up for our newsletter, volunteer, or make a donation.</p>
                    <h3>How We Use Information</h3>
                    <p>We use the information we collect to communicate with you, provide services, and improve our website.</p>
                    {/* ... more legalese ... */}
                </div>
            </Container>
        </div>
    );
}
