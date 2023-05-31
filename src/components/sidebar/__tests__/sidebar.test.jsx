import { render, screen} from "@testing-library/react";
import SidebarComponent from "../sidebar";


const username = 'TestUser';

const decks = [
    {
        cards: [],
        id: '1',
        title: 'Deck teste'
    }
];

const notebooks = [
    {
        notes: [],
        id: '1',
        title: 'Notebook teste'
    }
];

describe('SidebarComponent', () => {

    test('Renderiza o componente sidebar', () => {

        render(
            <SidebarComponent
                username={username}
                decks={decks}
                notebooks={notebooks}
            />
        );

        //TEsta a renderização dos componentes do sidebar 

        expect(screen.getByText('TestUser')).toBeInTheDocument();

    });



})
