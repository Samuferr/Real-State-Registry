import React, {Component} from 'react';
import {StyleSheet, ScrollView } from 'react-native';
import Properties from '../components/Properties';
import { DevSettings } from 'react-native';
import {
  NativeBaseProvider,
  Text
} from 'native-base';
import Data from '../dataBase/Data';
import Immobile from '../model/Immobile';

export default class List extends Component {
    // Iniciação dos nossos states
    constructor(props) {
      super(props);
      this.state = {
        endereco: "",
        finalidade: "",
        tipo: "",
        valor: "",
        imagem: "",
        imoveis: []
      }
      this.imoveis = []
      this.listar()
    }

    // Métodos com persistencia no banco
    listar() {
      const db = new Data();
      db.listar().then(data => {
        this.setState({imoveis: data})
      })
    }

    cadastrar(endereco, finalidade, tipo, valor, imagem) {
      const db = new Data();
      const imovel = new Immobile(endereco, finalidade, tipo, valor, imagem);
      db.adicionar(imovel);
      DevSettings.reload();
    }

    remover(id) {
      const db = new Data();
      db.deletar(id).then(data => {
        DevSettings.reload();
      })
    }

    takePicture = async () => {
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        console.log(data.uri);
        this.setState({ imagem: data.uri })
      }
    };
    render() {
        return(
            <NativeBaseProvider  >   

                <Text alignSelf="center">LISTA DE IMOVÉIS</Text>

                <ScrollView margin={8}> 
                  {this.state.imoveis.map(imovel => (
                    <Properties key={imovel.id} id={imovel.id} endereco={imovel.endereco} finalidade={imovel.finalidade} tipo={imovel.tipo} valor={imovel.valor} imagem={imovel.imagem} excluir={this.remover}></Properties>
                  ))}
                </ScrollView>
            </NativeBaseProvider>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview: {
    height: 20,
    width: 100
  },
  capture: {
    flex: 0,
    backgroundColor: '#00ff99',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});