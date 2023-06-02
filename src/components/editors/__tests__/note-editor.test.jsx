import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import NoteEditorComponent from "../note-editor";
import { Timestamp } from "firebase/firestore";

const selectedNotebookIndex = '1';

const selectedNote = {
    body: '<p>Corpo da nota teste</p>',
    id: '10',
    timestamp: Timestamp.fromDate(new Date()),
    title: '',
};

describe('NoteEditorComponent', () => {

    test('Renderiza a note', () => {
        render(
            <NoteEditorComponent
                selectedNote={selectedNote}
                selectedNotebookIndex={selectedNotebookIndex}
            />
        );

        // Testa a renderização da nota
        expect(screen.getByText('Título da nota:')).toBeInTheDocument();
        // Render do título da nota
        expect(screen.getByPlaceholderText('Título da nota')).toBeInTheDocument();

    });

    test('Atualiza o título corretamente', () => {

        const {getByPlaceholderText} = 
            render(
                <NoteEditorComponent
                    selectedNote={selectedNote}
                    selectedNotebookIndex={selectedNotebookIndex}
                />
            );

        const titleInput = getByPlaceholderText('Título da nota');
        fireEvent.change(titleInput, {target: {value: 'New Title'}});

        expect(titleInput.value).toBe('New Title');
    });

    test('Chama o closeNote corretamente', () => {
        const closeNoteMock = jest.fn();
        const {getByTestId} = render(
            <NoteEditorComponent
                selectedNote={selectedNote}
                selectedNotebookIndex={selectedNotebookIndex}
                closeNote={closeNoteMock}
                />
        );

        const closeButton = getByTestId('close-icon');

        fireEvent.click(closeButton);

        expect(closeNoteMock).toHaveBeenCalled();
    });

});