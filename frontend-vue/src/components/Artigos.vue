<template>
    <div class="hello">

<form class="form">
  <p>
    <input type="text"
           placeholder="Insira o título"
            v-model="artigo.content">
  </p>
  <p>
    <textarea
              placeholder="Insira o seu conteudo"
              v-model="artigo.content">
    </textarea>
  </p>
  <input type="hidden"
         v-model ="artigo.id">
  <p>
    <button
        v-if="editar"
        class="primary"
        v-on:click="cadastrarArtigo">Editar</button>
    <button
        v-else
        class="success"
        v-on:click="cadastrarArtigo">Cadastrar</button>

  </p>

</form>
    </div>
    <div class="card"></div>
    <div class="post"
        v-for="artigo in artigos"
        v-bind:key="artigo.id">
        <h3> {{ artigo.content }}</h3>
    </div>
</template>

<script>
import api from "../services/api"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Artigos",
    data(){
        return{
            artigos: [],
            artigo: {
                id: '',
                content: '',
            }

        }
    },
    methods:{
    obterArtigos(){
        api.get("posts")
        .then(res=>  {
            this.artigos = res.data.data
        })
        .catch(err => console.log(err))
    }
},
created(){
    this.obterArtigos()
},

cadastrarArtigo(){
      if (this.editar === false){
        if(this.artigo.content === ''){
          alert("Preencha o titulo")
          return
        }

        api.post(`post/user/${18}`,{
              content: this.artigo.content
            })
            .then(res => res.json())
        alert('Dados cadastrados com sucesso!')
        this.obterArtigos()
        this.artigo.id = ''
        this.artigo.content = ''
      }else{
        api.put(`post/${this.artigo.id}`,{
              content: this.artigo.content
            })
            .then(res => res.json())
        alert('Dados atualizados com sucesso!')
        this.obterArtigos()
        this.artigo.id = ''
        this.artigo.content = ''
      }
    },
    deletarArtigo(id){
      if(confirm('Deseja deletar o artigo de id' + id)){
        api.delete(`post/${id}`)
            .then(res => res.json())
            .catch(err => console.log(err))
            alert('Deletado com sucesso!')
        this.obterArtigos()
      }
    },
 


}





</script>