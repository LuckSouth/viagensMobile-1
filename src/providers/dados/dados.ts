import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageProvider } from "../../providers/storage/storage";

@Injectable()
export class DadosProvider {

  constructor(public http: HttpClient,
    public storage: StorageProvider) {
  }

  private baseURI: string = "http://192.168.10.152/";
  public hideForm: boolean = false;

  despesas(motorista: string, despesas: string, data: string, valor: string, opcional?: boolean) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "despesas", "despesas": despesas, "motorista": motorista, "data": data, "valor": valor },
      url: any = this.baseURI + "manage-data.php";


    try {
      console.log
      this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data: any) => {
          console.log(data)
          // Se a requisição for um sucesso notifique o usuário
          this.hideForm = true;


        },
        (error: any) => {

          if (error.statusText == "OK") {
            console.log("Não tá inserindo, seu merda")
            this.storage.delete(this.storage.chaveDespesas);
            this.storage.listaDespesas = [];
          } else {
            console.log('Mais tu é burro, óh');

            if (opcional != true) {
              this.storage.adicionarDespesas()
            }
          }

        });
    } catch (error) {
      console.log('catch')
    }

  }
  senha: any[] = ["vazio"];
  login(usuario: string, senha: string) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "usuario": usuario, "senha": senha },
      url: any = this.baseURI + "login.php";


    try {
      console.log
      this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data: any) => {
          console.log(data)
          // Se a requisição for um sucesso notifique o usuário
          this.hideForm = true;
          this.senha = data

        },
        (error: any) => {

          console.log(error)

        });
    } catch (error) {
      console.log('catch')
    }


  }

  abastecimento(
    motorista: string,
    tipoPosto: string,
    posto: string,
    data: string,
    tipoPagamento: string,
    odometro: string,
    litrosBomba1: string,
    precoBomba1: string,
    litrosBomba2: string,
    precoBomba2: string,
    opcional?: boolean

  ) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "abastecimento",
        "motorista": motorista,
        "tipoPosto": tipoPosto,
        "data": data,
        "tipoPagamento": tipoPagamento,
        "odometro": odometro,
        "litrosBomba1": litrosBomba1,
        "precoBomba1": precoBomba1,
        "litrosBomba2": litrosBomba2,
        "precoBomba2": precoBomba2
      },
      url: any = this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        console.log(data)
        // Se a requisição for um sucesso notifique o usuário
        console.log(data)
        this.hideForm = true;
      },
      (error: any) => {
        if (error.statusText == "OK") {
          console.log("fazer nada")
          this.storage.delete(this.storage.chaveAbastecimento);
          this.storage.listaAbastecimento = [];
        } else {
          console.log('tratar erros');

          if (opcional != true) {
            this.storage.adicionarAbastecimento()
          }
        }
      });
  }

  arla(
    motorista: string,
    tipoPosto: string,
    posto: string,
    data: string,
    formaPagamento: string,
    km: string,
    litros: string,
    preco: string,
    opcional?: boolean

  ) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "arla",
        "motorista": motorista,
        "tipoPosto": tipoPosto,
        "data": data,
        "formaPagamento": formaPagamento,
        "km": km,
        "litros": litros,
        "preco": preco

      },
      url: any = this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        console.log(data)
        // Se a requisição for um sucesso notifique o usuário
        console.log(data)
        this.hideForm = true;
      },
      (error: any) => {
        if (error.statusText == "OK") {
          console.log("fazer nada")
          this.storage.delete(this.storage.chaveArla);
          this.storage.listaArla = [];
        } else {
          console.log('rghj')
          //if (opcional != true) {
            this.storage.adicionarArla()
          //}
        }
      });
  }



  receitas(
    fornecedorDestino,
    produto,
    tipoPagmt,
    opcional?: boolean
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "receitas",
        "fornecedorDestino": fornecedorDestino,
        "produto": produto,
        "tipoPagmt": tipoPagmt,
      },
      url: any = this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        console.log(data)
        // Se a requisição for um sucesso notifique o usuário
        console.log(data)
        this.hideForm = true;
      },
      (error: any) => {
        if (error.statusText == "OK") {
          console.log("fazer nada")
          this.storage.delete(this.storage.chaveReceitas);
          this.storage.listaReceitas = [];
        } else {
          console.log('tratar erros');
          if (opcional != true) {
            this.storage.adicionarReceitas()
          }
        }
      });
  }




}
