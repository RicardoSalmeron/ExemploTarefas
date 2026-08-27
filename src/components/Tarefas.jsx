import{useState, useEffect} from 'react'

const Tarefas = () => {
    //Ternario é uma estrutura condicional
    //HOOK - usestate - manipula o estado da variavel  
    const [tarefas, setTarefas] = useState(()=>{
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas): [];
    });
    //useState para manipular os dados que passar nos campos
    const [campo, setCampo]=useState(" ");

    //HOOK useEffect - realiza um efeito colateral
    //no exemplo vai carregar automaticamente as tarefas cadastradas

    useEffect(()=>{
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    },[tarefas])

    return (
    <>
      
    </>
  )
}

export default Tarefas
