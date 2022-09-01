app = new Vue ({
    el : '#app',
    data: {
        message: 'Ola Vue',
        tasks:[],
        task: {},
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
        editTasks(id){
          fetch(`http://localhost:3000/tasks/${id}`).then(response => response.json()).then(resp => {
            console.log(resp)
            this.task.id = resp.id
            this.task.title = resp.title
            this.task.dueTo = resp.dueTo
            this.task.project = resp.project
          })

        
        },
        postTasks(){
          const data = this.task
          const dataJson = JSON.stringify(data)

          fetch("http://localhost:3000/tasks",
          {headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: dataJson
        })
        }
    },
    created(){
       console.log('Funcionou o criar')
       this.getTasks()
    },
    })



