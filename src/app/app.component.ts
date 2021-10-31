import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public formContatoPrincipal: FormGroup;
  public cliente = {
    nome: 'Teste Bla',
    contatos: [{
      contatoAdicionalId: 1,
      nome: 'Teste',
      telefoneResidencial: '4333221122',
      telefoneComercial: '',
      telefoneCelular1: '43966558855',
      telefoneCelular2: '',
      whatsapp: '43966558855',
      email: 'teste01@irtrade.com.br',
      contatoAdicional: false,
      contatoAdicionalPrioridade: 1
    },
      {
      contatoAdicionalId: 2,
      nome: 'Teste 2',
      telefoneResidencial: '4333221144',
      telefoneComercial: '',
      telefoneCelular1: '43966558899',
      telefoneCelular2: '',
      whatsapp: '43966558899',
      email: 'teste02@irtrade.com.br',
      contatoAdicional: true,
      contatoAdicionalPrioridade: 2
    },
    {
      contatoAdicionalId: 3,
      nome: 'Teste 3',
      telefoneResidencial: '4333221155',
      telefoneComercial: '',
      telefoneCelular1: '43966558877',
      telefoneCelular2: '',
      whatsapp: '43966558877',
      email: 'teste03@irtrade.com.br',
      contatoAdicional: true,
      contatoAdicionalPrioridade: 3
    }]
  };

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.gerarFormularioContatoPrincipal();
    this.gerarFormularioContatosAdicionais();
    this.popularFormularioContatoPrincipal();
    this.popularFormularioContatosAdicionais();
  }

  private gerarFormularioContatoPrincipal(): void {
    this.formContatoPrincipal = this.formBuilder.group({
      contatoAdicionalId: [null],
      nome: [null],
      telefoneResidencial: [null],
      telefoneCelular1: [null],
      email: [null],
      contatos: this.formBuilder.array([])
    });
  }

  private gerarFormularioContatosAdicionais(): void {    
    const dados = this.formContatoPrincipal.controls.contatos as FormArray;
    this.cliente.contatos?.forEach(contato => {
      if(contato?.contatoAdicional){
        dados.push(this.gerarContatoAdicional());
      }      
    });
  }

  gerarContatoAdicional(): FormGroup {
    return new FormGroup({ 
      'contatoAdicionalId' : new FormControl(''),
      'nome' : new FormControl(''),
      'telefoneResidencial' : new FormControl(''),
      'telefoneComercial' : new FormControl(''),
      'telefoneCelular1' : new FormControl(''),
      'telefoneCelular2' : new FormControl(''),
      'whatsapp' : new FormControl(''),
      'email' : new FormControl(''),
   });
  }

  private popularFormularioContatoPrincipal(): void{
    let contatoPrincipal = this.cliente.contatos?.find(w => w.contatoAdicional == false);
    this.formContatoPrincipal.controls.contatoAdicionalId.setValue(contatoPrincipal.contatoAdicionalId);
    this.formContatoPrincipal.controls.nome.setValue(contatoPrincipal.nome);
    this.formContatoPrincipal.controls.telefoneResidencial.setValue(contatoPrincipal.telefoneResidencial);
    this.formContatoPrincipal.controls.telefoneCelular1.setValue(contatoPrincipal.telefoneCelular1);
    this.formContatoPrincipal.controls.email.setValue(contatoPrincipal.email);
  }

  private popularFormularioContatosAdicionais(): void {
    let index = 0;
    let contatosAdicionais = this.cliente.contatos?.filter(w => w.contatoAdicional);
    contatosAdicionais.forEach(contato => {
      this.formContatoPrincipal.get('contatos').get(index.toString()).get('contatoAdicionalId').setValue(contato.contatoAdicionalId);
      this.formContatoPrincipal.get('contatos').get(index.toString()).get('nome').setValue(contato.nome);
      this.formContatoPrincipal.get('contatos').get(index.toString()).get('telefoneResidencial').setValue(contato.telefoneResidencial);
      this.formContatoPrincipal.get('contatos').get(index.toString()).get('telefoneComercial').setValue(contato.telefoneComercial);
      this.formContatoPrincipal.get('contatos').get(index.toString()).get('telefoneCelular1').setValue(contato.telefoneCelular1);
      this.formContatoPrincipal.get('contatos').get(index.toString()).get('telefoneCelular2').setValue(contato.telefoneCelular2);
      this.formContatoPrincipal.get('contatos').get(index.toString()).get('whatsapp').setValue(contato.whatsapp);
      this.formContatoPrincipal.get('contatos').get(index.toString()).get('email').setValue(contato.email);
      index++;
    });
  }

  contatos(): FormArray {
    return this.formContatoPrincipal.controls.contatos as FormArray;
  }
}
