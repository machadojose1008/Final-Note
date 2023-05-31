import { render, screen, waitFor } from "@testing-library/react";
import ChatComponent from "../chat";
import { Timestamp } from "firebase/firestore";
import InputComponent from "../input";

describe('ChatComponent', () => {

    test('Renderiza o chat', async () => {
        //Array mock para os testes 
        const email = 'teste@teste.com';
        const note = {
            id: '1',
            openned: 'false',
            email: ['jgbm81@hotmail.com', 'teste@teste.com'],
            body: '<p>Corpo da nota teste chat</p>',
            mensagens: [
                {
                    position: 'right',
                    text: 'teste do chat',
                    type: 'text',
                    title: 'teste@teste.com'
                }
            ],
            timestamp: Timestamp.fromDate(new Date()),
            title: 'Titulo da nota do teste chat'
        };

        render(
            <ChatComponent userEmail={email} selectedSharedNote={note} />
        );


        // Verifica se o chat renderizou
        expect(screen.getByText('Chat')).toBeInTheDocument();

        // Verifica se a message-list renderizou
        // Como as mensagens são renderizadas pelo message-list não precisa testar elas em si
        expect(screen.getByTestId('message-list')).toBeInTheDocument();


    });

    test('InputComponent', () => {

        render(<InputComponent  />)

        // Teste se renderiza o input
        expect(screen.getByPlaceholderText('Digite sua mensagem')).toBeInTheDocument();

    });

});

