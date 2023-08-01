//função assíncrona responsavel por buscar o endereço com base no cep;
async function buscar_cep(cep) {

    //seta falsa para  a mensagem de erro(reseta o conteudo da mensagem);
    exibir_mensagem_de_erro_cep(false, '');

    try { //nota: tentar

        //faz uma promise utilizando o fetch
        const consultarCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        //traz e converte a resposta da promisse(consultar cep) em formato JSON;
        const resposta = await consultarCep.json();
        //preenche os campos de acordo com a respota
        preencher_campos(resposta);
    } 
    catch (erro) {
        //retorna erros
        exibir_mensagem_de_erro_cep(true, cep);
        console.log(erro);
    }
} 

function exibir_mensagem_de_erro_cep(condicao, cep) {

    //elemento onde será exibido o erro
    const caixa_de_erro = document.getElementById('erro');

    //seta a mensagem de erro de acordo com o valor da condição
    //operador ternário data = (condicao)? true : false;
    caixa_de_erro.innerHTML = (condicao) ? `<p>O cep: ${cep} é inválido</p>` : '';

}

//função responsavel por preencher os campos de acordo com as informação
//da api via cepi
function preencher_campos(dados) {
    console.log(dados);
    //importando campos e preenchendo campos
    const cidade = document.getElementById('cidade').value = dados.localidade;
    const estado = document.getElementById('estado').value = dados.uf;
    const logradouro = document.getElementById('endereco').value = dados.logradouro;

}

//verifica se o campo do cep foi selecionado
const campo_cep = document.getElementById('cep');
//adicona um escutador de eventos do tipo focusout(quando o foco for retirado);
campo_cep.addEventListener('focusout', () => {
    buscar_cep(campo_cep.value);
});

// let ceps = ['76420-000', '76420-000'];
// let conjuntoCep = ceps.map( valores => buscaEndereco(valores));
// Promise.all(conjuntoCep).then( res => console.log(res))