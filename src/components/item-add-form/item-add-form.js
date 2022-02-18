import React, {Component} from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: ""
    };

    onLabelChange = (e) => { // в e упадет событие
        //console.log(e.target); // вернет элемент input
        //console.log(e.target.value); // вернет введенный текст input
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault(); // Отменяет действие по умолчанию в данном случае перезагрузку страницы
        if(this.state.label.trim() === '') return;
        this.props.onItemAdded(this.state.label);
        this.setState({ label: '' });
    };

    render(){
        return (
            <form className="item-add-form d-flex"
                    onSubmit={this.onSubmit}>
                <input type="text"
                        className="form-control"
                        onChange={this.onLabelChange}
                        placeholder="Что нужно сделать"
                        value={this.state.label}/>
                <button
                    className="btn btn btn-outline-secondary">Добавить
                </button>
            </form>
        )
    }
}
