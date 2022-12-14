app = new Vue ({
    el : '#app',
    data: {
        tasks:[],
        task:{
          id: null,
          title: null,
          dueTo: null,
          project: null,
        },
        editEnabled: false,
        listEnabled: true,
        newEnabled: false,
        load: false,
        textFilter: "",
    },
    methods:{
        getTasks() {
          this.load = true
          fetch("http://localhost:3000/tasks")
            .then((response) => response.json())
            .then((tarefasJson) => {
              console.log(tarefasJson)
              this.tasks = tarefasJson
              this.load = false
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
          this.editEnabled ? this.editEnabled = false : this.editEnabled = true
          this.listEnabled ? this.listEnabled = false : this.listEnabled = true
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
        },
        updateTasks(){
          const data = this.task
    
          const dataJson = JSON.stringify(data);
    
          fetch(`http://localhost:3000/tasks/${this.task.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: dataJson,
          });
        },
        deleteTasks(id){
          fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
          });
        },
        salvar(){
          this.newEnabled ? this.newEnabled = false : this.newEnabled = true
        },
    },
    created(){
       console.log('Funcionou o criar')
       this.getTasks()
    },
    computed:{
    filterTasks(){
      return this.tasks.filter((el) =>
        el.title.toLowerCase().includes(this.textFilter.toLowerCase()))
    },
  },
  })



