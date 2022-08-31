app = new Vue ({
    el : '#app',
    data: {
        message: 'Ola Vue',
        tasks:[], 
    },
    methods:{
        getTasks() {
            fetch("http://localhost:3000/tasks")
              .then((response) => response.json())
              .then((tarefasJson) => {
                console.log(tarefasJson)
                this.tasks = tarefasJson
              })
          },

    },
    created(){
       console.log('Funcionou o criar')
       this.getTasks()
    },
    })


