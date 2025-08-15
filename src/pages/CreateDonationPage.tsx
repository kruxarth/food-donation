import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateDonationPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create a New Donation</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is where the donation creation form will be.</p>
      </CardContent>
    </Card>
  );
};

export default CreateDonationPage;