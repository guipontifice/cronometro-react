import { tempoParaSegundos } from '../../common/utils/time'
import Button from '../Button'
import Clock from './Clock'
import style from './Timer.module.scss'
import { ITarefa } from '../../types/tarefa'
import { useEffect, useState } from 'react'

interface Props {
    selecionado: ITarefa | undefined,
    finalizarTarefa: () => void
  }
  
  export default function Cronometro({ selecionado, finalizarTarefa }: Props) {
    const [tempo, setTempo] = useState<number>();
  
    useEffect(() => {
      if(selecionado?.tempo) {
        setTempo(tempoParaSegundos(selecionado.tempo));
      }
    },[selecionado]);
  
    function regressiva(contador: number = 0) {
      setTimeout(() => {
        if(contador > 0) {
          setTempo(contador - 1);
          return regressiva(contador - 1);
        }
        finalizarTarefa();
      }, 1000)
    }
  
    return (
      <div className={style.cronometro}>
        <p className={style.titulo}>Escolha um card e inicie o Cronômetro</p>
        <div className={style.relogioWrapper}>
          <Clock tempo={tempo} />
        </div>
        <Button onClick={() => regressiva(tempo)}>
          Começar!
        </Button>
      </div>
    )
  }