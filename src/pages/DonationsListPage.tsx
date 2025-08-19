import React from 'react';

// Mock data - replace with your actual hook
const mockDonations = [
  {
    id: "don-001",
    status: "Pending",
    submittedDate: "2024-01-15T10:30:00Z",
    items: [{ name: "Sourdough Bread", quantity: "20 loaves" }],
    recipient: { name: "City Harvest Food Bank", id: "rec-abc" }
  },
  {
    id: "don-002", 
    status: "InProgress",
    submittedDate: "2024-01-14T10:30:00Z",
    items: [{ name: "Fresh Vegetable Mix", quantity: "50 lbs" }],
    recipient: { name: "Community Kitchen Shelter", id: "rec-def" }
  },
  {
    id: "don-003",
    status: "Completed", 
    submittedDate: "2024-01-05T10:30:00Z",
    items: [{ name: "Canned Soups", quantity: "5 cases" }],
    recipient: { name: "Helping Hands Foundation", id: "rec-ghi" }
  }
];

const DonationsListPage = () => {
  // Mock navigate function - replace with actual useNavigate hook
  const navigate = (path) => {
    console.log('Navigate to:', path);
    // In your real app: navigate(path);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'InProgress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canTrack = (status) => {
    return ['Pending', 'InProgress'].includes(status);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Donations</h1>
        <button 
          onClick={() => navigate('/dashboard/create')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + New Donation
        </button>
      </div>

      <div className="grid gap-4">
        {mockDonations.map((donation) => (
          <div key={donation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">Donation #{donation.id}</h3>
                <p className="text-gray-600">
                  Created: {new Date(donation.submittedDate).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(donation.status)}`}>
                {donation.status}
              </span>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-600">
                <strong>To:</strong> {donation.recipient.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Items:</strong> {donation.items.map(item => `${item.quantity} ${item.name}`).join(', ')}
              </p>
            </div>

            <div className="flex gap-2">
              {canTrack(donation.status) && (
                <button
                  onClick={() => navigate(`/dashboard/track/${donation.id}`)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  📍 Track Live
                </button>
              )}
              <button
                onClick={() => navigate(`/dashboard/donations/${donation.id}`)} // For a detailed view
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationsListPage;