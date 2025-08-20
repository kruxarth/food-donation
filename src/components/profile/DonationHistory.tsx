// src/components/profile/DonationHistory.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DonationStatus } from "@/types/donation";
import type { DonationSummary } from "@/types/profile";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const getStatusBadgeVariant = (status: DonationStatus) => {
    switch(status) {
        case DonationStatus.Pending: return "secondary";
        case DonationStatus.InProgress: return "default";
        case DonationStatus.Completed: return "outline";
        default: return "destructive";
    }
}

export const DonationHistory = ({ donations }: { donations: DonationSummary[] }) => (
  <Card>
    <CardHeader className="flex-row items-center justify-between">
        <div>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Your last 5 donations.</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm"><Link to="/dashboard/history">View All</Link></Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{format(new Date(d.date), "MMM d, yyyy")}</TableCell>
              <TableCell>{d.recipient}</TableCell>
              <TableCell><Badge variant={getStatusBadgeVariant(d.status)}>{d.status}</Badge></TableCell>
              <TableCell className="text-right">
                <Button asChild variant="ghost" size="sm">
                    <Link to={`/dashboard/track/${d.id}`}>Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);