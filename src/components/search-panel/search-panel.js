import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        term: ''
    }

    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearchChange(term);
    };

    render(){
        return (
            <span className="form-group has-search">
                <span className="fa fa-search form-control-feedback"/>
                <input type="search"
                       className="form-control search-input"
                       placeholder="Поиск"
                       onChange={this.onSearchChange}
                       value={this.state.term} />
            </span>
        );
    }
}