import SignInForm from "@/components/sign-in-form";
import { render, fireEvent, waitFor } from "@testing-library/react";

test("renders the sign-in form correctly", () => {
    // Mock any dependencies
    // For example, you can mock useRouter using jest.mock('next/router');

    const { getByText, getByLabelText } = render(<SignInForm />);

    expect(getByText("Login")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByText("Sign In")).toBeInTheDocument();
});

test("submits the form with valid credentials", async () => {
    // Mock any necessary functions or dependencies
    // For example, mock signInWithEmailAndPassword function

    const { getByLabelText, getByText } = render(<SignInForm />);

    fireEvent.change(getByLabelText("Email"), {
        target: { value: "ahmadfahrezi.kl@gmail.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
        target: { value: "test12" },
    });

    fireEvent.click(getByText("Sign In"));

    // Add assertions to check if the form submission behaves as expected
    await waitFor(() => {
        // Add your assertions here based on the expected behavior after submitting the form.
    });
});
