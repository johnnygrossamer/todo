import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 10;

    state = {
        todoData: [
            this.createTodoItem('Составить список дел')
        ],
        term: '',
        filter: 'all' // active, all, done
    };

    loadTodoData(){
        const todoData = JSON.parse( localStorage.getItem('todoData') );
        if (Array.isArray(todoData)){
            const arrId = todoData.map((todoItem) => todoItem.id);
            this.maxId = Math.max(...arrId) + 1;
            this.setState({
                todoData: todoData
            });
        }
    }
    saveTodoData(data){
        localStorage.setItem('todoData', JSON.stringify(data));
    }
    componentDidMount(){
        window.addEventListener("storage", (e) => this.loadTodoData());
        this.loadTodoData();
    }

    createTodoItem(label){
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        };
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            this.saveTodoData(newArray);

            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
            const newArr = [
                ...todoData,
                newItem
            ];

            this.saveTodoData(newArr);

            return {
                todoData: newArr
            };
        });
    };

    toggleProperty(arr, id, propName){
        const idx = arr.findIndex((el) => el.id === id);

        const newArray = [...arr];
        newArray[idx][propName] = !newArray[idx][propName];

        return {
            todoData: newArray
        };
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return this.toggleProperty(todoData, id, 'important');
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return this.toggleProperty(todoData, id, 'done');
        });
    };

    onSearchChange = (term) => {
        this.setState({ term });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    search = (items, term) => {
        if (term.length === 0) return items;

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    filter = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    render(){

        const {todoData, term, filter} = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }
};
