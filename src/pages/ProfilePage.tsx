import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfilePage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p>User profile and settings form will be here.</p>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;