import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import { BorderColor } from '@mui/icons-material';
import { withStyles } from '@mui/styles';
import styles from '../componentStyles'
import { Typography } from '@mui/material';

class EditorComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            title: '',
            id: '',
        };
    }

    componentDidMount = () => {
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id,
        });
    }

    componentDidUpdate = () => {
        if (this.props.selectedNote.id !== this.state.id) {
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id,
            });
        }
    }

    render() {

        const { classes } = this.props;
        return (
            <div className={classes.EditorComponent}>
                <div className={classes.editorNavbar}>
                    <BorderColor />
                    <input
                        className={classes.titleInput}
                        placeholder='Note title...'
                        value={this.state.title ? this.state.title : ''}
                        onChange={(e) => this.updateTitle(e.target.value)}>
                    </input>
                </div>
                <ReactQuill
                    theme={"snow"}
                    modules={this.modules}
                    formats={this.formats}
                    value={this.state.text}
                    onChange={this.updateBody}>
                </ReactQuill>
            </div>);
    }
    updateBody = async (val) => {
        await this.setState({ text: val });
        this.update();
    };

    updateTitle = async (txt) => {
        await this.setState({ title: txt });
        this.update();
    }

    // função de atualização do banco de dados quando o usuário fica 1500 segundo sem alterar a nota
    update = debounce(() => {
        this.props.noteUpdate(this.state.id, {
            title: this.state.title,
            body: this.state.text,
        })
    }, 1500);
}

export default withStyles(styles)(EditorComponent);