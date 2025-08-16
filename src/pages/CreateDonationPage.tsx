// src/pages/CreateDonationPage.tsx
import { DonationForm } from "@/components/donation/DonationForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CreateDonationPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Schedule a New Donation</CardTitle>
          <CardDescription>
            Follow the steps below to schedule a pickup for your surplus food. Thank you for your contribution!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DonationForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDonationPage;