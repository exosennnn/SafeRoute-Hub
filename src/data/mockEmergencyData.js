// Mock data for SafeRoute Hub

export const mockFloodZones = [
  {
    id: 1,
    name: "Low-Lying Riverside Area",
    riskLevel: "High",
    depth: "1.5m - 2m",
    coordinates: [
      [14.3350, 120.9300],
      [14.3380, 120.9340],
      [14.3320, 120.9390],
      [14.3280, 120.9330]
    ]
  },
  {
    id: 2,
    name: "Market District Zone",
    riskLevel: "Moderate",
    depth: "0.5m - 1m",
    coordinates: [
      [14.3240, 120.9400],
      [14.3270, 120.9450],
      [14.3220, 120.9480],
      [14.3190, 120.9420]
    ]
  }
];

export const mockEvacuationCenters = [
  {
    id: 1,
    name: "Central Community Gymnasium",
    address: "Brgy. Zone IV, Dasmariñas City",
    contact: "+63 (46) 416-0001",
    lat: 14.3310,
    lng: 120.9350,
    currentOccupants: 320,
    maxCapacity: 500,
    status: "Available"
  },
  {
    id: 2,
    name: "Vocational School Auditorium",
    address: "Governor's Drive, Dasmariñas",
    contact: "+63 (46) 416-0002",
    lat: 14.3215,
    lng: 120.9380,
    currentOccupants: 485,
    maxCapacity: 500,
    status: "Critical / Full"
  },
  {
    id: 3,
    name: "Barangay Covered Court East",
    address: "Salitran Proper, Dasmariñas",
    contact: "+63 (46) 416-0003",
    lat: 14.3400,
    lng: 120.9280,
    currentOccupants: 110,
    maxCapacity: 300,
    status: "Available"
  }
];

export const mockCheckpoints = [
  {
    id: 1,
    name: "North Bridge Rescue Post",
    lat: 14.3365,
    lng: 120.9320,
  },
  {
    id: 2,
    name: "Main Highway Relief Checkpoint",
    lat: 14.3250,
    lng: 120.9430,
  }
];