import { render, screen } from "@testing-library/react";
import DateComponent from "../date-component";

describe('DateComponent', () => {
    
    test('Renderiza corretamente a data', () => {

        render(
            <DateComponent date={new Date()}/>
        );

        expect(screen.getByTestId('data')).toBeInTheDocument();

    });



});