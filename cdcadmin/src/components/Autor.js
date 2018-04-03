import React, { Component } from 'react';
import InputCustomizado from './InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' }
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        const URL = 'https://reactclass1.herokuapp.com/api/autor'
        let dados = { nome: this.state.nome, email: this.state.email, senha: this.state.senha };
        fetch(URL, { method: 'POST', body: JSON.stringify(dados) })
            .then(response => response.json())
            .then(novaListagem => {
                PubSub.publish('atualiza-lista-autores', novaListagem);
                this.setState({nome: '', email: '', senha: ''});
                PubSub.publish('limpa-erros', {});
            })
            .catch(err => {
                if(err.status === 400){
                    new TratadorErros().publicaErros(err.responseJSON);
                }
            });
    }

    SalvaAlteracao(inputName, evento){
        let campo = {};
        campo[inputName] = evento.target.value;
        this.setState(campo);
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Autores</h1>
                </div>
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} >
                    <InputCustomizado id="nome" type="text" name="Nome" value={this.state.nome} onChange={this.SalvaAlteracao.bind(this, 'nome')} />
                    <InputCustomizado id="email" type="email" name="E-mail" value={this.state.email} onChange={this.SalvaAlteracao.bind(this, 'email')} />
                    <InputCustomizado id="senha" type="password" name="Senha" value={this.state.senha} onChange={this.SalvaAlteracao.bind(this, 'senha')} />
                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary" >Gravar</button>
                    </div>
                </form>

                </div>
            </div>
        );
    }
};


class TabelaAutor extends Component {
    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map((autor, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
};

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

    componentDidMount() { // Depois de carregar o componente    
        const URL = 'https://reactclass1.herokuapp.com/api/autor'
        fetch(URL)
            .then(response => response.json())
            .then(result => {
                this.setState({ lista: result });
            })
            .catch(err => {
                if(err.status === 400){
                    new TratadorErros().publicaErros(err.responseJSON);
                }
            });

        PubSub.subscribe('atualiza-lista-autores', function (topico, novaListagem) {
            this.setState({ lista: novaListagem });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <FormularioAutor />
                <TabelaAutor lista={this.state.lista} />
            </div>
        );
    }
}