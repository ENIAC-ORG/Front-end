import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom"; // Added MemoryRouter for testing routing
import CompleteInfo from "../../components/CompleteInfoModal/Complete_Info.jsx"; // Path to the component file
import axios from "axios";
import { ToastContainer } from "react-toastify"; // Toast notifications container

// Mock the axios requests to prevent actual network calls during testing
jest.mock("axios");

describe("CompleteInfo Component", () => {
  // Reset mocks between tests
  beforeEach(() => {
    axios.post.mockClear();
    axios.get.mockClear();
  });

  it("renders the initial form correctly", () => {
    render(
      <MemoryRouter>
        <CompleteInfo doctorId={1} />
        <ToastContainer />
      </MemoryRouter>
    );

    // Check if fields are rendered
    expect(screen.getByPlaceholderText("نام")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("نام خانوادگی")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("شماره تماس")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("تاریخ تولد")).toBeInTheDocument();
    expect(screen.getByText("رزرو نوبت")).toBeInTheDocument();
  });

  it("loads user info on mount", async () => {
    // Mocking a successful API response for GET request
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        user: {
          firstname: "علی",
          lastname: "رضایی",
          phone_number: "09123456789",
          gender: "M",
          date_of_birth: "1990-01-01",
        },
      },
    });

    render(
      <MemoryRouter>
        <CompleteInfo doctorId={1} />
        <ToastContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Check if fields are populated with the user info
      expect(screen.getByDisplayValue("علی")).toBeInTheDocument();
      expect(screen.getByDisplayValue("رضایی")).toBeInTheDocument();
      expect(screen.getByDisplayValue("09123456789")).toBeInTheDocument();
      expect(screen.getByDisplayValue("مرد")).toBeInTheDocument();
    });
  });

  it("shows error if form validation fails", async () => {
    render(
      <MemoryRouter>
        <CompleteInfo doctorId={1} />
        <ToastContainer />
      </MemoryRouter>
    );

    const submitButton = screen.getByText("رزرو نوبت");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("!وارد کردن نام خانوادگی الزامی است")).toBeInTheDocument();
      expect(screen.getByText("!وارد کردن شماره تلفن الزامی است")).toBeInTheDocument();
    });
  });

  it("shows toast if information is already submitted", async () => {
    // Mock a successful submit request
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter>
        <CompleteInfo doctorId={1} />
        <ToastContainer />
      </MemoryRouter>
    );

    // Fill out the form with valid data
    userEvent.type(screen.getByPlaceholderText("نام"), "علی");
    userEvent.type(screen.getByPlaceholderText("نام خانوادگی"), "رضایی");
    userEvent.type(screen.getByPlaceholderText("شماره تماس"), "09123456789");
    userEvent.click(screen.getByText("مرد"));
    userEvent.click(screen.getByText("ارسال"));

    // Check if the success message is shown
    await waitFor(() => {
      expect(screen.getByText("!اطلاعات شما با موفقیت ثبت شد")).toBeInTheDocument();
    });
  });

  it("sends valid data to the backend when form is submitted", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter>
        <CompleteInfo doctorId={1} />
        <ToastContainer />
      </MemoryRouter>
    );

    // Fill out form with valid data
    userEvent.type(screen.getByPlaceholderText("نام"), "علی");
    userEvent.type(screen.getByPlaceholderText("نام خانوادگی"), "رضایی");
    userEvent.type(screen.getByPlaceholderText("شماره تماس"), "09123456789");
    userEvent.click(screen.getByText("مرد"));
    userEvent.click(screen.getByText("ارسال"));

    // Wait for the POST request to finish
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://127.0.0.1:8000/accounts/complete_info/",
        {
          firstname: "Ali",
          lastname: "Rezaei",
          phone_number: "09123456789",
          date_of_birth: "1990-01-01",
          gender: "M",
        },
        expect.anything() // Ensures that the request is made with headers
      );
    });
  });

  it("shows error toast if API fails during submission", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <CompleteInfo doctorId={1} />
        <ToastContainer />
      </MemoryRouter>
    );

    userEvent.type(screen.getByPlaceholderText("نام"), "علی");
    userEvent.type(screen.getByPlaceholderText("نام خانوادگی"), "رضایی");
    userEvent.type(screen.getByPlaceholderText("شماره تماس"), "09123456789");
    userEvent.click(screen.getByText("مرد"));
    userEvent.click(screen.getByText("ارسال"));

    // Wait for the error toast to show
    await waitFor(() => {
      expect(screen.getByText("!خطا هنگام ارسال درخواست")).toBeInTheDocument();
    });
  });

  it("displays an error when date of birth is in the future", async () => {
    render(
      <MemoryRouter>
        <CompleteInfo doctorId={1} />
        <ToastContainer />
      </MemoryRouter>
    );

    userEvent.type(screen.getByPlaceholderText("نام"), "علی");
    userEvent.type(screen.getByPlaceholderText("نام خانوادگی"), "رضایی");
    userEvent.type(screen.getByPlaceholderText("شماره تماس"), "09123456789");

    // Set future date of birth
    fireEvent.change(screen.getByPlaceholderText("تاریخ تولد"), { target: { value: "2030-01-01" } });

    userEvent.click(screen.getByText("ارسال"));

    await waitFor(() => {
      expect(screen.getByText("!تاریخ تولد اشتباه است")).toBeInTheDocument();
    });
  });

  it("renders modal correctly and closes it when clicking 'بستن'", () => {
    render(
      <MemoryRouter>
        <CompleteInfo doctorId={1} />
        <ToastContainer />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText("رزرو نوبت"));
    expect(screen.getByText("تکمیل اطلاعات")).toBeInTheDocument();

    // Close the modal
    userEvent.click(screen.getByText("بستن"));
    expect(screen.queryByText("تکمیل اطلاعات")).not.toBeInTheDocument();
  });
});
