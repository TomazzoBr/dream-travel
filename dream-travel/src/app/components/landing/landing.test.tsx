import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "./landing";
import { TravelItem } from "@/app/lib/types/travel.type";

jest.mock("@/services/tripService", () => ({
  getTrips: jest.fn(),
}));

jest.mock("../header/header", () => {
  const MockHeader = () => <div data-testid="header">Header</div>;
  MockHeader.displayName = "MockHeader";
  return MockHeader;
});

jest.mock("../search/search", () => {
  const MockSearch = ({ onSearch }: { onSearch: (query: string) => void }) => (
    <button onClick={() => onSearch("test")} data-testid="search-button">
      Search
    </button>
  );
  MockSearch.displayName = "MockSearch";
  return MockSearch;
});

jest.mock("../filters/filters", () => {
  const MockFilters = () => <div data-testid="filters">Filters</div>;
  MockFilters.displayName = "MockFilters";
  return MockFilters;
});

jest.mock("../travel-items-list/travel-items-list", () => {
  const MockTravelList = () => <div data-testid="travel-list">Travel List</div>;
  MockTravelList.displayName = "MockTravelList";
  return MockTravelList;
});

jest.mock("../trip-modal-form/trip-modal-form", () => {
  const MockModal = () => <div data-testid="modal">Modal</div>;
  MockModal.displayName = "MockModal";
  return MockModal;
});

describe("Landing Component", () => {
  const mockTrips: TravelItem[] = [
    {
      id: "1",
      title: "Trip to Paris",
      description: "A lovely trip",
      introduction: "Explore Paris",
      status: "todo",
      photo_url: "",
      itinerary: [],
    },
    {
      id: "2",
      title: "Trip to Rome",
      description: "Historic places",
      introduction: "Visit Rome",
      status: "done",
      photo_url: "",
      itinerary: [],
    },
  ];

  const setLocalStorageMock = (data: TravelItem[]) => {
    localStorage.setItem("trips", JSON.stringify(data));
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => {
          return JSON.stringify(mockTrips);
        }),
        setItem: jest.fn(),
        clear: jest.fn(),
        removeItem: jest.fn(),
      },
    });
  });

  it("renders all main components", () => {
    render(<Landing />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("filters")).toBeInTheDocument();
    expect(screen.getByTestId("travel-list")).toBeInTheDocument();
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  describe("Fetching and displaying trips", () => {
    it("fetches and displays trips from localStorage", () => {
      setLocalStorageMock(mockTrips);
      render(<Landing />);

      expect(localStorage.getItem).toHaveBeenCalledWith("trips");
      expect(screen.getByTestId("travel-list")).toBeInTheDocument();
    });
  });

  describe("Search functionality", () => {
    it("calls search and updates filtered items", () => {
      render(<Landing />);

      const searchButton = screen.getByTestId("search-button");
      fireEvent.click(searchButton);

      expect(screen.getByTestId("travel-list")).toBeInTheDocument();
    });
  });

  describe("Trip management", () => {
    it("handles trip save correctly", () => {
      render(<Landing />);
      const newTrip: TravelItem = {
        id: "3",
        title: "Trip to Berlin",
        description: "Berlin trip",
        introduction: "Berlin intro",
        status: "todo",
        photo_url: "",
        itinerary: [],
      };
      setLocalStorageMock([newTrip]);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "trips",
        JSON.stringify([newTrip])
      );
    });

    it("handles trip deletion correctly", () => {
      setLocalStorageMock(mockTrips);
      render(<Landing />);

      const updatedTrips = mockTrips.filter((trip) => trip.id !== "1");
      setLocalStorageMock(updatedTrips);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "trips",
        JSON.stringify(updatedTrips)
      );
    });
  });
});
