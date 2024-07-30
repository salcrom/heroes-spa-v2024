import { MemoryRouter, useNavigate } from "react-router-dom";
import { Navbar } from "../../../src/ui";
import { AuthContext } from "../../../src/auth";
import { fireEvent, render, screen } from "@testing-library/react";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en el <Navbar />", () => {
    const contextValue = {
        logged: true,
        user: { id: "ABC", name: "Sergio" },
        logout: jest.fn(),
    };

    beforeEach(() => jest.clearAllMocks());

    test("debe de mostrar el nombre del usuario", () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // screen.debug();
        expect(screen.getByText("Sergio")).toBeTruthy();
    });

    test("debe de llamar el logout y navigate cuando se hace click en el botón de logout", () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole("button");
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {
            replace: true,
        });
    });
});
