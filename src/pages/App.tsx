import React, {useState} from 'react';
import Timer from '../components/Timer'
import Button  from '../components/Button';
import Forms from '../components/Forms';
import List from '../components/List';
import style from './App.module.scss';
import { ITarefa } from '../types/tarefa';

function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [selecionado, setSelecionado] = useState<ITarefa>();

  function selecionaTarefa(tarefaSelecionada: ITarefa) {
    setSelecionado(tarefaSelecionada);
    setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.id === tarefaSelecionada.id ? true : false
    })))
  }

  function finalizarTarefa() {
    if(selecionado) {
      setSelecionado(undefined);
      setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => {
        if(tarefa.id === selecionado.id) {
          return {
            ...tarefa,
            selecionado: false,
            completado: true
          }
        }
        return tarefa;
      }))
    }
  }

  return (
    <div className={style.AppStyle}>
      <Forms setTarefas={setTarefas} />
      <List
        tarefas={tarefas}
        selecionaTarefa={selecionaTarefa}
      />
      <Timer
        selecionado={selecionado}
        finalizarTarefa={finalizarTarefa}
      />
    </div>
  );
}

export default App;