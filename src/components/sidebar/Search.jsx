import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

// Componente principal
const SearchBox = ({ notes, cards, select }) => {
    const [searchResults, setSearchResults] = useState([]);

    // Função para pesquisar itens com base no valor digitado
    const searchItems = (value) => {
        const results = [ ...notes, ...cards].filter((item) =>
            item && item.title && item.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(results);
    };



    return (
        <Autocomplete
            options={searchResults}
            getOptionLabel={(item) => item.title}
            onChange={(event, value) => select(value)} // Chame a função 'select' quando um item for selecionado
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Pesquisar"
                    onChange={(event) => searchItems(event.target.value)} // Chame a função 'searchItems' ao alterar o valor da caixa de texto
                />
            )}
        />
    );
}

export default SearchBox;