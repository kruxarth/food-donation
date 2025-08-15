import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDonationById } from '@/hooks/use-donations';
import { Skeleton } from '@/components/ui/skeleton';

const TrackingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: donation, isLoading } = useDonationById(id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Track Donation</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
            <Skeleton className='w-1/2 h-8' />
        ) : donation ? (
             <p>Showing tracking details for Donation ID: <strong>{donation.id}</strong></p>
        ) : (
            <p>Donation with ID <strong>{id}</strong> not found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TrackingPage;