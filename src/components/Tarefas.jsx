import{useState, useEffect} from 'react'

const Tarefas = () => {
    //Ternario é uma estrutura condicional
    //HOOK - usestate - manipula o estado da variavel  
    const [tarefas, setTarefas] = useState(()=>{
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas): ["Lista vazia"];
    });
    //useState para manipular os dados que passar nos campos
    const [campo, setCampo]=useState("");

    //HOOK useEffect - realiza um efeito colateral
    //no exemplo vai carregar automaticamente as tarefas cadastradas

    useEffect(()=>{
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    },[tarefas])

    //Função adicionar tarefa

    const AdicionarTarefa=(e)=>{
        e.preventDefault(); //Previne o reload da página
        if(!campo.trim()) return;

        const novaTarefa ={
            id:Date.now(),
            text:campo,
        };
        setTarefas([...tarefas, novaTarefa]); //Toda vez q tiver [...teste, novoTeste] é um spread (pega os antigos e adiciona um novo)
        setCampo();
    };
    const RemoverTarefa=(id)=>{
        const apagarTarefa=tarefas.filter((tarefa)=>tarefa.id !== id);
        setTarefas(apagarTarefa)
    };

    return (
    <>
            <div className="max-w-md mx-auto mt-10 p-6 bg-amber-100 rounded-2xl shadow-xl border border-black-200">
                <h2 className='text-2xl font-bold text-gray-700 mb-6 text-center'> Minha Lista de Tarefas</h2>

                <form onSubmit={AdicionarTarefa} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={campo}
                        onChange={(e) => setCampo(e.target.value)}
                        placeholder="Digite uma nova tarefa..."
                        className="flex-1 px-4 border border-gray-500 rounded-lg focus: outline-none focus: ring-1 focus: ring-amber-400 focus: berder-transparent text-gray-950"
                    />
                    <button type="submit" className="bg-amber-500 hover:bg-amber-600 font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer">
                        Adicionar
                    </button>
                </form>

                <ul className="space-y-1">
                    {tarefas.map((tarefa) => (
                        <li key={tarefa.id} className="flex items-center justify-around p-3 bg-gray-200 border border-amber-600 rounded-2xl shadow-xl hover:bg-amber-400">
                            <span className='break-all mr-2'>{tarefa.text}</span>
                            {/* arrow function (função seta) que encapsula a execução de outra função. 
            Ela garante que removerTarefa só seja executada quando o evento acontecer (como um clique de botão), 
            e não assim que a página carregar.
            */}
                            <button onClick={() => RemoverTarefa(tarefa.id)}
                                className="px-3 py-1 bg-red-600 rounded-xl"
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>

                {tarefas.length === 0 && <p className="text-center italic mt-4">Nenhuma tarefa salva.</p>}
            </div>

    </>
  )
}

export default Tarefas
