import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import SharedNoteEditor from "../sharedNoteEditor";

const selectedSharedNoteIndex = 'UMqtfvhsJO1DBYZo6dwS';

describe('SharedNoteEditorComponent', () => {

    test('Renderiza a nota compartilhada', () => {
        render(
            <SharedNoteEditor
                selectedSharedNoteIndex={selectedSharedNoteIndex}
                />
        );

        // Testa a renderização da nota 
        expect(screen.getByText('Título da nota compartilhada:')).toBeInTheDocument();

        // Render do título da nota
        expect(screen.getByPlaceholderText('Título da nota')).toBeInTheDocument();
    });

    test('Atualiza o título corretamente', () => {
        const { getByPlaceholderText } = 
            render(
                <SharedNoteEditor
                    selectedSharedNoteIndex={selectedSharedNoteIndex}
                    />
            );

        const titleInput = getByPlaceholderText('Título da nota');
        fireEvent.change(titleInput, {target: {value: 'New Title'}});

        expect(titleInput.value).toBe('New Title');

    });

    test('Chama o closeSharedNote corretamente', () => {
        const closeNoteMock = jest.fn();
        const {getByTestId} = render(
            <SharedNoteEditor
                closeSharedNote={closeNoteMock}
                selectedSharedNoteIndex={selectedSharedNoteIndex}
            />
        );
        const closeButton = getByTestId('close-button');

        fireEvent.click(closeButton);

        expect(closeNoteMock).toHaveBeenCalled();
    });

    test('Chama o selectChat corretamente para abrir chat', () => {
        const selectChatMock = jest.fn();
        const {getByTestId} = render(
            <SharedNoteEditor
                selectChat={selectChatMock}
                selectedSharedNoteIndex={selectedSharedNoteIndex}
            />
        );
        const chatButton = getByTestId('chat-button');

        fireEvent.click(chatButton);

        expect(selectChatMock).toHaveBeenCalled();
    })




});