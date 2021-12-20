import React, { Component } from "react";
import Axios from "axios";

import PageHeader from "../template/PageHeader";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const URL ='http://localhost:3000/api/todos'

export default class Todo extends Component {

    constructor(props){
        super(props)

        this.state = { description: '', list: [] }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)

        this.refresh()
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''
        Axios.get(`${URL}?sort=-createdAd${search}`).then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    handleSearch(){
        console.log();
        this.refresh(this.state.description)
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

    handleAdd(){
        const description = this.state.description
        console.log(description);
        Axios.post(URL, { description }).then(resp=> this.refresh())
    }

    handleRemove(todo){
        Axios.delete(`${URL}/${todo._id}`).then(resp => this.refresh(this.state.description))
    }

    handleMarkAsDone(todo){
        Axios.put(`${URL}/${todo._id}`, {...todo, done: true}).then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo){
        Axios.put(`${URL}/${todo._id}`, {...todo, done: false}).then(resp => this.refresh(this.state.description))
    }

    render(){
        return(
            <div>
                <PageHeader name='Tarefas' small="Cadastro"/>
                <TodoForm description={this.state.description} 
                    handleChange={this.handleChange} 
                    handleAdd={this.handleAdd} 
                    handleSearch={this.handleSearch} />
                <TodoList list={this.state.list} 
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    handleRemove={this.handleRemove} /> 
            </div>
        )
    }
}