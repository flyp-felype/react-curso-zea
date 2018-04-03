import React, { Component } from 'react';
import InputCustomizado from './InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioLivro extends Component {
    constructor() {
        super();
        this.state = { titulo: '', preco: '', autorId: '' }
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        const URL = 'https://reactclass1.herokuapp.com/api/livro'
        let dados = { titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId };
        fetch(URL, { method: 'POST', body: JSON.stringify(dados) })
            .then(response => response.json())
            .then(novaListagem => {
                PubSub.publish('atualiza-lista-livros', novaListagem);
                this.setState({ titulo: '', preco: '', autorId: '' });
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
                    <h1>Livros</h1>
                </div>
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} >
                <div className="pure-control-group">
                    <InputCustomizado id="titulo" type="text" name="Titulo" value={this.state.titulo} onChange={this.SalvaAlteracao.bind(this, 'nome')} />
                    <InputCustomizado id="preco" type="text" name="Preço" value={this.state.preco}  onChange={this.SalvaAlteracao.bind(this, 'preco')}  />
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>
                    <select name="autorId" onChange={this.setAutorId}>
                        <option value="">Selecione o Autor</option>
                        {
                            this.props.autores.map(function(autor){
                                return <option value={autor._id} key={autor._id}>{autor.nome}</option>
                            })
                        }
                    </select>

                    </div>
                        <button type="submit" className="pure-button pure-button-primary" >Gravar</button>
                    </div>
                </form>

                </div>
            </div>
        );
    }
};

class TabelaLivro extends Component {
    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map((livro, index) => {
                                return (
                                    <tr key={index}>
                                    
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor.nome}</td>
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

export default class LivroBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] , autores:[]};
    }

    componentDidMount() { // Depois de carregar o componente    
        const URL = 'https://reactclass1.herokuapp.com/api/livro'
        fetch(URL)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({ lista: result });
            })
            .catch(err => {
                if(err.status === 400){
                    new TratadorErros().publicaErros(err.responseJSON);
                }
            });

        PubSub.subscribe('atualiza-lista-livros', function (topico, novaListagem) {
            this.setState({ lista: novaListagem });
        }.bind(this));


        const URL2 = 'https://reactclass1.herokuapp.com/api/autor'
        fetch(URL2)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({ autores: result });
            })
            .catch(err => {
                if(err.status === 400){
                    new TratadorErros().publicaErros(err.responseJSON);
                }
            });

        PubSub.subscribe('atualiza-lista-livros', function (topico, novaListagem) {
            this.setState({ lista: novaListagem });
        }.bind(this));
    }


    render() {
        return (
            <div>
                <FormularioLivro autores={this.state.autores} />
                <TabelaLivro lista={this.state.lista} />
            </div>
        );
    }
}